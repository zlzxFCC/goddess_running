/*游戏界面*/
var GameScene = my.Class(BaseScene, {
    constructor: function() {
        this.stage = Stage.stage;
        this.queue = Stage.queue;
        this.init();
        this.initWindowEvent();
    },

    init: function() {
        console.log("GameScene init");
        //游戏界面容器
        this.el = new createjs.Container;
        this.stage.addChild(this.el);
        this.initGame();
    },

    initScenery: function() {
        var me = this;
        var map = this.gameData.map;
        var sideMap = resConfig.sceneryMap[map].sideMap;
        this.scenerys = {};
        this.scenerys.objs = new Array();
        this.scenerys.ui = new createjs.Container;
        this.el.addChild(this.scenerys.ui);
        for (var i = 0; i < sideMap.length; i++) {
            var scenery = new Scenery(sideMap[i]);
            me.scenerys.objs.push(scenery);
            me.scenerys.ui.addChild(scenery.getScenery());
        }

        window.wayLineSet = resConfig.wayLineSet;
        var data = resConfig.sceneryMap[map].wayLine;
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < wayLineSet.length; j++) {
                var wayLine = new WayLine(data, i, j);
                me.scenerys.objs.push(wayLine);
                me.scenerys.ui.addChild(wayLine.getWayLine());
            }
        }
    },

    initGame: function() {
        var me = this;

        //暂停
        this._pause = false;
        this.lvData = [];
        this.pops = {};
        createjs.Tween.removeAllTweens();

        var level = Config.level;
        this.gameData = resConfig.gameData["level" + level];
        this.weight = this.gameData.maxWeight;
        this.distance = 0;
        //卧下时碰撞判断调整距离
        this._d = 0;
        this.winCount = 0;
        window.SPEED = this.gameData.speed;

        //背景
        var backGround = new createjs.Bitmap(this.queue.getResult(this.gameData.map));
        backGround.x = 0;
        backGround.y = 0;
        this.el.addChild(backGround);
        this.initScenery();

        //障碍物池初始化
        this.foods = {};
        this.foods.objs = new Array();
        this.foods.ui = new createjs.Container;
        this.el.addChild(this.foods.ui);

        //获取障碍物地图
        if (level < 11) {
            this.levelMap = resConfig.levelMap['level' + level].concat();
        } else {
            var _m = 0,
                id,
                _d;
            this.levelMap = [];
            while (_m < this.gameData.distance - 400) {
                id = _random(21, 50);
                _d = _random(50, 70);
                _m += _d;
                this.levelMap.push([_d, id]);
            }
        }
        this.mapCur = this.levelMap.shift();
        this.distance_Cur = 0;

        //影子
        this.shadow = new createjs.Shape();
        this.shadow.alpha = 0.4;
        this.shadow.regX = 85;
        this.shadow.y = 750;
        this.shadow.visible = false;
        this.el.addChild(this.shadow);
        this.shadow.graphics.beginFill("#000");
        this.shadow.graphics.drawEllipse(0, 0, 170, 60);
        this.shadow.graphics.endFill();

        //人物
        this.goddess = new Goddess(this);
        this.el.addChild(this.goddess.getGirl());

        //计分
        var fps = this.fpsTxt = new createjs.Text("fps:", "16px Arial", "#000");
        fps.x = 0;
        fps.y = 0;
        this.el.addChild(fps);

        //游戏互动文字
        this.okBit = new createjs.Bitmap(this.queue.getResult("ok"));
        this.noBit = new createjs.Bitmap(this.queue.getResult("no"));
        this.goodBit = new createjs.Bitmap(this.queue.getResult("good"));
        this.coolBit = new createjs.Bitmap(this.queue.getResult("cool"));
        this.awesomeBit = new createjs.Bitmap(this.queue.getResult("awesome"));
        this.excellentBit = new createjs.Bitmap(this.queue.getResult("excellent"));
        this.finishBit = new createjs.Bitmap(this.queue.getResult("finish"));

        this.el.addChild(this.okBit);
        this.el.addChild(this.noBit);
        this.el.addChild(this.goodBit);
        this.el.addChild(this.coolBit);
        this.el.addChild(this.awesomeBit);
        this.el.addChild(this.excellentBit);
        this.el.addChild(this.finishBit);

        this.okBit.visible = false;
        this.noBit.visible = false;
        this.goodBit.visible = false;
        this.coolBit.visible = false;
        this.awesomeBit.visible = false;
        this.excellentBit.visible = false;
        this.finishBit.visible = false;

        //终点横幅
        this.endBanners = new createjs.Bitmap(this.queue.getResult("endBanners"));
        this.endBanners.x = 0;
        this.endBanners.y = 210;
        this.el.addChild(this.endBanners);
        this.endBanners.visible = false;

        //距离进度条 数值
        this.distanceBar = new createjs.Bitmap(this.queue.getResult("distanceBar"));
        this.distanceBar.x = 75;
        this.distanceBar.y = 75;
        this.el.addChild(this.distanceBar);

        this.progress_distance = new createjs.Bitmap(this.queue.getResult("progress1"));
        this.progress_distance.x = 74;
        this.progress_distance.y = 81;
        this.progress_distance.scaleX = 0;
        this.el.addChild(this.progress_distance);

        this.distanceIcon = new createjs.Bitmap(this.queue.getResult("distance"));
        this.distanceIcon.x = 25;
        this.distanceIcon.y = 55;
        this.el.addChild(this.distanceIcon);

        this.distanceText = new createjs.Bitmap(this.queue.getResult("text_distance"));
        this.distanceText.x = 180;
        this.distanceText.y = 85;
        this.el.addChild(this.distanceText);

        this.distaceNum = new createjs.BitmapText('0', Res.num_distace);
        this.distaceNum.x = 130;
        this.distaceNum.y = 120;
        this.el.addChild(this.distaceNum);

        //体重进度条 数值
        this.weightBar = new createjs.Bitmap(this.queue.getResult("weightBar"));
        this.weightBar.x = 375;
        this.weightBar.y = 75;
        this.el.addChild(this.weightBar);

        this.progress_weight = new createjs.Bitmap(this.queue.getResult("progress2"));
        this.progress_weight.regX = 200;
        this.progress_weight.x = 578;
        this.progress_weight.y = 81;
        this.progress_weight.scaleX = 0.4;
        this.el.addChild(this.progress_weight);

        this.weightIcon = new createjs.Bitmap(this.queue.getResult("weight"));
        this.weightIcon.x = 531;
        this.weightIcon.y = 55;
        this.el.addChild(this.weightIcon);

        this.weightText = new createjs.Bitmap(this.queue.getResult("text_weight"));
        this.weightText.x = 430;
        this.weightText.y = 85;
        this.el.addChild(this.weightText);

        this.weightNum = new createjs.BitmapText('0', Res.num_distace);
        this.weightNum.x = 410;
        this.weightNum.y = 120;
        this.el.addChild(this.weightNum);

        //logo
        var boyaa = new createjs.Bitmap(this.queue.getResult("boyaa"));
        boyaa.x = 15, boyaa.y = 5;
        this.el.addChild(boyaa);

        //暂停按钮
        this.pauseBtn = new createjs.Bitmap(this.queue.getResult("pauseBtn"));
        this.pauseBtn.x = 520;
        this.pauseBtn.y = 130;
        this.el.addChild(this.pauseBtn);
        this.pauseBtn.visible = false;

        me.initEvent();
        // this.visibilityEvent();
        me.stage.update();
        me.start();
    },
    endBannersMove:function(){
        this.endBanners.y+=2*SPEED;
        this.endBanners.scaleX +=  0.01;
        this.endBanners.scaleY +=  0.01;
    },
    showGoal: function() {
        var me = this;
        this.goal = new createjs.Container();
        this.goal.x = 62;
        this.goal.y = -360;

        this.el.addChild(this.goal);

        var pop_bg = new createjs.Bitmap(this.queue.getResult("intent_bg"));
        this.goal.addChild(pop_bg);

        star1 = new createjs.Bitmap(this.queue.getResult("star"));
        star1.x = 80, star1.y = 220;
        this.goal.addChild(star1);

        var star2 = new createjs.Bitmap(this.queue.getResult("star"));
        star2.x = 80, star2.y = 290;
        this.goal.addChild(star2);

        var m = new createjs.BitmapText("M", Res.num_goal);
        m.x = 410, m.y = 225;
        this.goal.addChild(m);

        var g = new createjs.BitmapText("G", Res.num_goal);
        g.x = 410, g.y = 290;
        this.goal.addChild(g);

        var run_over = new createjs.Bitmap(this.queue.getResult("run_over"));
        run_over.x = 130, run_over.y = 220;
        this.goal.addChild(run_over);

        var subtract = new createjs.Bitmap(this.queue.getResult("subtract"));
        subtract.x = 130, subtract.y = 290;
        this.goal.addChild(subtract);

        var distaceNums = new createjs.BitmapText(this.gameData.distance.toString(), Res.num_goal);
        distaceNums.x = 270, distaceNums.y = 230;
        this.goal.addChild(distaceNums);

        var weightNums = new createjs.BitmapText(this.gameData.minWeight.toString(), Res.num_goal);
        weightNums.x = 270, weightNums.y = 300;
        this.goal.addChild(weightNums);
        if (Config.level < 11) {
            var levelText = new createjs.Bitmap(this.queue.getResult("num_level"));
            levelText.x = 170, levelText.y = 130;
            levelText.sourceRect = Res.num_level.sourceRect["levelText"];
            this.goal.addChild(levelText);

            var levelNum = new createjs.Bitmap(this.queue.getResult("num_level"));
            levelNum.x = 218, levelNum.y = 130;
            levelNum.sourceRect = Res.num_level.sourceRect[Config.level.toString()];
            this.goal.addChild(levelNum);
        } else {
            var levelText = new createjs.Bitmap(this.queue.getResult("num_level"));
            levelText.x = 170, levelText.y = 130;
            levelText.sourceRect = Res.num_level.sourceRect["lastText"];
            this.goal.addChild(levelText);
        }

        createjs.Tween.get(this.goal).to({
            y: 0
        }, 100).wait(1000).to({
            y: -360
        }, 100).call(function() {
            me.goal.visible = false;
        });
    },

    onTouchStart: function(e) {
        var me = this;
        e.preventDefault();
        var touch = e.touches[0];
        me.touchX = touch.pageX;
        me.touchY = touch.pageY;
    },

    onTouchMove: function(e) {
        var me = this;
        e.preventDefault();
        var touch = e.touches[0];
        me.touchMoveX = touch.pageX;
        me.touchMoveY = touch.pageY;
    },

    onTouchEnd: function(e) {
        var me = this;
        var game = Run.gameScene;
        var touchX = me.touchX,
            touchY = me.touchY,
            touchMoveX = me.touchMoveX,
            touchMoveY = me.touchMoveY;
        if (touchMoveX != null || touchMoveY != null) {
            if (Math.abs(touchX - touchMoveX) > Math.abs(touchY - touchMoveY)) {
                if (game._pause) {
                    if (game.hintType == "turn" || game.hintType == "goal") {
                        game.removeHint();
                    }
                } else {
                    if ((touchX - touchMoveX) > 10) {
                        game.goddess.action("turnLeft");
                    } else {
                        game.goddess.action("turnRight");
                    }
                }
            } else {
                if ((touchY - touchMoveY) > 10) {
                    if (game._pause) {
                        if (game.hintType == "jump" || game.hintType == "goal") {
                            game.removeHint();
                        }
                    } else {
                        game.goddess.action("jump");
                    }
                } else {
                    if (game._pause) {
                        if (game.hintType == "lie" || game.hintType == "goal") {
                            game.removeHint();
                        }
                    } else {
                        game.goddess.action("lie");
                    }
                }
            }
            me.touchMoveX = null, me.touchMoveY = null;
        }
    },

    initEvent: function() {
        var me = this;
        var canvas = this.stage.canvas;
        canvas.addEventListener('touchstart', me.onTouchStart, true);
        canvas.addEventListener('touchmove', me.onTouchMove, true);
        canvas.addEventListener('touchend', me.onTouchEnd, true);
        window.goddess = me.goddess;

        //暂停
        this.pauseBtn.onTap(function(event) {
            me.pauseBtn.visible = false;
            me.stage.update();
            me.pause();
            me.showPop("pause");
            me.popEvent("pause");
        });
    },

    showPop: function(type) {
        var pop = new PopScene(type, this);
        this.pop = pop;
        this.stage.update();
    },

    popEvent: function() {
        var me = this;
        var self = me.pop;

        if (self.type == "pause") {
            //继续
            self.continueBtn.onTap(function(event) {
                self.remove();
                me.pauseBtn.visible = true;
                me.stage.update();
                me.goOn();
            });

            //重玩
            self.replayBtn.onTap(function(event) {
                me.stage.removeChild(me.el);
                me.init();
            });

            //关卡
            self.levelBtn.onTap(function(event) {
                me.stage.removeChild(me.el);
                Run.inMap();
            });
        } else if (self.type == "scuess") {
            //下一关
            self.nextBtn.onTap(function(event) {
                me.stage.removeChild(me.el);
                if (++Config.level <= 10) {
                    me.init();
                } else {
                    me.stage.removeChild(me.el);
                    Run.inMap();
                };
            });

            //分享
            self.shareBtn.onTap(function(event) {
                me.stage.removeChild(me.el);
                Run.inMap();
            });

            //更多游戏
            self.moreBtn.onTap(function(event) {
                location.href = "http://266.com";
            });

        } else {
            //重玩
            self.replayBtn.onTap(function(event) {
                me.stage.removeChild(me.el);
                me.init();
            });
        }
    },

    initWindowEvent: function() {
        var me = this;
        //键盘事件
        $(window).on('keydown', function(e) {
            var keyCode = e.keyCode;
            if (keyCode > 36 && keyCode < 41) {
                me.keyMove(keyCode, 'keydown');
            }
        });
    },

    keyMove: function(keyCode, key) {
        if (key == "keydown") {
            if (keyCode == 37) {
                if (this._pause) {
                    if (this.hintType == "turn" || this.hintType == "goal") {
                        this.removeHint();
                    }
                } else {
                    this.goddess.action("turnLeft");
                }
            } else if (keyCode == 39) {
                if (this._pause) {
                    if (this.hintType == "turn" || this.hintType == "goal") {
                        this.removeHint();
                    }
                } else {
                    this.goddess.action("turnRight");
                }
            } else if (keyCode == 38) {
                if (this._pause) {
                    if (this.hintType == "jump" || this.hintType == "goal") {
                        this.removeHint();
                    }
                } else {
                    this.goddess.action("jump");
                }
            } else if (keyCode == 40) {
                if (this._pause) {
                    if (this.hintType == "lie" || this.hintType == "goal") {
                        this.removeHint();
                    }
                } else {
                    this.goddess.action("lie");
                }
            }
        }
    },

    tick: function() {
        if (!this._pause) {
            var me = this;
            // SPEED = (125000 - this.weight) / 25000.0;
            if (this.fpsTxt) this.fpsTxt.text = "FPS : " + parseInt(createjs.Ticker.getMeasuredFPS());
            if (this.mapCur[0] > 0 && this.distance > this.distance_Cur) {
                if (this.mapCur[1] > -1) {
                    this.addFood(this.mapCur[1]);
                } else {
                    this.showHint(this.mapCur[1]);
                }
                this.distance_Cur += this.mapCur[0];
                if (this.levelMap.length > 0) {
                    this.mapCur = this.levelMap.shift();
                }
            }

            me.changeProgress();
            me.checkFood();
            me.moveScenery();

            me.shadow.x = me.goddess.el.x;
            var scale = (me.goddess.el.y - 450) / 180 * 0.6 + 0.4;
            me.shadow.scaleX = scale;
            me.shadow.scaleY = scale;

            

            if (this.distance >= this.gameData.distance) {
                this.distaceNum.text = parseInt(this.gameData.distance).toString();
                me.over();
            }

            if (me.distance >= me.gameData.distance-2900) {
               me.endBanners.visible = true;
               me.shake();
               // me.endBannersMove();
            }
            me.stage.update();
        }
    },
    shake: function() {
        var y = this.endBanners.y;
        createjs.Tween.get(this.endBanners).to({
            y: y - 10
        }, 70).to({
            y: y
        }, 70);
    },
    changeProgress: function() {
        this.distance += SPEED * 0.5;
        this.progress_distance.scaleX = (this.distance / this.gameData.distance) * 0.85 + 0.15;

        this.distaceNum.text = parseInt(this.distance).toString();

        this.weight -= SPEED;
        if (this.weight < this.gameData.maxWeight) {
            this.progress_weight.scaleX = (this.weight - this.gameData.minWeight) / (this.gameData.maxWeight - this.gameData.minWeight) * 0.6 + 0.4;
        }
        this.weightNum.text = parseInt(this.weight).toString();
    },

    addFood: function(groupId) {
        var me = this;
        var group = resConfig.foodGroup[groupId];
        for (var i = 0; i < 3; i++) {
            if (group[i] > 0) {
                var food = new Food(i, "food" + group[i]);
                this.foods.objs.push(food);
                this.foods.ui.addChild(food.getFood());
            }
        }
    },

    switch: function() {
        // console.log("foodui="+this.el.getChildIndex(this.foods.ui));
        // console.log("goddess=" + this.el.getChildIndex(this.goddess.el));
        this.el.swapChildren(this.foods.ui, this.goddess.el);
        if (this._d == 0) {
            this._d = 50;
        } else {
            this._d = 0;
        }
    },

    /*障碍物检测*/
    checkFood: function() {
        var me = this,
            food, _y;
        var cacheList = new Array();
        while (me.foods.objs.length > 0) {
            food = me.foods.objs.pop();
            food.move();
            _y = food.getFood().y;

            if (_y >= 780 - me._d && _y < 850 + food.el.height && me.goddess.position == food.position) {
                if (food.motion == 0 || me.goddess.motion != food.motion) {
                    this.weight += food.calorie;
                    //吃东西音效
                    if (Config.isAndroid) {
                        createjs.Sound.play('eat', true);
                    }
                    me.foodCrack(food.el.x, food.el.y);
                    me.foods.ui.removeChild(food.getFood());
                    me.showWord(false);
                } else {
                    cacheList.push(food);
                }
            } else {
                if (!food.pass && _y >= 850 + food.el.height && _y <= 875 + food.el.height && me.goddess.position == food.position) {
                    food.pass = true;
                    me.showWord(true);
                }
                if (_y >= 1300) {
                    me.foods.ui.removeChild(food.getFood());
                } else {
                    cacheList.push(food);
                }
            }
        }
        if (cacheList.length > 0) me.foods.objs = cacheList;
    },

    showWord: function(win) {
        var me = this;
        var word;
        if (win) {
            me.winCount++;
            if (me.winCount > 8) {
                word = me.excellentBit;
            } else {
                if (me.winCount > 6) {
                    word = me.awesomeBit;
                } else {
                    if (me.winCount > 4) {
                        word = me.coolBit;
                    } else {
                        if (me.winCount > 2) {
                            word = me.goodBit;
                        } else {
                            word = me.okBit;
                        }
                    }
                }
            }
        } else {
            me.winCount = 0;
            word = me.noBit;
        }
        // if (me.distance >= me.gameData.distance-2700) {
        //     word = me.finishBit;
        //     word.y = 100;
        //     var y=400;
        // }
        word.visible = true;
        word.regX = 200;
        word.x = 320 + (me.goddess.position - 1) * 180;
       
        // if(!y){
          word.y = me.goddess.el.y - 150;
          var y=me.goddess.el.y - 200;  
        // }
        
        word.scaleX = 0.6;
        word.scaleY = 0.6;
       
        createjs.Tween.removeTweens(word);
        createjs.Tween.get(word).to({
                y: y,
                scaleX: 1,
                scaleY: 1,
            }, 300)
            .to({
                visible: false
            }, 100);
    },

    moveScenery: function() {
        var me = this;
        var scenery;
        for (var i = 0; i < me.scenerys.objs.length; i++) {
            scenery = me.scenerys.objs[i];
            scenery.move();
        }
    },

    /*开始游戏*/
    start: function() {
        console.log("start");
        var me = this;
        this._pause = false;
        this.pauseBtn.visible = true;
        createjs.Ticker.setPaused(false);
        if (!Run.gameTicker) {
            createjs.Ticker.on("tick", function() {
                if (!me._pause) {
                    me.tick.call(me);
                }
            });
            Run.gameTicker = true;
        }
        me.showGoal();
    },

    /*暂停游戏*/
    pause: function() {
        this._pause = true;
        this.goddess.stop();
        createjs.Ticker.setPaused(true);
    },

    /*继续*/
    goOn: function() {
        this._pause = false;
        createjs.Ticker.setPaused(false);
        this.goddess.play();
    },

    /*游戏结束弹窗*/
    over: function() {
        var me = this;
        var level = Config.level;
        this.lvData[level - 1] = {
            "distance": this.distance,
            "weight": this.weight,
            "level": level
        };
        var lvData = JSON.stringify(this.lvData);
        localStorage.setItem("lvData", lvData);
        this.pause.call(this);

        var _level = "level" + Config.level;
        var _minWeight = resConfig.gameData[_level].minWeight;
        var _type;

        if (this.weight > _minWeight) {
            _type = "lose";
            document.title = "第" + level + "关都没过，得了《" + rankData[level - 1] + "》称号";
            window.shareData.tTitle = document.title;
        } else {
            _type = "scuess";
            document.title = "恭喜，过了" + level + "关，得了《" + rankData[level] + "》称号";
            window.shareData.tTitle = document.title;
            if (level == 10) {
                this.stage.removeChild(this.el);
                Run.inStory("end");
                return;
            }
        }
        this.showPop(_type);
        this.popEvent(_type);
        this.pauseBtn.visible = false;
        this.stage.update();
        console.log(this.foods.ui);
    },

    showHint: function(hintId) {
        var me = this;
        me.pause();
        me.hint = new createjs.Container();
        me.el.addChild(me.hint);

        var rect = function(graphics, x, y, w, h, direction) {
            if (direction) {
                graphics.moveTo(x, y);
                graphics.lineTo(x, y + h);
                graphics.lineTo(x + w, y + h);
                graphics.lineTo(x + w, y);
            } else {
                graphics.moveTo(x, y);
                graphics.lineTo(x + w, y);
                graphics.lineTo(x + w, y + h);
                graphics.lineTo(x, y + h);
            }
            graphics.closePath();
        }

        var bgLayer = new createjs.Shape();
        bgLayer.alpha = 0.6;

        var txt = new createjs.Text("", "bold 30px Arial", "white");
        txt.textAlign = "center";
        txt.lineHeight = 40;
        txt.x = 461;
        txt.y = 430;

        bgLayer.graphics.beginFill("#000");
        rect(bgLayer.graphics, 0, 0, 640, 960, true);
        switch (hintId) {
            case -1:
                me.hintType = "turn";
                bgLayer.graphics.arc(320, 305, 50, 0, Math.PI * 2);
                bgLayer.graphics.endFill();
                me.hint.addChild(bgLayer);
                if (_isMobile) {
                    txt.text = "左右滑动屏幕,\n移动躲避食物";
                    var arrowsR = new createjs.Bitmap(me.queue.getResult("arrows_mobile"));
                    arrowsR.regY = 59;
                    arrowsR.x = 215;
                    arrowsR.y = 700;
                    me.hint.addChild(arrowsR);

                    var arrowsL = new createjs.Bitmap(me.queue.getResult("arrows_mobile"));
                    arrowsL.x = 425;
                    arrowsL.y = 700;
                    arrowsL.regY = 59;
                    arrowsL.rotation = 180;
                    me.hint.addChild(arrowsL);

                    var hand = new createjs.Bitmap(me.queue.getResult("hand"));
                    hand.x = 274;
                    hand.y = 670;
                    me.hint.addChild(hand);

                    createjs.Tween.get(hand, {
                        ignoreGlobalPause: true,
                        loop: true
                    }).to({
                        x: 180
                    }, 250).to({
                        x: 368
                    }, 500).to({
                        x: 274
                    }, 250);
                } else {
                    txt.text = "按住左或右键,\n移动躲避食物";
                    var arrowsR = new createjs.Bitmap(me.queue.getResult("arrows_pc"));
                    arrowsR.regY = 60;
                    arrowsR.x = 374; //454
                    arrowsR.y = 700;
                    me.hint.addChild(arrowsR);

                    createjs.Tween.get(arrowsR, {
                        ignoreGlobalPause: true,
                        loop: true
                    }).to({
                        x: 434
                    }, 800);

                    var arrowsL = new createjs.Bitmap(me.queue.getResult("arrows_pc"));
                    arrowsL.x = 266; //186
                    arrowsL.y = 700;
                    arrowsL.regY = 60;
                    arrowsL.rotation = 180;
                    me.hint.addChild(arrowsL);

                    createjs.Tween.get(arrowsL, {
                        ignoreGlobalPause: true,
                        loop: true
                    }).to({
                        x: 206
                    }, 800);
                }
                break;
            case -2:
                me.hintType = "jump";
                bgLayer.graphics.drawEllipse(220, 295, 200, 50);
                bgLayer.graphics.endFill();
                me.hint.addChild(bgLayer);

                if (_isMobile) {
                    txt.text = "向上滑动屏幕,\n跳跃躲避食物";
                    var arrows = new createjs.Bitmap(me.queue.getResult("arrows_mobile"));
                    arrows.regY = 59;
                    arrows.x = 320;
                    arrows.y = 800;
                    arrows.rotation = -90;
                    me.hint.addChild(arrows);

                    var hand = new createjs.Bitmap(me.queue.getResult("hand"));
                    hand.x = 274;
                    hand.y = 650;
                    me.hint.addChild(hand);

                    createjs.Tween.get(hand, {
                        ignoreGlobalPause: true,
                        loop: true
                    }).to({
                        y: 550
                    }, 800);

                } else {
                    txt.text = "按住上键,\n跳跃躲避食物";
                    var arrows = new createjs.Bitmap(me.queue.getResult("arrows_pc"));
                    arrows.regY = 60;
                    arrows.x = 320;
                    arrows.y = 600;
                    arrows.rotation = -90;
                    me.hint.addChild(arrows);

                    createjs.Tween.get(arrows, {
                        ignoreGlobalPause: true,
                        loop: true
                    }).to({
                        y: 500
                    }, 800);
                }
                break;
            case -3:
                me.hintType = "lie";
                bgLayer.graphics.drawEllipse(200, 270, 240, 100);
                bgLayer.graphics.endFill();
                me.hint.addChild(bgLayer);

                if (_isMobile) {
                    txt.text = "向下滑动屏幕,\n躺下躲避食物";
                    var arrows = new createjs.Bitmap(me.queue.getResult("arrows_mobile"));
                    arrows.regY = 59;
                    arrows.x = 320;
                    arrows.y = 535;
                    arrows.rotation = 90;
                    me.hint.addChild(arrows);

                    var hand = new createjs.Bitmap(me.queue.getResult("hand"));
                    hand.x = 274;
                    hand.y = 650;
                    me.hint.addChild(hand);

                    createjs.Tween.get(hand, {
                        ignoreGlobalPause: true,
                        loop: true
                    }).to({
                        y: 750
                    }, 800);

                } else {
                    txt.text = "按住下键,\n躺下躲避食物";
                    var arrows = new createjs.Bitmap(me.queue.getResult("arrows_pc"));
                    arrows.regY = 60;
                    arrows.x = 320;
                    arrows.y = 500;
                    arrows.rotation = 90;
                    me.hint.addChild(arrows);

                    createjs.Tween.get(arrows, {
                        ignoreGlobalPause: true,
                        loop: true
                    }).to({
                        y: 600
                    }, 800);
                }
                break;
            case -4:
                me.hintType = "goal";
                bgLayer.graphics.drawEllipse(478, 63, 40, 70);
                bgLayer.graphics.endFill();
                me.hint.addChild(bgLayer);
                txt.y = 410;
                txt.text = "过关条件:\n右上体重条\n降到刻度以下";
                break;
        }

        var dialog = new createjs.Bitmap(this.queue.getResult("dialog"));
        dialog.x = 320;
        dialog.y = 370;
        me.hint.addChild(dialog);
        me.hint.addChild(txt);

        me.hint.onTap(function(event) {});
    },

    removeHint: function() {
        this.hintType = "";
        this.el.removeChild(this.hint);
        this.goOn();
    },

    foodCrack: function(x, y) {
        var me = this;
        if (!me.crack_sheet) {
            var data = {
                "images": [this.queue.getResult("eat")],
                "frames": [
                    [2, 220, 250, 216],
                    [254, 2, 250, 216],
                    [2, 2, 250, 216]
                ],
                "animations": {
                    "crack": [0, 2, "crack", 0.1],
                },
            };
            me.crack_sheet = new createjs.SpriteSheet(data);
        }
        var crack = new createjs.Sprite(me.crack_sheet, "crack");
        crack.regX = 125;
        crack.regY = 108;
        crack.x = x;
        crack.y = y - 100;
        this.foods.ui.addChild(crack);
        var T = 250;
        createjs.Tween.get(crack).wait(T).set({
            rotation: 180
        }).wait(T).call(function() {
            me.foods.ui.removeChild(crack);
        });
    },
});