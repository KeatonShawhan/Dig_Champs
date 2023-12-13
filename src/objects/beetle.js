class beetle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);

      scene.physics.add.existing(this);

      this.body.setGravityY(2000);

      scene.add.existing(this);
      this.dist = 0
      this.dir = "right"
      this.state = 2
      this.move_speed = Phaser.Math.Between(2, 3);
  }
  
  update() {
    if (this.dir == "right"){
      if (this.state == 2){
          this.play("beetle_right", true)
      } 
      if (this.state == 1)
          this.play("beetle_broken_right", true)
      this.x += this.move_speed;
      this.dist += this.move_speed;
      if(this.dist > 300){
        this.dir = "left";
        this.dist = 0;
      }
    } else {
      if (this.state == 2){
        this.play("beetle_left", true)
    } 
    if (this.state == 1)
        this.play("beetle_broken_left", true)
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
