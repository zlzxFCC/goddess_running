/*弹窗*/
var PopScene = my.Class(BaseScene, {
	constructor: function(type, parent) {
		this.type = type;
		this.parent = parent;
		this.init();
	},
	init: function() {
		var me = this;
		this.queue = Stage.queue;

		//开始界面容器
		this.el = new createjs.Container;
		this.parent.el.addChild(this.el);
		this.bgLayer = new createjs.Shape();
		this.bgLayer.graphics.beginFill("#000");
		this.bgLayer.graphics.drawRect(0, 0, 640, 960);
		this.bgLayer.graphics.endFill();
		this.bgLayer.alpha = 0.6;
		this.el.addChild(this.bgLayer);

		this.content = new createjs.Container();
		this.el.addChild(this.content);
		this.content.width = 560;
		this.content.height = 636;
		this.content.x = Stage.stage.canvas.width / 2;
		this.content.y = Stage.stage.canvas.height / 2;
		this.content.regX = 320;
		this.content.regY = 400;

		if (this.type == "pause") {
			this.pause_bg = new createjs.Bitmap(this.queue.getResult("pause_bg"));
			this.pause_bg.x = 40;
			this.pause_bg.y = 60;

			this.continueBtn = new createjs.Bitmap(this.queue.getResult("continueBtn"));
			this.continueBtn.x = 180;
			this.continueBtn.y = 320;

			this.replayBtn = new createjs.Bitmap(this.queue.getResult("replayBtn"));
			this.replayBtn.x = 180;
			this.replayBtn.y = 426;

			this.levelBtn = new createjs.Bitmap(this.queue.getResult("levelBtn"));
			this.levelBtn.x = 180;
			this.levelBtn.y = 532;

			this.content.addChild(this.pause_bg);
			this.content.addChild(this.continueBtn);
			this.content.addChild(this.replayBtn);
			this.content.addChild(this.levelBtn);

		} else if (this.type == "scuess") {
			this.scuess_bg = new createjs.Bitmap(this.queue.getResult("scuess_bg"));
			this.scuess_bg.x = 40;
			this.scuess_bg.y = 60;

			this.nextBtn = new createjs.Bitmap(this.queue.getResult("nextBtn"));
			this.nextBtn.x = 180;
			this.nextBtn.y = 320;

			this.shareBtn = new createjs.Bitmap(this.queue.getResult("shareBtn"));
			this.shareBtn.x = 180;
			this.shareBtn.y = 426;

			this.moreBtn = new createjs.Bitmap(this.queue.getResult("moreBtn"));
			this.moreBtn.x = 180;
			this.moreBtn.y = 532;

			this.content.addChild(this.scuess_bg);
			this.content.addChild(this.nextBtn);
			this.content.addChild(this.shareBtn);
			this.content.addChild(this.moreBtn);
		} else {
			this.lose_bg = new createjs.Bitmap(this.queue.getResult("lose_bg"));
			this.lose_bg.x = 40;
			this.lose_bg.y = 60;

			this.replayBtn = new createjs.Bitmap(this.queue.getResult("replayBtn"));
			this.replayBtn.x = 180;
			this.replayBtn.y = 320;

			this.shareBtn = new createjs.Bitmap(this.queue.getResult("shareBtn"));
			this.shareBtn.x = 180;
			this.shareBtn.y = 426;

			this.moreBtn = new createjs.Bitmap(this.queue.getResult("moreBtn"));
			this.moreBtn.x = 180;
			this.moreBtn.y = 532;

			this.content.addChild(this.lose_bg);
			this.content.addChild(this.replayBtn);
			this.content.addChild(this.shareBtn);
			this.content.addChild(this.moreBtn);
		}
		// this.el.visible = false;
		// this.show();
	},

	show: function() {
		this.content.scaleX = 0.1;
		this.content.scaleY = 0.1;
		this.el.visible = true;
		createjs.Tween.get(this.content).to({
			scaleX: 1,
			scaleY: 1,
		}, 800, createjs.Ease.bounceOut);
	}
});