/*介绍界面*/
var IntroduceScene = my.Class(BaseScene, {
	constructor: function(type) {
		this.init(type);
	},
	init: function(type) {
		var me = this;
		this.queue = Stage.queue;
		this.stage = Stage.stage;
		//开始界面容器
		this.el = new createjs.Container;
		this.stage.addChild(this.el);

		if (type == "start") {
			this.story1 = new createjs.Bitmap(this.queue.getResult("story1"));
			this.story1.x = 0, this.story1.y = 0;
			this.el.addChild(this.story1);
		} else {
			createjs.MotionGuidePlugin.install(createjs.Tween);
			createjs.Ticker.setPaused(false);
			var animate = new createjs.Container();
			animate.x = 10;
			animate.y = 480;
			this.el.addChild(animate);

			var bg = new createjs.Bitmap(this.queue.getResult("story_bg"));
			animate.addChild(bg);

			for (var i = 0; i < 8; i++) {
				var light = new createjs.Bitmap(this.queue.getResult("story_light"));
				animate.addChild(light);
				light.width = 148;
				light.height = 418;
				light.regX = light.width / 2;
				light.regY = light.height;
				light.x = 90 * i;
				light.y = 400 + (i < 4 ? 3 - i : i - 4) * 15;
				light.rotation = 50 * (i % 2 == 1 ? -1 : 1);
				createjs.Tween.get(light, {
					loop: true
				}).to({
					rotation: 50 * (i % 2 == 1 ? 1 : -1),
				}, 3000).to({
					rotation: 50 * (i % 2 == 1 ? -1 : 1),
				}, 3000);
			}

			var gd = new createjs.Bitmap(this.queue.getResult("story_gd"));
			gd.y = 8;
			animate.addChild(gd);

			var heart1 = new createjs.Bitmap(this.queue.getResult("story_heart1"));
			heart1.width = 52;
			heart1.height = 46;
			heart1.regX = heart1.width / 2;
			heart1.regY = heart1.height / 2;
			heart1.x = 390;
			heart1.y = 180;
			heart1.scaleX = 0.3,
				heart1.scaleY = 0.3,
				animate.addChild(heart1);
			createjs.Tween.get(heart1, {
				loop: true
			}).set({
				scaleX: 0.3,
				scaleY: 0.3,
				alpha: 1
			}).to({
				guide: {
					path: [390, 180, 440, 140, 440, 100],
					start: 0,
					end: 1
				},
				scaleX: 1,
				scaleY: 1,
				alpha: 0.5,
			}, 3000);
			setTimeout(function() {
				var heart2 = new createjs.Bitmap(me.queue.getResult("story_heart2"));
				heart2.width = 52;
				heart2.height = 46;
				heart2.regX = heart2.width / 2;
				heart2.regY = heart2.height / 2;
				heart2.x = 390;
				heart2.y = 180;
				heart2.scaleX = 0.3;
				heart2.scaleY = 0.3;
				animate.addChild(heart2);
				createjs.Tween.get(heart2, {
					loop: true
				}).set({
					scaleX: 0.3,
					scaleY: 0.3,
					alpha: 1
				}).to({
					guide: {
						path: [390, 180, 440, 140, 440, 100],
						start: 0,
						end: 1
					},
					scaleX: 1,
					scaleY: 1,
					alpha: 0.5,
				}, 3000);
			}, 1500)

			var po = [
				[150, 230, 0.8],
				[500, 120, 0.6],
				[420, 250, 0.5]
			];
			for (var i = 0; i < po.length; i++) {
				var star = new createjs.Bitmap(this.queue.getResult("story_star"));
				animate.addChild(star);
				star.x = po[i][0];
				star.y = po[i][1];
				star.regX = 30;
				star.regY = 30;
				star.scaleX = po[i][2];
				star.scaleY = po[i][2];
				createjs.Tween.get(star, {
					loop: true
				}).to({
					rotation: 360
				}, 10000);
			}

			po = [
				[270, 300, 0.6],
				[340, 340, 0.6],
				[190, 110, 1],
				[210, 130, 0.6],
				[370, 15, 1],
				[390, 30, 0.6],
				[435, 155, 0.6],
				[350, 240, 0.6]
			];
			for (var i = 0; i < po.length; i++) {
				var blink = new createjs.Bitmap(this.queue.getResult("story_blink"));
				animate.addChild(blink);
				blink.x = po[i][0];
				blink.y = po[i][1];
				blink.scaleX = po[i][2];
				blink.scaleY = po[i][2];
				createjs.Tween.get(blink, {
					loop: true
				}).wait(_random(0, 3) * 200).to({
					alpha: 0
				}, 500).to({
					alpha: 1
				}, 500)
			}
			this.story2 = new createjs.Bitmap(this.queue.getResult("story2"));
			this.story2.x = 0, this.story2.y = 0;
			this.el.addChild(this.story2);

			this.marquee();
		}
		var boyaa = new createjs.Bitmap(this.queue.getResult("boyaa"));
		boyaa.x = 15, boyaa.y = 5;
		this.el.addChild(boyaa);

		this.stage.update();
		this.el.onTap(function() {
			me.stage.removeChild(me.el);
			createjs.Ticker.setPaused(true);
			Run.inTitle();
		});
	},

	//通关，滚动字幕
	marquee: function() {
		var me = this;
		var n = 0;
		//结束滚动文字
		var overTxt1 = this.overTxt1 = new createjs.Text("结束1", "16px Arial", "#000");
		overTxt1.textAlign = "center";
		overTxt1.x = Config.W / 2;
		overTxt1.y = 1000;
		this.el.addChild(overTxt1);
		me.overTxt1.text = textArr[n];
		createjs.Tween.get(me.overTxt1, {
			loop: true
		}).to({
			y: 0
		}, 3000).to({
			visible: false
		}, 100).call(function() {
			if (n >= 0 && n < textArr.length) {
				n++;
			} else {
				n = 0;
			}
			me.overTxt1.text = textArr[n];
		});
	},
});