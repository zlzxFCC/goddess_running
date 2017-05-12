var Scenery = my.Class(BaseObject, {
	constructor: function(data) {
		this.data = data;
		this.init();
	},

	init: function() {
		this.queue = Stage.queue;
		this.el = new createjs.Bitmap(this.queue.getResult(this.data.imgName));
		this.el.width = this.data.width;
		this.el.height = this.data.height;
		this.el.regX = this.el.width / 2;
		this.el.regY = this.el.height;
		this.p = this.data.y/(550 + this.el.height);
		this.move();
	},

	getScenery: function() {
		return this.el;
	},

	move: function() {
		var me = this;
		if (this.p <= 1){
			this.p += 0.01*SPEED*(this.p);
		} else {
			this.p = 0.01;
		}
		if(this.data.direction == "left"){
			this.el.x = (1-this.p)*this.data.x - this.el.width*this.p;
		}else{
			this.el.x = 640 - (1-this.p)*this.data.x + this.el.width*this.p;
		}
		this.el.y = 200 + this.p * (this.data.x + this.el.height);
		this.el.scaleX = this.p + 0.6;
		this.el.scaleY = this.p + 0.6;
		this.el.alpha = this.p * 3;
	},
});