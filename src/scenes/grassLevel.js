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


    //create the map
    const map = this.make.tilemap({key: "map", tileWidth: 32, tileHeight: 32})
    const tile = map.addTilesetImage("tileset", 'tilesetImage')
    const brown = map.addTilesetImage("brown_tile", 'groundImage')
    
    const bgLayer = map.createLayer("background", tile, 0,-110)
    const obs = map.createLayer("obstacles", tile, 0,-110)
    const ground = map.createLayer("ground", brown, 0,-110)

    

    

    // shovel player
    this.shovelPlayer = new shovelPlayer(this, width/2-100, height-350, 'shovelPlayer').setScale(1.4);

    // pickaxe player
    this.pickaxePlayer = new pickaxePlayer(this, width/2+100, height-350, 'pickaxePlayer').setScale(1.4);
    this.shovelPlayer.setVelocityY(0)
    this.pickaxePlayer.setVelocityY(0)

    this.shovelPlayer.setSize(80, 100)
    this.shovelPlayer.setOffset(20,20)
    this.pickaxePlayer.setSize(80,100)
    this.pickaxePlayer.setOffset(20,20)

    // snail enemy
    // Initialize the snail group
    this.snails = this.physics.add.group({
      classType: snail,
      runChildUpdate: true
    });
    this.snails.create(width, height-290, 'snail').setScale(1.6);

    this.snails.children.iterateLocal('setSize', 45, 40, 20,20);

    // worm enemy
    this.worms = this.physics.add.group({
      classType: worm,
      runChildUpdate: true
    });
    this.worms.create(2000, height-290, 'worm').setScale(1.6);
    this.worms.children.iterateLocal('setSize', 30, 60, 20,10);


    // collision between players
    this.physics.add.collider(this.pickaxePlayer, this.shovelPlayer);

    //cameras 
    this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels-195)
    this.cameras.main.startFollow(this.pickaxePlayer, true, 0.25, .25)
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

    this.currentPlayer = "pickaxe";

    // Collision between enemies and players
    this.physics.add.overlap(this.shovelPlayer, this.worms, this.worm_inter, null, this);
    this.physics.add.overlap(this.pickaxePlayer, this.worms, this.worm_inter, null, this);
    this.physics.add.overlap(this.pickaxePlayer, this.snails, this.snail_inter, null, this);
    this.physics.add.overlap(this.shovelPlayer, this.snails, this.snail_inter, null, this);
    
    this.score = 0
    //score label
    // Yellow stroke text (outermost layer)
    let textStroke = this.add.text(140, 60, "SCORE:   " + this.score, {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      stroke: '#fef154',
      strokeThickness: 20,
      color: '#00000000'
    });

    // Black thin stroke (middle layer)
    let textBlackThinStroke = this.add.text(139,60, "SCORE:   " + this.score, {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      stroke: '#000000',
      strokeThickness: 7,
      color: '#00000000'
    });

    // Orange fill text (innermost layer)
    let textFill = this.add.text(140,60, "SCORE:   " + this.score, {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      color: '#d9581b'
    });

    this.score_animation = this.add.sprite(this.enx, this.eny, "500_score")
    this.score_animation.setVisible(false)

    textStroke.setOrigin(0.5, 0.5);
    textBlackThinStroke.setOrigin(0.5, 0.5);
    textFill.setOrigin(0.5, 0.5);

    textStroke.setScrollFactor(0)
    textBlackThinStroke.setScrollFactor(0)
    textFill.setScrollFactor(0)

    // hearts/lives
    this.heart1 = this.add.sprite(785, 60, "heart")
    this.heart2 = this.add.sprite(855, 60, "heart")
    this.heart3 = this.add.sprite(925, 60, "heart")

    this.heart1.setVisible(true)
    this.heart2.setVisible(true)
    this.heart3.setVisible(true)

    this.heart1.setScrollFactor(0)
    this.heart2.setScrollFactor(0)
    this.heart3.setScrollFactor(0)
  }

  update() {

    // Call update only for the current active player
    if (this.currentPlayer === "shovel") {
      this.cameras.main.startFollow(this.shovelPlayer, false, 0.25, 0.25)
      this.shovelPlayer.update(this.AKey, this.DKey, this.swapKey, this.pickaxePlayer, this.shovelAttack);
    } else if (this.currentPlayer === "pickaxe") {

      this.cameras.main.startFollow(this.pickaxePlayer, false, 0.25, 0.25)
      this.pickaxePlayer.update(this.leftArrow, this.rightArrow, this.swapKey, this.shovelPlayer, this.pickaxeAttack);
      //this.cameras.main.startFollow(this.pickaxePlayer, true, 0.25, 0.25)
    }


    //change hitboxes while attacking
    if(pick_attack_state){
        this.pickaxePlayer.setSize(120,50)
        this.pickaxePlayer.setOffset(0,60)
    } else{
        this.pickaxePlayer.setSize(80,100)
        this.pickaxePlayer.setOffset(20,20)
    }
    if(shovel_attack_state){
      this.shovelPlayer.setSize(120,50)
      this.shovelPlayer.setOffset(0,60)
  } else{
      this.shovelPlayer.setSize(80,100)
      this.shovelPlayer.setOffset(20,20)
  }

  }

  updateGameTime() {
    if (this.shovelPlayer_lives > 0 && this.pickaxePlayer_lives > 0) {
        this.gameTime += 1; // Increment by one second
    }
  }
  
  
  //snail collisions
  snail_inter(player, enemy) {
    if(pick_attack_state){
      this.enx = enemy.x
      this.eny = enemy.y
      enemy.destroy()
      //score animation
      this.score_animation.x = this.enx
      this.score_animation.y = this.eny
      this.score_animation.setVisible(true)
      this.score_animation.play("1000_anim", true)
      this.score_animation.on('animationcomplete', () => {
       this.score_animation.setVisible(false)
      },this);
    } else{
      console.log("lost life");
      //this.sound.play('hurt');
      this.lives -= 1;
  }
  
  }

  //worm collisions
  worm_inter(player, enemy) {
    if(shovel_attack_state){
      this.enx = enemy.x
      this.eny = enemy.y
      enemy.destroy()
      //score animation
      this.score_animation.x = this.enx
      this.score_animation.y = this.eny
      this.score_animation.setVisible(true)
      this.score_animation.play("500_anim", true)
      this.score_animation.on('animationcomplete', () => {
       this.score_animation.setVisible(false)
      },this);

      
    } else{
      console.log("lost life");
      //this.sound.play('hurt');
      this.lives -= 1;
  }
  
  }

}