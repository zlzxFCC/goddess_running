var BaseScene = my.Class({
    init: function() {
        console.log("super init");
    },
    show: function() {
        this.el.visible = true;
        Stage.stage.update();
    },
    strShow: function() {
        
    },
    hide: function() {
        this.el.visible = false;
        Stage.stage.update();
    },
    remove: function() {
        this.parent.el.removeChild(this.el);
    }
});

