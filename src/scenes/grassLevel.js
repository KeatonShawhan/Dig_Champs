class grassLevel extends Phaser.Scene {
  constructor() {
      super('grassLevel')
  }

  preload() {
    this.load.image('ground', "./assets/grassLevel_ground.png");

    // needs to be changed with real assets
    this.load.image("shovelPlayer", "./assets/sprite_left_0.png");
    this.load.image("pickaxePlayer", "./assets/sprite_stop_0.png");
    this.load.image("snail", './assets/spaceship.png');
    this.load.image("worm", './assets/border.png');

    // particle anims
    this.load.image('pixel', './assets/white_pixel.png')
    this.load.image('5x5', './assets/5x5_white.png')

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
    this.ground = this.add.rectangle(width/2, height, width*2, 400, 0xb96501).setOrigin(0.5, 0.5);
    this.floor = this.physics.add.staticGroup(this.ground);

    // shovel player
    this.shovelPlayer = new shovelPlayer(this, width/2, height-400, 'shovelPlayer');
    this.physics.add.collider(this.shovelPlayer, this.floor);

    // shovel player
    this.pickaxePlayer = new pickaxePlayer(this, width/2-200, height-400, 'pickaxePlayer');
    this.physics.add.collider(this.pickaxePlayer, this.floor);

    // snail enemy
    // Initialize the snail group
    this.snails = this.physics.add.group({
      classType: snail,
      runChildUpdate: true
    });
    this.snails.create(width, height-300, 'snail').setScale(0.1); // Replace 100, 200 with the desired x, y position
    this.physics.add.collider(this.snails, this.floor);

    // worm enemy
    this.worms = this.physics.add.group({
      classType: worm,
      runChildUpdate: true
    });

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

    // attack keys
    this.shovelAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.pickaxeAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    this.lives = 3;

    this.currentPlayer = "shovel";

    // Collision between enemies and players
    this.physics.add.overlap(this.shovelPlayer, this.worms, this.loseLife, null, this);
    this.physics.add.overlap(this.pickaxePlayer, this.snails, this.loseLife, null, this);
  }

  update() {

    // Call update only for the current active player
    if (this.currentPlayer === "shovel") {
      this.shovelPlayer.update(this.AKey, this.DKey, this.swapKey, this.pickaxePlayer);
    } else if (this.currentPlayer === "pickaxe") {
      this.pickaxePlayer.update(this.leftArrow, this.rightArrow, this.swapKey, this.shovelPlayer);
    }

    // Attack handling
    if (Phaser.Input.Keyboard.JustDown(this.shovelAttack)) {
      if (this.currentPlayer === "shovel") {
          this.shovelPlayer.attack(this.worms);
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.pickaxeAttack)) {
      if (this.currentPlayer === "pickaxe") {
          this.shovelPlayer.attack(this.worms);
      }
    }
  }

  updateGameTime() {
    if (this.shovelPlayer_lives > 0 && this.pickaxePlayer_lives > 0) {
        this.gameTime += 1; // Increment by one second
    }
  }
  
  loseLife(player, enemy) {
    console.log("lost life");
    this.lives -= 1;
  }
  
}