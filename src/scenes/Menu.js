class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.image("blue_background", "./assets/blue_background.png");
    // needs to be changed with real assets
    this.load.image("shovelPlayer", "./assets/shovel_player.png");
    this.load.image("pickaxePlayer", "./assets/pickaxe_player.png");
  }

  create() {
    let width = this.sys.game.config.width;
    let height = this.sys.game.config.height;

    this.background = this.add.sprite(width / 2, height / 2, 'blue_background').setScale(1);
    this.ground = this.add.rectangle(width / 2, height, width, 300, 0xb96501).setOrigin(0.5, 1);
    this.floor = this.physics.add.staticGroup(this.ground);

    // start setup
    let startText = this.add.text(width/2, height-200, "PRESS SHIFT TO START", {
      fontSize: '50px',
      strokeThickness: 2
    });
    startText.setOrigin(0.5, 0.5);
    this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    // controls setup
    let controlsText = this.add.text(width/2-200, height-125, "PRESS C FOR CONTROLS", {
      fontSize: '25px',
      strokeThickness: 1,
      color: '#FFFFFFFF'
    })
    controlsText.setOrigin(0.5, 0.5);
    this.CKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    // instructions setup
    let instructionsText = this.add.text(width/2+200, height-125, "PRESS I FOR INSTRUCTIONS", {
      fontSize: '25px',
      strokeThickness: 1,
      color: '#FFFFFFFF'
    })
    instructionsText.setOrigin(0.5, 0.5);
    this.IKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    // Credits setup
    let creditsText = this.add.text(width/2, height-50, "PRESS T FOR CREDITS", {
      fontSize: '25px',
      strokeThickness: 1,
      color: '#FFFFFFFF'
    })
    creditsText.setOrigin(0.5, 0.5);
    this.TKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);


    // Yellow stroke text (outermost layer)
    let textStroke = this.add.text(width / 2, 150, 'DIG CHAMPS', {
      fontFamily: '"ArcadeFont"',
      fontSize: '100px',
      stroke: '#fef154',
      strokeThickness: 20,
      color: '#00000000'
    });

    // Black thin stroke (middle layer)
    let textBlackThinStroke = this.add.text(width / 2, 150, 'DIG CHAMPS', {
      fontFamily: '"ArcadeFont"',
      fontSize: '100px',
      stroke: '#000000',
      strokeThickness: 5,
      color: '#00000000'
    });

    // Orange fill text (innermost layer)
    let textFill = this.add.text(width / 2, 150, 'DIG CHAMPS', {
      fontFamily: '"ArcadeFont"',
      fontSize: '100px',
      color: '#d9581b'
    });

    textStroke.setOrigin(0.5, 0.5);
    textBlackThinStroke.setOrigin(0.5, 0.5);
    textFill.setOrigin(0.5, 0.5);

    // shovel player
    this.shovelPlayer = new shovelPlayer(this, width/2-100, height-380, 'shovelPlayer').setScale(1.4);
    this.physics.add.collider(this.shovelPlayer, this.floor);

    // pickaxe player
    this.pickaxePlayer = new pickaxePlayer(this, width/2+100, height-380, 'pickaxePlayer').setScale(1.4);
    this.physics.add.collider(this.pickaxePlayer, this.floor);

    this.select = this.sound.add('menu_select', {volume: 0.5});
  }

  update(){
    if (this.CKey.isDown){
      this.select.play();
      this.scene.start("controlScene");
    }
    if (this.shiftKey.isDown){
      this.select.play();
      this.scene.start("level1_controlScene");
    
    }
    if (this.IKey.isDown){
      this.select.play();
      this.scene.start("instructionScene");
    }
    if (this.TKey.isDown){
      this.select.play();
      this.scene.start("creditsScene");
    }
  }
}
