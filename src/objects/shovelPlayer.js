class shovelPlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(2000);

        scene.add.existing(this);
    }

    update(AKey, DKey, swapKey) {
      // Check if the swap key was just pressed
      if (Phaser.Input.Keyboard.JustDown(swapKey)) {
          let temp = [this.x, this.y];
          this.x = this.scene.pickaxePlayer.x;
          this.y = this.scene.pickaxePlayer.y;
          this.scene.pickaxePlayer.x = temp[0];
          this.scene.pickaxePlayer.y = temp[1];
  
          // Switch control to the pickaxe player
          this.scene.currentPlayer = "pickaxe";
      }
  
      // Only move if the shovel player is the current player
      if (this.scene.currentPlayer === "shovel") {
          if (AKey.isDown) {
              this.x -= 2;
          }
          if (DKey.isDown) {
              this.x += 2;
          }
          this.scene.pickaxePlayer.x = this.x-100;
          this.scene.pickaxePlayer.y = this.y;
      }
    }  
}
