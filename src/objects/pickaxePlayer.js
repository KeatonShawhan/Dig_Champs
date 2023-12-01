class pickaxePlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(2000);

        scene.add.existing(this);
    }

    update(leftKey, rightKey) {
        // left/right movement
        if (leftKey.isDown) {
            this.x -= 2
        }
        if (rightKey.isDown) {
            this.x += 2
        }
    }
}
