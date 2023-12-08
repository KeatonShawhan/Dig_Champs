class pickaxePlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        //this.body.setGravityY(2000);
        this.body.setSize(115, 90).setOffset(10, 30);

        scene.add.existing(this);
        this.attack = false;

        this.dir = "right"
    }

    update(leftArrow, rightArrow, swapKey, otherPlayer, attackButton) {

      // Check if the swap key was just pressed
      if (Phaser.Input.Keyboard.JustDown(swapKey)) {
          let temp = [this.x, this.y];
          this.x = this.scene.shovelPlayer.x;
          this.y = this.scene.shovelPlayer.y;
          this.scene.shovelPlayer.x = temp[0];
          this.scene.shovelPlayer.y = temp[1];
  
          // Switch control to the shovel player
          this.scene.currentPlayer = "shovel";

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

      // Only move if the pickaxe player is the current player
      if (this.scene.currentPlayer === "pickaxe") {
          if (leftArrow.isDown) {
              this.x -= 2;
              this.play("pickaxe_walk_left", true)
              this.scene.shovelPlayer.play("shovel_walk_left", true)
              this.dir = 'left'
          }
          else if (rightArrow.isDown) {
              this.x += 2;
              this.play("pickaxe_walk_right", true)
              this.scene.shovelPlayer.play("shovel_walk_right", true)
              this.dir = 'right'
          } 
          else{
            if (this.attack == false){
              if (this.dir == 'right'){
                this.play("pickaxe_idle_right", true)
                this.scene.shovelPlayer.play("shovel_idle_right", true)
              } else{
                this.play("pickaxe_idle_left")
                this.scene.shovelPlayer.play("shovel_idle_left", true)
              }
            }
          }
          //this.anims.play(`pickaxe_walk_${this.dir}`, true)
          this.scene.shovelPlayer.x = this.x-200;
          this.scene.shovelPlayer.y = this.y;
          
      }
      
      if (Phaser.Input.Keyboard.JustDown(attackButton) && !this.attack) {
        this.attack = true;
        if(this.dir == "left"){
          this.play("pickaxe_attack_left",true)
        } else{
          this.play("pickaxe_attack_right",true)
        }
        this.on('animationcomplete', () => {
          this.attack = false;
        },this);
        
      } 
    }

    // WORK IN PROGRESS
    attack(snails) {
      snails.getChildren().forEach(snail => {
          if (Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), snail.getBounds())) {
              snail.destroyEnemy();
          }
      });
    }
}
