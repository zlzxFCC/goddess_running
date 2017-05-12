// (function(win) {
	var myLib;
	var BaseObject = my.Class({
		constructor: function() {
		},
		getData: function() {
			// console.log("super getData");
			this.canvasWidth = Stage.stage.canvas.width;
        	this.canvasHeight = Stage.stage.canvas.height;
		},
		show: function() {
			this.UI.visible = 1;
		},
		hide: function() {
			this.UI.visible = 0;
		},
		remove: function() {
		},
		move: function() {
		}
	});
// })(window);
