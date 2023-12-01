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
    this.ground = this.add.rectangle(width/2, height, width, 400, 0xb96501).setOrigin(0.5, 0.5);
    this.floor = this.physics.add.staticGroup(this.ground);

    // shovel player
    this.shovelPlayer = new shovelPlayer(this, width/2, height-400, 'shovelPlayer');
    this.physics.add.collider(this.shovelPlayer, this.floor);

    // shovel player
    this.pickaxePlayer = new pickaxePlayer(this, width/2-200, height-400, 'pickaxePlayer');
    this.physics.add.collider(this.pickaxePlayer, this.floor);

    // collision between players
    this.physics.add.collider(this.pickaxePlayer, this.shovelPlayer);

    // camera setup (work in progress)
    this.cameras.main.startFollow(this.shovelPlayer, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, width/2, height/2);

    // movement keys for shovel
    this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // movement keys for pickaxe
    this.leftArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    // swap places key
    this.swapKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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
    this.shovelPlayer.update(this.AKey, this.DKey);
    this.pickaxePlayer.update(this.leftArrow, this.rightArrow);

  }
  updateGameTime() {
    if (this.shovelPlayer_lives > 0 && this.pickaxePlayer_lives > 0) {
        this.gameTime += 1; // Increment by one second
    }
  }
}