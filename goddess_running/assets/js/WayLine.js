var WayLine = my.Class(BaseObject, {
    constructor: function(data, direction, index) {
        this.data = data;
        this.direction = direction;
        this.index = index;
        this.init();
    },

    init: function() {
        this.queue = Stage.queue;
        this.el = new createjs.Bitmap(this.queue.getResult(this.data.imgName));
        this.el.width = this.data.width;
        this.el.height = this.data.height;
        this.el.regX = this.el.width / 2;
        this.el.regY = this.el.height / 2;
        this.p = wayLineSet[this.index];
        if (Config.level < 5) {
            this.el.skewX = this.direction == 0 ? 0 : 180;
        } else if(Config.level > 8){
            this.el.skewY = this.direction == 0 ? 0 : 180;
        }
        this.el.x = 320 + (this.direction == 0 ? -1 : 1) * this.p * 180;
        this.el.y = 190 + this.p * (770 + this.el.height / 2);
        this.el.scaleX = this.p + 0.2;
        this.el.scaleY = this.p + 0.2;
    },

    getWayLine: function() {
        return this.el;
    },

    move: function() {
        var me = this;
        if (this.p <= 1) {
            this.p += 0.01 * SPEED * (this.p);
        } else {
            this.p = 0.01;
        }
        this.el.x = 320 + (this.direction == 0 ? -1 : 1) * this.p * 180;
        this.el.y = 190 + this.p * (770 + this.el.height / 2);
        this.el.scaleX = this.p + 0.2;
        this.el.scaleY = this.p + 0.2;
        this.el.alpha = this.p * 3 - 0.1;
    },
});