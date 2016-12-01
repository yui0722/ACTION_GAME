var StatusLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();

    },

    addCoin:function (num) {
        this.coins += num;
        this.labelCoin.setString("Coins:" + this.coins);
    },
});
