class grassLevel extends Phaser.Scene {
  constructor() {
      super('grassLevel')
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


    const map = this.make.tilemap({key: "map", tileWidth: 32, tileHeight: 32})
    const tile = map.addTilesetImage("tileset", 'tilesetImage')

    const bgLayer = map.createLayer("background", tile, 0,-128)
    const obs = map.createLayer("obstacles", tile, 0,-128)



    // shovel player
    this.shovelPlayer = new shovelPlayer(this, width/2-100, height-380, 'shovelPlayer').setScale(1.4);
    //this.physics.add.collider(this.shovelPlayer, this.floor);

    // pickaxe player
    this.pickaxePlayer = new pickaxePlayer(this, width/2+100, height-380, 'pickaxePlayer').setScale(1.4);
    //this.physics.add.collider(this.pickaxePlayer, this.floor);
    this.shovelPlayer.setVelocityY(0)
    this.pickaxePlayer.setVelocityY(0)

    // snail enemy
    // Initialize the snail group
    this.snails = this.physics.add.group({
      classType: snail,
      runChildUpdate: true
    });
    this.snails.create(width, height-325, 'snail').setScale(1.6); // Replace 100, 200 with the desired x, y position
    //this.physics.add.collider(this.snails, this.floor);

    // worm enemy
    this.worms = this.physics.add.group({
      classType: worm,
      runChildUpdate: true
    });

    // collision between players
    this.physics.add.collider(this.pickaxePlayer, this.shovelPlayer);


    this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.pickaxePlayer, true, 0.25, 0.25)
    this.physics.world.setBounds(0,0,map.widthInPixels, map.heightInPixels)


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
    this.physics.add.overlap(this.pickaxePlayer, this.worms, this.loseLife, null, this);
    this.physics.add.overlap(this.pickaxePlayer, this.snails, this.loseLife, null, this);
    this.physics.add.overlap(this.shovelPlayer, this.snails, this.loseLife, null, this);
  

  
  }

  update() {

    // Call update only for the current active player
    if (this.currentPlayer === "shovel") {
      this.shovelPlayer.update(this.AKey, this.DKey, this.swapKey, this.pickaxePlayer, this.shovelAttack);
      this.cameras.main.startFollow(this.shovelPlayer, true, 0.25, 0.25)
    } else if (this.currentPlayer === "pickaxe") {
      this.cameras.main.startFollow(this.pickaxePlayer, true, 0.25, 0.25)
      this.pickaxePlayer.update(this.leftArrow, this.rightArrow, this.swapKey, this.shovelPlayer, this.pickaxeAttack);
    }

  }

  updateGameTime() {
    if (this.shovelPlayer_lives > 0 && this.pickaxePlayer_lives > 0) {
        this.gameTime += 1; // Increment by one second
    }
  }
  
  /*
  loseLife(player, enemy) {
    console.log("lost life");
    this.sound.play('hurt');
    this.lives -= 1;
  }
  */
  
}