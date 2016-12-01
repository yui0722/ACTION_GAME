//title

var TitleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        // 画像の追加
        var sprite = cc.Sprite.create(res.title_png);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(0.7);
        this.addChild(sprite, 0);

        var sprite = cc.Sprite.create(res.start_png);
        sprite.setPosition(size.width / 2, size.height / 6);
        sprite.setScale(0.7);
        this.addChild(sprite, 1);

        var sprite = cc.Sprite.create(res.game_title_png);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(1.0);
        this.addChild(sprite, 0);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if (keyCode == 13)
                life = 3;
                socre = 0;
                HP = 3;
                    cc.director.runScene(new gameScene());
            },
            onKeyReleased: function(keyCode, event) {

            }
        }, this);

    }
});
var TitleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 200, 140, 128));
        this.addChild(backgroundLayer);
        //ラベルとタップイベント取得
        var layer3 = new TitleLayer();
        this.addChild(layer3);

    }
});
