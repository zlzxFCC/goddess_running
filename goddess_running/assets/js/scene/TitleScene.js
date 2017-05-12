/*开始菜单界面*/
var TitleScene = my.Class(BaseScene, {
	constructor: function() {
		this.init();
	},
	init: function() {
		var me = this;
		this.stage = Stage.stage;
		this.queue = Stage.queue;

		//开始界面容器
		this.el = new createjs.Container;
		this.stage.addChild(this.el);
		// alert(this.stage.getChildIndex(this.el));
		//背景
		var bg = new createjs.Bitmap(this.queue.getResult("bgStart"));
		bg.x = 0, bg.y = 0;
		this.el.addChild(bg);

		var boyaa = new createjs.Bitmap(this.queue.getResult("boyaa"));
		boyaa.x = 15, boyaa.y = 5;
		this.el.addChild(boyaa);

		var girl = new createjs.Bitmap(this.queue.getResult("girl"));
		girl.x = 320, girl.y = 370;
		this.el.addChild(girl);


		var play = new createjs.Bitmap(this.queue.getResult("play"));
		play.x = 230, play.y = 600;
		this.el.addChild(play);
		this.stage.update();

		play.onTap(function() {
			Run.inMap();
		});
	}
});