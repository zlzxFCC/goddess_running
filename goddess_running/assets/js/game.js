(function(win) {
    var Run = win.Run = {
        init: function() {
            this.stage = Stage.stage;
            this.queue = Stage.queue;
            this.scenes = [];
        },

        inStory: function(type) {
            this.hideAllScene();
            new IntroduceScene(type);
        },

        inTitle: function() {
            this.hideAllScene();
            if (!this.titleScene) {
                this.titleScene = new TitleScene(this.stage);
                this.scenes.push(this.titleScene);
            } else {
                this.titleScene.show();
            }
        },

        inMap: function() {
            this.hideAllScene();
            if (!this.mapScene) {
                this.mapScene = new MapScene(this.stage);
                this.scenes.push(this.mapScene);
            } else {
                this.mapScene.createMaplevel(1);
                this.mapScene.show();
            }
        },

        inGame: function() {
            this.hideAllScene();
            if (!this.gameScene) {
                this.gameScene = new GameScene(this.stage);
            } else {
                this.gameScene.show();
                this.gameScene.init();
            }
        },

        hideAllScene: function() {
            for (var i = 0; i < this.scenes.length; i++) {
                this.scenes[i].hide();
            }
        },
    };
})(window);
window.onload = function() {
    Stage.init(resConfig);
};