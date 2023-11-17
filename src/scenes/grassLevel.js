class grassLevel extends Phaser.Scene {
  constructor() {
      super('grassLevel')
  }

  preload() {
    this.load.image('ground', "./assets/grassLevel_ground.png");
    this.load.image("shovelPlayer", "./assets/planet.png");

  }

  create() {
    // Timer
    this.gameTime = 0;
    this.gameTimerEvent = this.time.addEvent({
        delay: 1000,
        callback: this.updateGameTime,
        callbackScope: this,
        loop: true
    });

    width = game.config.width;
    height = game.config.height;

    // ground
    this.ground = this.add.sprite(width/2, height-75, 'ground').setScale(1);

    // player
    this.shovelPlayer = this.add.sprite(width/2, height-200, 'shovelPlayer').setScale(1);

    // input for shovel
    this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // input for pickaxe
    this.cursors = this.input.keyboard.createCursorKeys();

    this.shovelPlayer_lives = 3;
    this.pickaxePlayer_lives = 3;
  }

  update() {
    // Movement for WASD keys
    if (this.WKey.isDown) {
      // Move up
    }
    if (this.AKey.isDown) {
        // Move left
    }
    if (this.SKey.isDown) {
        // Move down
    }
    if (this.DKey.isDown) {
        // Move right
    }

    // Movement for Arrow keys
    if (this.cursors.left.isDown) {
        // Move left
    }
    if (this.cursors.right.isDown) {
        // Move right
    }
    if (this.cursors.up.isDown) {
        // Move up
    }
    if (this.cursors.down.isDown) {
        // Move down
    }

  }
  updateGameTime() {
    if (this.shovelPlayer_lives > 0 && this.pickaxePlayer_lives > 0) {
        this.gameTime += 1; // Increment by one second
    }
  }
}