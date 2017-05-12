/*
继承baseobject
障碍物类
*/

var Food = my.Class(BaseObject, {
	constructor: function(position, type) {
		this.position = position;
		this.type = type;
		this.getData();
		this.init();
	},

	init: function() {
		var kind = resConfig.foodKind[this.type];
		this.img = kind.img;
		this.calorie = kind.calorie;
		this.motion = kind.motion;

		this.queue = Stage.queue;
		
		//移动完成度
		this.p = 0.01;

		if(this.motion == 2) {
			this.el = new createjs.Container();
			this.table = new createjs.Bitmap(this.queue.getResult("table"));
			this.table.y = kind.height - 30;
			this.upper = new createjs.Bitmap(this.queue.getResult(this.img));
			this.el.addChild(this.table, this.upper);
			this.el.height = 148 + kind.height - 30;
		}else{
			this.el = new createjs.Bitmap(this.queue.getResult(this.img));
			this.el.height = kind.height;
		}
		
		this.el.width = kind.width;
		
		this.el.scaleX = 0.1;
		this.el.scaleY = 0.1;
		this.el.regX = this.el.width / 2;
		this.el.regY = this.el.height;
		this.el.x = this.canvasWidth / 2 + (this.position - 1) * 10;
		this.el.y = 190;
		this.el.alpha = 0.2;
	},

	getFood: function() {
		return this.el;
	},

	move: function() {
		if (this.p < 1){
			this.p += 0.01*SPEED*(this.p);
		}
		this.el.x = 320 + (this.position - 1) * 450 * this.p;
		this.el.y = 190 + this.p * (1110);
		if (this.el.scaleX < 1) {
			this.el.scaleX = this.p*1.5 + 0.05;
			this.el.scaleY = this.p*1.5 + 0.05;
		}
		this.el.alpha = this.p * 4 + 0.1;
	},
});