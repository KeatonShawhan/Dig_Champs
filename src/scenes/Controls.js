class Controls extends Phaser.Scene {
  constructor() {
    super("controlScene");
  }

  preload() {
    this.load.image("blue_background", "./assets/blue_background.png");
  }

  create() {
    let width = this.sys.game.config.width;
    let height = this.sys.game.config.height;

    this.background = this.add.sprite(width / 2, height / 2, 'blue_background').setScale(1);
    this.ground = this.add.rectangle(width / 2, height, width, 300, 0xb96501).setOrigin(0.5, 1);

    // shovel player contols
    let shovelPlayerControlsTitle = this.add.text(width/4, 100, "Shovel Player", {
      fontSize: '40px',
      strokeThickness: 2,
      color: '#000000',
    })

    shovelPlayerControlsTitle.setOrigin(0.5, 0.5);
    let shovelPlayerControls = this.add.text(width/4, 225, "Move Left: A\n\nMove Right: D\n\nAttack: E", {
      fontSize: '30px',
      color: '#000000',
    })
    shovelPlayerControls.setOrigin(0.5, 0.5);

    // pickaxe player contols
    let pickaxePlayerControlsTitle = this.add.text(3.7*width/5, 100, "Pickaxe Player", {
      fontSize: '40px',
      strokeThickness: 2,
      color: '#000000',
    })

    pickaxePlayerControlsTitle.setOrigin(0.5, 0.5);
    let pickaxePlayerControls = this.add.text(3.7*width/5, 225, "Move Left: <-\n\nMove Right: ->\n\nAttack: P", {
      fontSize: '30px',
      color: '#000000',
    })
    pickaxePlayerControls.setOrigin(0.5, 0.5);

    // swap control
    let swapControl = this.add.text(2.5*width/5, 400, "Swap Positions: Space", {
      fontSize: '40px',
      strokeThickness: 3,
      color: '#000000'
    })
    swapControl.setOrigin(0.5, 0.5);

    // controls setup
    let controlsText = this.add.text(width/2, height-150, "PRESS C TO GO BACK", {
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
      this.scene.start("menuScene");
    }
  }
}
