class worm extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);

      scene.physics.add.existing(this);

      this.body.setCollideWorldBounds(true);
      this.body.setGravityY(2000);

      scene.add.existing(this);
      this.dist = 0
      this.dir = "right"
      this.move_speed = Phaser.Math.Between(1, 2);
  }

  update() {
    if (this.dir == "right"){
      this.play("worm_right", true)
      this.x += this.move_speed;
      this.dist += this.move_speed;
      if(this.dist > 300){
        this.dir = "left";
        this.dist = 0;
      }
    } else {
      this.play("worm_left", true)
      this.x -= this.move_speed;
      this.dist += this.move_speed;
      if(this.dist > 300){
        this.dir = "right"
        this.dist = 0;
      }
    }
    
  }
  
  destroyEnemy() {
    // Logic for snail destruction
    this.destroy();
  }
}
