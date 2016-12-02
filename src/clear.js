//app.js
var clearLayer = cc.Layer.extend({
    ctor: function() {
        this._super();


        audioEngine = cc.audioEngine;
        if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
        }
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
            //audioEngine.playMusic("res/bgm_main.mp3", true);
            audioEngine.playMusic(res.clear_mp3, true);

        }

        var size = cc.director.getWinSize();
        // 画像の追加
        var sprite = cc.Sprite.create(res.clear_png);
        sprite.setPosition(size.width / 2, size.height / 2);
        this.setScale(0.8);
        this.addChild(sprite, 0);
        var sprite = cc.Sprite.create(res.exit2_png);
        sprite.setPosition(size.width / 2, size.height / 3);
        //sprite.setScale(0.8);
        this.addChild(sprite, 0);

        HPText = cc.LabelTTF.create("HP:" + HP, "けいふぉんと", "32", cc.TEXT_ALIGNMENT_CENTER);
        HPText.setColor(255,0,0);
        this.addChild(HPText, 1);
        HPText.setPosition(size.width /2 , size.height - 100);

        scoreText = cc.LabelTTF.create("SCORE:" + score, "けいふぉんと", "32", cc.TEXT_ALIGNMENT_CENTER);
        scoreText.setColor(0,255,153);
        this.addChild(scoreText, 1);
        scoreText.setPosition(size.width /2 , size.height - 150);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if (keyCode == 13)
                    cc.director.runScene(new TitleScene());
            },
            onKeyReleased: function(keyCode, event) {

            }
        }, this);
    }
});
