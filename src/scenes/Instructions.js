class Instructions extends Phaser.Scene {
  constructor() {
    super("instructionScene");
  }

  preload() {
    this.load.image("blue_background", "./assets/blue_background.png");
  }

  create() {
    let width = this.sys.game.config.width;
    let height = this.sys.game.config.height;

    this.background = this.add.sprite(width / 2, height / 2, 'blue_background').setScale(1);
    this.ground = this.add.rectangle(width / 2, height, width, 300, 0xb96501).setOrigin(0.5, 1);

    let instructionsGoal = this.add.text(width/2, 50, "Defeat enemies in the Dig Champ World!", {
      fontSize: '40px',
      strokeThickness: 2,
      color: '#000000',
    })
    instructionsGoal.setOrigin(0.5, 0.5);

    let instructions = this.add.text(width/2, 300, "• Enemies will only die to the player with the correct weapon\n\n\n • Obstacles can only be destroyed by the player \n     with the correct weapon\n\n\n• Only the front player can move and attack\n\n\n• Use the swap button to switch who is in front\n\n\n", {
      fontSize: '25px',
      color: '#000000',
    })
    instructions.setOrigin(0.5, 0.5);
    
    // instructions setup
    let instructionsText = this.add.text(width/2, height-150, "PRESS I TO GO BACK", {
      fontSize: '50px',
      strokeThickness: 1,
      color: '#FFFFFFFF'
    })
    instructionsText.setOrigin(0.5, 0.5);
    this.IKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    this.select = this.sound.add('menu_select', {volume: 0.5});
  }

  update(){
    if (this.IKey.isDown){
      this.select.play();
      this.scene.start("menuScene");
    }
  }
}
