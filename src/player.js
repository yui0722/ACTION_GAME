
// define enum for runner status
if(typeof RunnerStat == "undefined") {
    var RunnerStat = {};

    RunnerStat.running = 0;
    RunnerStat.jumpUp = 1;
    RunnerStat.jumpDown = 2;
    RunnerStat.idling = 3;
    RunnerStat.landing = 4;
};

//プレイヤークラス
var Player = cc.Class.extend({ // cc.Classを継承
   sprite: null, // スプライトを保持
   spriteSheet: null,
   body: null, // bodyを保持
   shape: null, // Shapeを保持
   runningAction: null,
   startPos:null,
   status:null,

   ctor: function(parent, posX, posY, tag) { // コンストラクタ

     this.startPos = cc.p(posX,posY);

     this.spriteSheet = new cc.SpriteBatchNode(res.player_png);
     // ランニングアクションを初期化
     var animFrames = [];
     for (var i = 0; i < 4; i++) {
        var spriteFrame = new cc.SpriteFrame(res.player_png, cc.rect(75 * i, 0, 40, 90));
          var str = "player" + i;
        cc.spriteFrameCache.addSpriteFrame(spriteFrame,  str);
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        animFrames.push(frame);
      }
      var animation = new cc.Animation(animFrames, 0.1);
      this.runningAction = new cc.RepeatForever(new cc.Animate(animation));

      this.sprite = cc.Sprite.create('#player0');
      var size =   this.sprite.getContentSize(); // スプライトのサイズを取得
       this.sprite.setScale(35/size.width, 45/size.height);
       this.sprite.setContentSize(cc.size(35, 45));
      //this.sprite.setScale(0.5,0.5)
      this.sprite.runAction(this.runningAction);
      var size =   this.sprite.getContentSize(); // スプライトのサイズを取得
      this.body = new cp.Body(1, cp.momentForBox(100000, size.width, size.height));
      this.body.setPos(cp.v(posX, posY));
      gameLayer.addChild(  this.sprite, 0);
      this.sprite.setPosition(posX, posY);
      space.addBody(this.body);
      var shape = new cp.BoxShape(this.body, size.width, size.height);

      shape.setFriction(1);
      shape.setElasticity(0);
      shape.tag = tag;
      shape.setCollisionType(shape.tag);
      shape.image =   this.sprite;
      space.addShape(shape);
      shapeArray.push(shape);

   },

   jump:function () {
       cc.log("jump");
       if (this.stat == RunnerStat.running) {
           this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
           this.stat = RunnerStat.jumpUp;
           this.sprite.stopAllActions();
        //   this.sprite.runAction(this.jumpUpAction);

           cc.audioEngine.playEffect(res.jump_mp3);

       }
   },

   update: function(dt) {

   },

   getDistanceX: function() {
      return this.sprite.getPositionX() - this.startPos.x;
   },
   getDistanceY: function() {
      return this.sprite.getPositionY() - this.startPos.y;
   },

});
