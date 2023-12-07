class shovelPlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        //this.body.setGravityY(2000);
        this.body.setSize(105, 90).setOffset(10, 30);

        scene.add.existing(this);
        this.dir = "right"
    }

    update(AKey, DKey, swapKey, otherPlayer, attackButton) {
      // Check if the swap key was just pressed
      if (Phaser.Input.Keyboard.JustDown(swapKey)) {
          let temp = [this.x, this.y];
          this.x = this.scene.pickaxePlayer.x;
          this.y = this.scene.pickaxePlayer.y;
          this.scene.pickaxePlayer.x = temp[0];
          this.scene.pickaxePlayer.y = temp[1];
  
          // Switch control to the pickaxe player
          this.scene.currentPlayer = "pickaxe";

          // Create particle effect
          this.particles = this.scene.add.particles(this.x, this.y+50, '5x5', { 
            speed: 200,
            lifespan: 200,
            quantity: 1,
            color: '#33ffff'
          });
          this.scene.time.addEvent({
            delay: 200,
            callback: () => {
                this.particles.destroy();
            },
            callbackScope: this.scene
          });
          this.particles2 = this.scene.add.particles(otherPlayer.x, otherPlayer.y+50, '5x5', { 
            speed: 200,
            lifespan: 200,
            quantity: 1,
            color: '#33ffff'
          });
          this.scene.time.addEvent({
            delay: 200,
            callback: () => {
                this.particles2.destroy();
            },
            callbackScope: this.scene
          });
      }
  
      // Only move if the shovel player is the current player
      if (this.scene.currentPlayer === "shovel") {
          if (AKey.isDown) {
            this.x -= 2;
            this.play("shovel_walk_left", true)
            this.scene.pickaxePlayer.play("pickaxe_walk_left", true)
            this.dir = 'left'
          }
          else if (DKey.isDown) {
            this.x += 2;
            this.play("shovel_walk_right", true)
            this.scene.pickaxePlayer.play("pickaxe_walk_right", true)
            this.dir = 'right'
          }
          else{
            if (this.dir == 'right'){
              this.play("shovel_idle_right")
              this.scene.pickaxePlayer.play("pickaxe_idle_right", true)
            } else{
              this.play("shovel_idle_left")
              this.scene.pickaxePlayer.play("pickaxe_idle_left", true)
            }
          }
          this.scene.pickaxePlayer.x = this.x-200;
          this.scene.pickaxePlayer.y = this.y;
      }

      if (Phaser.Input.Keyboard.JustDown(attackButton)) {
        this.play.anims("shovel_attack_left")
      }
    }

    // WORK IN PROGRESS
    attack(worms) {
      worms.getChildren().forEach(worm => {
          if (Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), worm.getBounds())) {
              worm.destroyEnemy();
          }
      });
    }
}
