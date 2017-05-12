/*选关界面*/
var MapScene = my.Class(BaseScene, {
	constructor: function() {
		this.init();
	},
	init: function() {
		var me = this;
		this.stage = Stage.stage;
		this.queue = Stage.queue;

		//关卡界面容器
		this.el = new createjs.Container;
		this.stage.addChild(this.el);

		//关卡背景
		var map = new createjs.Bitmap(this.queue.getResult("map"));
		map.x = 0, map.y = 0;
		this.el.addChild(map);

		var girl1 = new createjs.Bitmap(this.queue.getResult("girl1"));
		girl1.x = 90, girl1.y = 190;
		this.el.addChild(girl1);

		var girl2 = new createjs.Bitmap(this.queue.getResult("girl2"));
		girl2.x = 310, girl2.y = 550;
		this.el.addChild(girl2);

		var girl3 = new createjs.Bitmap(this.queue.getResult("girl3"));
		girl3.x = 120, girl3.y = 605;
		this.el.addChild(girl3);

		var boyaa = new createjs.Bitmap(this.queue.getResult("boyaa"));
		boyaa.x = 15, boyaa.y = 5;
		this.el.addChild(boyaa);

		me.createMaplevel();

		this.stage.update();
	},
	createMaplevel:function(a){
		var me=this;
		 //关卡数字
		var pointArr = [
			[440, 40],
			[300, 90],
			[160, 110],
			[95, 280],
			[115, 410],
			[290, 505],
			[440, 530],
			[320, 640],
			[85, 550],
			[115, 700],
			[265, 785]
		];
		if (a&&Config.level==11) pointArr[10]=[270,750];
		//生成10个关卡精灵，并绑定事件
		for (var i = 0; i < pointArr.length; i++) {
			var n = i + 1;
			var map;

			if (Config.level < n) {
				i == 0 ? map = "map" + n : map = "lock";
			} else {
				map = "map" + n;
			}
            
			var point = new createjs.Bitmap(this.queue.getResult(map));
			point.x = pointArr[i][0];
			point.y = pointArr[i][1];

			point.level = n;
			map == "lock" ? point.lock = 1 : point.lock = 0;

			this.el.addChild(point);


			// 绑定事件
			point.onTap(function(e) {
				// if (e.target.lock) {
				// 	console.log("按顺序过关成功或者付费，方可解锁~");
				// 	var level=e.target.level;
				// 	me.showUnlock(level);
				// 	return;
				// }
				Config.level = e.target.level;
				console.log("关数:", Config.level);
				Run.inGame();
			});
		}
	},
	

	showUnlock: function(level) {
		var me = this;
		this.goal = new createjs.Container();
		this.el.addChild(this.goal);

		var unlock = new createjs.Bitmap(this.queue.getResult("unlock_bg"));
		unlock.x = 40, unlock.y = 60;

		var sureBtn = new createjs.Bitmap(this.queue.getResult("sureBtn"));
		sureBtn.x = 160, sureBtn.y = 320;

		var backBtn = new createjs.Bitmap(this.queue.getResult("backBtn"));
		backBtn.x = 160, backBtn.y = 426;

		var costText = new createjs.Bitmap(this.queue.getResult("cost"));
		costText.x = 160, costText.y = 230;

		var dollar = new createjs.Bitmap(this.queue.getResult("dollar"));
		dollar.x = 400, dollar.y = 230;

		var cost = new createjs.BitmapText('99', num.numGoal);
		cost.x = 340, cost.y = 240;

		this.goal.addChild(unlock);
		this.goal.addChild(sureBtn);
		this.goal.addChild(backBtn);
		this.goal.addChild(costText);
		this.goal.addChild(dollar);
		this.goal.addChild(cost);

		sureBtn.onTap(function(e) {
			me.goal.visible = false;
			Config.level=level;
			Run.inGame();
		});

		backBtn.onTap(function(e) {
			me.goal.visible = false;
		});

	}
});