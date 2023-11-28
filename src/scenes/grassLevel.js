class grassLevel extends Phaser.Scene {
  constructor() {
      super('grassLevel')
  }

  preload() {
    this.load.image('ground', "./assets/grassLevel_ground.png");
    // needs to be changed with real assets
    this.load.image("shovelPlayer", "./assets/sprite_left_0.png");
    this.load.image("pickaxePlayer", "./assets/sprite_stop_0.png");
    this.load.image("blue_background", "./assets/blue_background.png");
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

    // background
    this.background = this.add.sprite(width/2, height/2, 'blue_background').setScale(1);

    // ground
    this.ground = this.add.rectangle(width/2, height, width, 200, 0xb96501).setOrigin(0.5, 0.5);
    this.floor = this.physics.add.staticGroup(this.ground);

    // shovel player
    this.shovelPlayer = this.physics.add.sprite(width/2, height-200, 'shovelPlayer').setScale(1);
    this.shovelPlayer.body.setCollideWorldBounds(true);
    this.shovelPlayer.body.setGravityY(2000);
    this.physics.add.collider(this.shovelPlayer, this.floor);

    // pickaxe player
    this.pickaxePlayer = this.physics.add.sprite((width/2)-100, height-200, 'pickaxePlayer').setScale(1);
    this.pickaxePlayer.body.setCollideWorldBounds(true);
    this.pickaxePlayer.body.setGravityY(2000);
    this.physics.add.collider(this.pickaxePlayer, this.floor);

    // collision between players
    this.physics.add.collider(this.pickaxePlayer, this.shovelPlayer);


    // camera setup
    this.cameras.main.startFollow(this.shovelPlayer, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, width/2, height/2);

    // movement keys
    this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // swap places key
    this.swapKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.swapKeyPressed = false; // Flag to track key press state


    this.shovelPlayer_lives = 3;
    this.pickaxePlayer_lives = 3;
  }

  update() {
    // Check if the swap key was just pressed
    if (Phaser.Input.Keyboard.JustDown(this.swapKey)) {
      let temp = [this.shovelPlayer.x, this.shovelPlayer.y];
      this.shovelPlayer.x = this.pickaxePlayer.x;
      this.shovelPlayer.y = this.pickaxePlayer.y;
      this.pickaxePlayer.x = temp[0];
      this.pickaxePlayer.y = temp[1];

      this.swapKeyPressed = true;
    } else if (!this.swapKey.isDown && this.swapKeyPressed) {
        this.swapKeyPressed = false;
    }
    // Shovel Player
    if (this.AKey.isDown) {
        this.shovelPlayer.x -= 2
        this.pickaxePlayer.x -= 2
    }
    if (this.DKey.isDown) {
        this.shovelPlayer.x += 2
        this.pickaxePlayer.x += 2
    }

  }
  updateGameTime() {
    if (this.shovelPlayer_lives > 0 && this.pickaxePlayer_lives > 0) {
        this.gameTime += 1; // Increment by one second
    }
  }
}