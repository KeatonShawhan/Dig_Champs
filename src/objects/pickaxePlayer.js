class pickaxePlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(2000);

        scene.add.existing(this);
    }

    update(leftArrow, rightArrow, swapKey) {
      // Check if the swap key was just pressed
      if (Phaser.Input.Keyboard.JustDown(swapKey)) {
          let temp = [this.x, this.y];
          this.x = this.scene.shovelPlayer.x;
          this.y = this.scene.shovelPlayer.y;
          this.scene.shovelPlayer.x = temp[0];
          this.scene.shovelPlayer.y = temp[1];
  
          // Switch control to the shovel player
          this.scene.currentPlayer = "shovel";
      }
  
      // Only move if the pickaxe player is the current player
      if (this.scene.currentPlayer === "pickaxe") {
          if (leftArrow.isDown) {
              this.x -= 2;
          }
          if (rightArrow.isDown) {
              this.x += 2;
          }
          this.scene.shovelPlayer.x = this.x-100;
          this.scene.shovelPlayer.y = this.y;
      }
    } 
}
