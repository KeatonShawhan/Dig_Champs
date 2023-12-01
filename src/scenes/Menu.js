class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.image("blue_background", "./assets/blue_background.png");
  }

  create() {
    let width = this.sys.game.config.width;
    let height = this.sys.game.config.height;

    this.background = this.add.sprite(width / 2, height / 2, 'blue_background').setScale(1);
    this.ground = this.add.rectangle(width / 2, height, width, 300, 0xb96501).setOrigin(0.5, 1);

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
      fontSize: '99px',
      stroke: '#000000',
      strokeThickness: 3,
      color: '#00000000'
    });

    // Orange fill text (innermost layer)
    let textFill = this.add.text(width / 2, 150, 'DIG CHAMPS', {
      fontFamily: '"ArcadeFont"',
      fontSize: '99px',
      color: '#d9581b'
    });

    textStroke.setOrigin(0.5, 0.5);
    textBlackThinStroke.setOrigin(0.5, 0.5);
    textFill.setOrigin(0.5, 0.5);
  }
}
