//title
var audioEngine;
var TitleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();


        audioEngine = cc.audioEngine;
        if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
        }
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
            //audioEngine.playMusic("res/bgm_main.mp3", true);
            audioEngine.playMusic(res.title_bgm, true);

        }


        // 画像の追加
        var sprite = cc.Sprite.create(res.title_png);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(0.7);
        this.addChild(sprite, 0);

        var sprite = cc.Sprite.create(res.start_png);
        sprite.setPosition(size.width / 2, size.height / 6);
        sprite.setScale(0.6);
        this.addChild(sprite, 1);

        var sprite = cc.Sprite.create(res.game_title_png);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(1.2);
        this.addChild(sprite, 0);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if (keyCode == 13)
                life = 3;
                socre = 0;
                HP = 3;
                SceneAnime=  cc.TransitionFade.create(2, new gameScene());
              cc.director.runScene(SceneAnime)
                    //cc.director.runScene(new gameScene());
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
