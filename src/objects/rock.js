class rock extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);

      scene.physics.add.existing(this);

      this.body.setGravityY(2000);

      //scene.add.existing(this);
      this.dist = 0
      this.dir = "right"
      this.lives = 3
      this.frame_num = 0
  }
  
  update() {
    
  }

  destroyEnemy() {
    // Logic for snail destruction
    this.destroy();
  }
}
