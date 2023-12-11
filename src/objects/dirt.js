class dirt extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);

      scene.physics.add.existing(this);

      this.body.setGravityY(2000);
      this.lives = 3
      this.frame_num = 0
      //scene.add.existing(this);

  }
  
  update() {
    
  }

  dirt_becomeInvincible(duration = 1000) {
    this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 100,
        ease: 'Linear',
        yoyo: true,
        repeat: duration / 100 - 1,
        onComplete: () => {
            this.isInvincible = false;
            this.alpha = 1;
            this.lives -=1
        }
    });
  }

  destroyEnemy() {
    // Logic for snail destruction
    this.destroy();
  }
}
