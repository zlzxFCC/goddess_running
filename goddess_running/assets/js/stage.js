(function(win) {
	var W = Config.W = 640;
	var H = Config.H = 960;

	var Stage = win.Stage = {

		init: function(resCfg) {
			this.initStage();
			this.preLoad(resCfg);
			this.initSound();
		},
		initSound: function() {
			if (Config.isAndroid) {
				createjs.Sound.play = function(para, nailFlag) {
					var soundType = 'eat';
					var sound = Stage.queue.getResult(soundType);
					sound.currentTime = this.soundSprite[para];
					sound.play();
				};
				createjs.Sound.registMySound = function(sound, para) {
					this.soundSprite || (this.soundSprite = {});
					this.soundSprite[sound] = para
				};

				createjs.Sound.registMySound("eat", 0);
			}
		},
		initStage: function() {
			var me = this;
			this.stage = new createjs.Stage("stage");

			this.queue = new createjs.LoadQueue(false);
			this.queue.setMaxConnections(30);

			var isTouch = createjs.Touch.isSupported();
			// console.log("onload isTouch：", isTouch);

			if (isTouch) {
				createjs.Touch.enable(this.stage, true);
				this.stage.mouseEnabled = false;
				var shape = new createjs.Shape;
				shape.graphics.f("white").r(0, 0, W, H);
				this.stage.addChild(shape);
			}
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addEventListener("tick", this.stage);
			me.viewportUI();
		},

		viewportUI: function() {
			var canvas = this.stage.canvas,
				width = win.innerWidth,
				height = win.innerHeight;

			if (width / height > W / H) {
				width = W * height / H;
			} else {
				height = H * width / W;
				var marginTop = (win.innerHeight - height) / 2;
				canvas.style.marginTop = marginTop;
			}

			canvas.width = W;
			canvas.height = H;
			canvas.style.width = width + "px";
			canvas.style.height = height + "px";
		},

		preLoad: function(resCfg) {
			var preLoad = new preLoadPresess(W, H);
			this.stage.addChild(preLoad);
			this.queue.on("complete", resCfg.startFunc, null, true);

			if (resCfg.img) {
				this.queue.loadManifest(resCfg.img, false);
			}

			if (Config.isAndroid) {
				this.queue.loadFile({
					id: "eat",
					src: "assets/audio/eat.wav"
				});
			} else {
				this.queue.installPlugin(createjs.Sound);
				if (resCfg.audio) {
					this.queue.loadManifest(resCfg.audio, false);
				}
			}

			preLoad.forQueue(this.queue);
			this.queue.load();
		}
	};
})(window);

function preLoadPresess(w, h) {
	this.progressText = new createjs.Text("加载中...0%", "bold 24px Arial", "black");
	this.progressText.x = w / 2;
	this.progressText.y = h / 2 + 20;
	this.progressText.textAlign = "center";
	this.progressText.textBaseline = "middle";
	this.addChild(this.progressText);
}
preLoadPresess.prototype = new createjs.Container;

preLoadPresess.prototype.progressCallback = function(para) {
	this.progressText.text = "加载中..." + parseInt(100 * para.progress) + "%";
};

preLoadPresess.prototype.completeCallback = function(para) {
	this.removeChild(this.progressText);
	console.log("资源加载成功!");
	resDefine();
	Run.inStory("start");
};

preLoadPresess.prototype.forQueue = function(queue) {
	queue.on('progress', this.progressCallback, this);
	queue.on('complete', this.completeCallback, this, true);
	queue.on('error', function(queue) {
		console.log("资源加载失败!");
	}, null, true);
};