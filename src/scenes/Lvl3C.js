class Level3_Controls extends Phaser.Scene {
  constructor() {
    super("level3_controlScene");
  }

  preload() {
    this.load.image('level3_controls', './assets/level3_controls.png')
  }

  create() {
    let width = this.sys.game.config.width;
    let height = this.sys.game.config.height;

    this.background = this.add.sprite(width / 2, height / 2, 'level3_controls').setScale(.5);

    let textStroke = this.add.text(328, 43, 'LEVEL 3', {
      fontFamily: '"ArcadeFont"',
      fontSize: '100px',
      stroke: '#fef154',
      strokeThickness: 20,
      color: '#00000000'
    });

    // Black thin stroke (middle layer)
    let textBlackThinStroke = this.add.text(335, 50, 'LEVEL 3', {
      fontFamily: '"ArcadeFont"',
      fontSize: '100px',
      stroke: '#000000',
      strokeThickness: 5,
      color: '#00000000'
    });

    // Orange fill text (innermost layer)
    let textFill = this.add.text(338, 52, 'LEVEL 3', {
      fontFamily: '"ArcadeFont"',
      fontSize: '100px',
      color: '#d9581b'
    });

    // shovel player contols
    let shovelPlayerControlsTitle = this.add.text(600, 300, "Use SHOVEL to kill \n      WORMS", {
      fontSize: '60px',
      strokeThickness: 2,
      color: '#000000',
    })

    shovelPlayerControlsTitle.setOrigin(0.5, 0.5);

    // pickaxe player contols
    let pickaxePlayerControlsTitle = this.add.text(600, 600, "Use PICKAXE to kill \n      SNAILS", {
      fontSize: '60px',
      strokeThickness: 2,
      color: '#000000',
    })

    pickaxePlayerControlsTitle.setOrigin(0.5, 0.5);
   
    

    // controls setup
    let controlsText = this.add.text(width/2, height-50, "PRESS C TO BEGIN", {
      fontSize: '50px',
      strokeThickness: 2,
      color: '#FFFFFFFF'
    })
    controlsText.setOrigin(0.5, 0.5);
    this.CKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.select = this.sound.add('menu_select', {volume: 0.5});


  }

  update(){
    if (this.CKey.isDown){
      this.select.play();
      this.scene.start("caveLevel");
    }
  }
}
