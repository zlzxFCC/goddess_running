/*
   人物类
*/
var Goddess = my.Class({
    constructor: function(parent) {
        this.parent = parent;
        this.config = {
            middleX: 320,
            dx: 220,
            normalY: 650,
            lieY: 750,
            jumpY: 450,
            jumpTime: 1200 / SPEED,
            turnTime: 300 / SPEED,
            lieTime: 1500 / SPEED,
        }

        this.init();
    },

    init: function() {
        this.queue = Stage.queue;
        createjs.MotionGuidePlugin.install(createjs.Tween);
        //胖妹纸跑步动画
        //实例精灵动画集
        if (Config.level > 8) {
            var move = new createjs.SpriteSheet(Res.goddess_thin);
        } else if (Config.level > 4) {
            var move = new createjs.SpriteSheet(Res.goddess_normal);
        } else {
            var move = new createjs.SpriteSheet(Res.goddess_fat);
        }

        //SpriteSheet类设置帧和动画,里面的run为开始的动画
        this.el = new createjs.Sprite(move, "run");
        this.el.width = 235;
        this.el.height = 350;
        this.el.regX = this.el.width / 2;
        this.el.regY = this.el.height / 2;

        //设置在舞台中的位置
        this.el.x = this.config.middleX;
        this.el.y = this.config.normalY;

        //初始状态
        this.position = 1;
        this.motion = 0;
        this.moving = false;
        this.actions = [];
    },

    getGirl: function() {
        return this.el;
    },

    action: function(type) {
        var me = this;
        var cf = me.config;
        if (me.moving) {
            //保存动作 移动完成后执行 跳跃,卧下后清空
            this.actions.push(type);
            return;
        }
        var fps = parseInt(createjs.Ticker.getMeasuredFPS());
        switch (type) {
            case "turnLeft":
                if (me.position > 0) {
                    me.moving = true;
                    if (me.motion == 0) {
                        me.el.gotoAndPlay("turn");
                    }
                    var targetX = me.position == 1 ? 100 : 320;
                    var path = [me.el.x, cf.normalY, (me.el.x + targetX) / 2, cf.normalY - 80, targetX, cf.normalY];
                    createjs.Tween.get(me.el).to({
                        guide: {
                            path: path,
                            start: 0,
                            end: 1
                        }
                    }, cf.turnTime * 60 / fps).call(function() {
                        if (me.motion == 0) {
                            me.el.gotoAndPlay("run");
                        }
                        me.position--;
                        me.moving = false;
                        if (me.actions.length > 0) {
                            me.action(me.actions.shift());
                        }
                    });
                }
                break;
            case "turnRight":
                if (me.position < 2) {
                    me.moving = true;
                    if (me.motion == 0) {
                        me.el.gotoAndPlay("turn");
                    }
                    var targetX = me.position == 1 ? 540 : 320;
                    var path = [me.el.x, cf.normalY, (me.el.x + targetX) / 2, cf.normalY - 80, targetX, cf.normalY];
                    createjs.Tween.get(me.el).to({
                        guide: {
                            path: path,
                            start: 0,
                            end: 1
                        }
                    }, cf.turnTime * 60 / fps).call(function() {
                        if (me.motion == 0) {
                            me.el.gotoAndPlay("run");
                        }
                        me.position++;
                        me.moving = false;
                        if (me.actions.length > 0) {
                            me.action(me.actions.shift());
                        }
                    });
                }
                break;
            case "jump":
                if (me.motion != 1) {
                    me.el.y = cf.normalY;
                    me.actions = [];
                    if (me.motion == 2) {
                        me.parent.switch();
                    }
                    me.parent.shadow.visible = true;
                    createjs.Tween.removeTweens(me.el);
                    createjs.Tween.get(me.el).to({
                        y: cf.jumpY
                    }, cf.jumpTime / 2 * 60 / fps).to({
                        y: cf.normalY
                    }, cf.jumpTime / 2 * 60 / fps).call(function() {
                        me.el.gotoAndPlay("run");
                        me.motion = 0;
                        me.parent.shadow.visible = false;
                    });
                    me.el.gotoAndPlay("jump");
                    me.motion = 1;
                }
                break;
            case "lie":
                if (me.motion != 2) {
                    me.el.y = cf.lieY;
                    me.actions = [];
                    me.parent.shadow.visible = false;
                    me.parent.switch();
                    createjs.Tween.removeTweens(me.el);
                    createjs.Tween.get(me.el).to({
                        y: cf.lieY - 20
                    }, cf.lieTime * 60 / fps).call(function() {
                        me.el.y = cf.normalY;
                        me.el.gotoAndPlay("run");
                        me.parent.switch();
                        me.motion = 0;
                    });

                    me.el.gotoAndPlay("lie");
                    me.motion = 2;
                }
                break;
        }
    },

    stop: function() {
        this.el.stop();
        // this.tw = createjs.Tween.get(this.el);
        // this.tw.setPaused(true);
    },

    play: function() {
        this.el.play();
        // this.tw.setPaused(false);
    },
});