class Credits extends Phaser.Scene {
  constructor() {
    super("creditsScene");
  }

  preload() {
    this.load.image("blue_background", "./assets/blue_background.png");
  }

  create() {
    let width = this.sys.game.config.width;
    let height = this.sys.game.config.height;

    this.background = this.add.sprite(width / 2, height / 2, 'blue_background').setScale(1);
    this.ground = this.add.rectangle(width / 2, height, width, 300, 0xb96501).setOrigin(0.5, 1);

    
    this.TKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    this.select = this.sound.add('menu_select', {volume: 0.5});

    let startY = 100;
    let stepY = 40;
    let links = [
      "https://freesound.org/people/JustInvoke/sounds/138490/",
      "https://freesound.org/people/josefpres/sounds/653714/",
      "https://freesound.org/people/Kenneth_Cooney/sounds/609335/",
      "https://freesound.org/people/Fission9/sounds/488659/",
      "https://freesound.org/people/Antikore/sounds/457195/",
      "https://freesound.org/people/jalastram/sounds/386631/",
    ];

    links.forEach((link, index) => {
      this.add.text(game.config.width/2, startY + index * stepY, link, { fontSize: '18px', fill: '#FFF' }).setOrigin(0.5);
    });

    // Yellow stroke text (outermost layer)
    let textStroke = this.add.text(width / 2, 50, 'References', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      stroke: '#fef154',
      strokeThickness: 20,
      color: '#00000000'
    });

    // Black thin stroke (middle layer)
    let textBlackThinStroke = this.add.text(width / 2, 50, 'References', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      stroke: '#000000',
      strokeThickness: 5,
      color: '#00000000'
    });

    // Orange fill text (innermost layer)
    let textFill = this.add.text(width / 2, 50, 'References', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      color: '#d9581b',
    });
    textStroke.setOrigin(0.5, 0.5);
    textBlackThinStroke.setOrigin(0.5, 0.5);
    textFill.setOrigin(0.5, 0.5);

    // Yellow stroke text (outermost layer)
    let textStrokeArt = this.add.text(width / 2, 350, 'Art', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      stroke: '#fef154',
      strokeThickness: 20,
      color: '#00000000'
    });

    // Black thin stroke (middle layer)
    let textBlackThinStrokeArt = this.add.text(width / 2, 350, 'Art', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      stroke: '#000000',
      strokeThickness: 5,
      color: '#00000000'
    });

    // Orange fill text (innermost layer)
    let textFillArt = this.add.text(width / 2, 350, 'Art', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      color: '#d9581b',
    });
    textStrokeArt.setOrigin(0.5, 0.5);
    textBlackThinStrokeArt.setOrigin(0.5, 0.5);
    textFillArt.setOrigin(0.5, 0.5);
    let textBlackThinStrokeArtNames = this.add.text(width / 2, 400, 'Zoe Feller', {
      fontFamily: '"ArcadeFont"',
      fontSize: '30px',
      stroke: '#000000',
      strokeThickness: 3,
      fill: 'white',
      color: '#00000000'
    });
    textBlackThinStrokeArtNames.setOrigin(0.5, 0.5);

    // Yellow stroke text (outermost layer)
    let textStrokeSound = this.add.text(width / 2, 475, 'Sound', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      stroke: '#fef154',
      strokeThickness: 20,
      color: '#00000000'
    });

    // Black thin stroke (middle layer)
    let textBlackThinStrokeSound = this.add.text(width / 2, 475, 'Sound', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      stroke: '#000000',
      strokeThickness: 5,
      color: '#00000000'
    });

    // Orange fill text (innermost layer)
    let textFillSound = this.add.text(width / 2, 475, 'Sound', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      color: '#d9581b',
    });
    textStrokeSound.setOrigin(0.5, 0.5);
    textBlackThinStrokeSound.setOrigin(0.5, 0.5);
    textFillSound.setOrigin(0.5, 0.5);

    let textBlackThinStrokeSoundNames = this.add.text(width / 2, 525, 'Keaton Shawhan', {
      fontFamily: '"ArcadeFont"',
      fontSize: '30px',
      stroke: '#000000',
      strokeThickness: 3,
      fill: 'white',
      color: '#00000000'
    });
    textBlackThinStrokeSoundNames.setOrigin(0.5, 0.5);

    // Yellow stroke text (outermost layer)
    let textStrokeGameplay = this.add.text(width / 2, 600, 'Gameplay', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      stroke: '#fef154',
      strokeThickness: 20,
      color: '#00000000'
    });

    // Black thin stroke (middle layer)
    let textBlackThinStrokeGameplay = this.add.text(width / 2, 600, 'Gameplay', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      stroke: '#000000',
      strokeThickness: 5,
      color: '#00000000'
    });

    // Orange fill text (innermost layer)
    let textFillGameplay = this.add.text(width / 2, 600, 'Gameplay', {
      fontFamily: '"ArcadeFont"',
      fontSize: '50px',
      color: '#d9581b',
    });
    textStrokeGameplay.setOrigin(0.5, 0.5);
    textBlackThinStrokeGameplay.setOrigin(0.5, 0.5);
    textFillGameplay.setOrigin(0.5, 0.5);

    let textBlackThinStrokeGameplayNames = this.add.text(width / 2, 650, 'Keaton Shawhan  and  Zoe Feller', {
      fontFamily: '"ArcadeFont"',
      fontSize: '30px',
      stroke: '#000000',
      strokeThickness: 3,
      fill: 'white',
      color: '#00000000'
    });
    textBlackThinStrokeGameplayNames.setOrigin(0.5, 0.5);

    // controls setup
    let creditsText = this.add.text(width/2, height-50, "PRESS T TO GO BACK", {
      fontSize: '30px',
      strokeThickness: 2,
      color: '#FFFFFFFF'
    })
    creditsText.setOrigin(0.5, 0.5);


  }

  update(){
    if (this.TKey.isDown){
      this.select.play();
      this.scene.start("menuScene");
    }
  }
}
