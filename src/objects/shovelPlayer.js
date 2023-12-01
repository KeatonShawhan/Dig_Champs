class shovelPlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(2000);

        scene.add.existing(this);
    }

    update(AKey, DKey) {
        // left/right movement
        if (AKey.isDown) {
            this.x -= 2;
        }
        if (DKey.isDown) {
            this.x += 2;
        }
    }
}
