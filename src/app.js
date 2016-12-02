var space;
var shapeArray = [];
var objectArray = [];
var enemyArray = [];
var audioEngine;
var HP = 3;
var life = 3;
var score = 0;
if (typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.terrain = 1;

    SpriteTag.bomb = 2;
    SpriteTag.koban = 4;
    SpriteTag.food = 8;
    SpriteTag.monster1 = 16;
    SpriteTag.monster2 = 32;

    SpriteTag.blue = 64;
    SpriteTag.red = 127;
    SpriteTag.fairy = 256;
    SpriteTag.ghost = 512;
    SpriteTag.Slime = 1024;


    SpriteTag.player = 128;

};

var callbacks = [];
var PlayerStar_X = 140;



var gameLayer;
var gameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();


        audioEngine = cc.audioEngine;
        if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
        }
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
            //audioEngine.playMusic("res/bgm_main.mp3", true);
            audioEngine.playMusic(res.bgm_main_mp3, true);

        }

        var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf, 0x9f, 0x83, 255), cc.color(0xfa, 0xf7, 0x9f, 255));
        this.addChild(backgroundLayer);


        HPText = cc.LabelTTF.create("HP:" + HP, "けいふぉんと", "24", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(HPText, 1);
        HPText.setPosition(100, 295);

        scoreText = cc.LabelTTF.create("SCORE:" + score, "けいふぉんと", "24", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText, 1);
        scoreText.setPosition(200, 295);

        lifeText = cc.LabelTTF.create("stock:" + life, "けいふぉんと", "24", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(lifeText, 1);
        lifeText.setPosition(315, 295);

        space = new cp.Space();
        space.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(space);
        debugDraw.setVisible(false);
        this.addChild(debugDraw, 100);

        var wallBottom = new cp.SegmentShape(space.staticBody,
            cp.v(-4294967294, 1), // start point
            cp.v(4294967295, 1), // MAX INT:4294967295
            0); // thickness of wall
        space.addStaticShape(wallBottom);

        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var game = cc.Layer.extend({
    player: null,
    scroll_gb: null,

    init: function() {
        this._super();

        this.scroll_gb = new Scroll_BG(this);
        var tiledmap = new Tiledmap(this);

        this.player = new Player(this, PlayerStar_X, 188, SpriteTag.player);
        //   var terrain  = new Terrain(this, 100,30,SpriteTag.terrain);
        //   var koban  = new Objects(this, 250,30,SpriteTag.koban);



        this.scheduleUpdate();

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,



            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var spriteSize = target.getContentSize();
                var spriteRect = cc.rect(0, 0, spriteSize.width, spriteSize.height);


                if (cc.rectContainsPoint(spriteRect, location)) {

                    //左
                    if (target.getTag() == 1) {
                        this.player.body.applyImpulse(cp.v(-10, 0), cp.v(0, 0)); //run speed  leftbtn.setOpacity(255);
                        rightbtn.setOpacity(128);
                        this.player.setFlippedX(false);
                    } else {
                        if (target.getTag() == 2) {
                            this.player.body.applyImpulse(cp.v(10, 0), cp.v(0, 0)); //run speed
                            this.player.setFlippedX(true);
                            rightbtn.setOpacity(255);
                            leftbtn.setOpacity(128);
                        }
                    }
                    if (target.getTag() == 3) {
                        if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
                        this.player.body.applyImpulse(cp.v(0, 10), cp.v(0, 0)); //run speed
                        jumpbtn.setOpacity(255);
                    }
                }
                return true;
            },
            onTouchEnded: function(touch, event) {

            }
        });

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            //キー入力したとき
            onKeyPressed: function(keyCode, event) {
                //    console.log(keyCode);

                if (keyCode == 37) { //左
                    this.player.body.applyImpulse(cp.v(-10, 0), cp.v(0, 0)); //run speed
                    //var pos =   this.player.body.p;
                    //  player.body.setPos(cp.v(pos.x + 1, pos.y));
                    this.player.sprite.setFlippedX(true);

                } else if (keyCode == 38) { //上
                    this.player.body.applyImpulse(cp.v(0, 150), cp.v(0, 0)); //run speed

                } else if (keyCode == 39) { //右
                    this.player.body.applyImpulse(cp.v(10, 0), cp.v(0, 0)); //run speed
                    this.player.sprite.setFlippedX(false);
                } else if (keyCode == 40) { //下

                }
                if (keyCode == 88) {
                    console.log("X");


                }
            }.bind(this),
            //キーを離したとき
            onKeyReleased: function(keyCode, event) {
                //  console.log("onKeyReleased");
            }
        }, this);


        //this.collisionBegin.bind(this) bind(this)を付けると、イベントリスナーでthisが使えるようになる
        space.setDefaultCollisionHandler(this.collisionBegin.bind(this), null, null, null);

    },
    addCallback: function(callback) {
        callbacks.push(callback);
    },
    update: function(dt) {
        space.step(dt);

        for (var i = shapeArray.length - 1; i >= 0; i--) {
            shapeArray[i].image.x = shapeArray[i].body.p.x
            shapeArray[i].image.y = shapeArray[i].body.p.y
                //   var angle = Math.atan2(-shapeArray[i].body.rot.y, shapeArray[i].body.rot.x);
                //   shapeArray[i].image.rotation = angle * 57.2957795;
        }

        var dX = this.player.getDistanceX();
        this.setPosition(cc.p(-dX, 0));
        this.scroll_gb.checkAndReload(this.player.sprite.x);


        //addCallback関数に登録された処理を順番に実行する
        for (var i = 0; i < callbacks.length; ++i) {
            callbacks[i]();
        }
        callbacks = [];

    },

    collisionBegin: function(arbiter, space) {



        if (arbiter.a.tag == SpriteTag.terrain && arbiter.b.tag == SpriteTag.terrain) {
            if (this.player.status == PlayerStatus.landing) {
                cc.audioEngine.playEffect(res.landing_mp3);
                this.player.status = PlayerStatus.idling;
            }
        } else {

            if (arbiter.a.tag == SpriteTag.koban || arbiter.b.tag == SpriteTag.koban) {
                cc.audioEngine.playEffect(res.pickup_coin_mp3);

                score++;
                scoreText.setString("SCORE:" + score);
            }
            if (arbiter.a.tag == SpriteTag.food || arbiter.b.tag == SpriteTag.food) {
                cc.audioEngine.playEffect(res.heal_mp3);
                HP = HP + 1;
                HPText.setString("HP:" + HP);
            }
            if (arbiter.a.tag == SpriteTag.bomb || arbiter.b.tag == SpriteTag.bomb) {
                if (audioEngine.isMusicPlaying()) {
                    audioEngine.stopMusic();
                }
                cc.director.runScene(new clearLayer());
            }
            if (arbiter.a.tag == SpriteTag.monster1 || arbiter.b.tag == SpriteTag.monster1) {
                cc.audioEngine.playEffect(res.decide_mp3);
            }
            if (arbiter.a.tag == SpriteTag.monster2 || arbiter.b.tag == SpriteTag.monster2) {
                cc.audioEngine.playEffect(res.decide_mp3);
            }
            if (arbiter.a.tag == SpriteTag.blue || arbiter.b.tag == SpriteTag.blue) {
                console.log("青");
                HP--;
                HPText.setString("HP:" + HP);
                cc.audioEngine.playEffect(res.hit_mp3);
            }
            if (arbiter.a.tag == SpriteTag.red || arbiter.b.tag == SpriteTag.red) {
                console.log("赤");
                HP--;
                HPText.setString("HP:" + HP);
                cc.audioEngine.playEffect(res.hit_mp3);
            }
            if (arbiter.a.tag == SpriteTag.fairy || arbiter.b.tag == SpriteTag.fairy) {
                console.log("妖精");
                HP--;
                HPText.setString("HP:" + HP);
                cc.audioEngine.playEffect(res.hit_mp3);
            }
            if (arbiter.a.tag == SpriteTag.ghost || arbiter.b.tag == SpriteTag.ghost) {
                console.log("幽霊");
                HP--;
                HPText.setString("HP:" + HP);
                cc.audioEngine.playEffect(res.hit_mp3);

            }
            if (arbiter.a.tag == SpriteTag.Slime || arbiter.b.tag == SpriteTag.Slime) {
                console.log("スライム");
                HP--;
                HPText.setString("HP:" + HP);
                cc.audioEngine.playEffect(res.hit_mp3);

            }
            console.log()
            if (arbiter.a.tag == SpriteTag.player) {
                var collision_obj = arbiter.b; // 衝突したShapeの取得
            } else {
                var collision_obj = arbiter.a; // 衝突したShapeの取得
            }

            if (HP <= 0) {
                life--;
                lifeText.setString("stock:" + life);
                HP = 3;
                SceneAnime = cc.TransitionFade.create(2, new gameScene());
                cc.director.runScene(SceneAnime);
                if (audioEngine.isMusicPlaying()) {
                    audioEngine.stopMusic();
                }
                //cc.director.runScene(new gameScene());
            }

            if (life <= 0) {
                SceneAnime = cc.TransitionCrossFade.create(2, new gameoverScene());
                cc.director.runScene(SceneAnime);
                if (audioEngine.isMusicPlaying()) {
                    audioEngine.stopMusic();
                }
                //cc.director.runScene(new gameoverScene());
            }

            //衝突したオブジェクトを消すのは、update関数で定期的に行う
            this.addCallback(function() {
                for (var int = 0; int < objectArray.length; int++) { // 衝突したコインを探す
                    var object = objectArray[int]; // 配置済みオブジェクトの取得
                    if (object.shape == collision_obj) { // 衝突したコインの場合
                        //  console.log("hit");
                        object.removeFromParent();
                        break; // 処理を抜ける
                    }
                }
            }.bind(this));
        }

        return true;
    },
});
