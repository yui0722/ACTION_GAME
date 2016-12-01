//result

var gameoverLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        // 画像の追加
        var sprite = cc.Sprite.create(res.gameover_png);
        sprite.setPosition(size.width / 2, size.height  / 2);
        sprite.setScale(0.8);
        this.addChild(sprite, 0);


        var sprite = cc.Sprite.create(res.exit_png);
        sprite.setPosition(size.width / 2, size.height  / 3);
        sprite.setScale(0.7);
        this.addChild(sprite, 0);
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if (keyCode == 13)
                HP = 10;
                 score = 0;
                    cc.director.runScene(new TitleScene());
            },
            onKeyReleased: function(keyCode, event) {

            }
        }, this);

    }
});
var gameoverScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        miss = 0;
        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 200, 140, 128));
        this.addChild(backgroundLayer);
        //ラベルとタップイベント取得
        var layer3 = new gameoverLayer();
        this.addChild(layer3);

    }
});