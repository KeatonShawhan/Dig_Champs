class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.audio('menu_select', './assets/start.wav');
        this.load.audio('hurt', './assets/hurt.wav');
        this.load.image('tilesetImage', './assets/tileset.png')
        this.load.tilemapTiledJSON('map', './assets/level_1.json')
    
        this.load.spritesheet("shovelPlayer", "./assets/shovel_player.png", {frameWidth:128, frameHeight: 128});
        this.load.spritesheet("pickaxePlayer", "./assets/pickaxe_player.png", {frameWidth:128, frameHeight: 128});
        this.load.image("snail", './assets/snail.png');
        this.load.image("worm", './assets/worm.png');
    
        // particle anims
        this.load.image('pixel', './assets/white_pixel.png')
        this.load.image('5x5', './assets/5x5_white.png')
    }

    create() {
        
            //animation
    this.anims.create({
        key: 'shovel_attack_left', 
        frameRate: 8,
        repeat: 1,
        frames: this.anims.generateFrameNumbers('shovelPlayer', {
            frames:[3, 4, 4, 3]
        })
    })
  
    this.anims.create({
      key: 'shovel_attack_right', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('shovelPlayer', {
          frames: [1, 2, 2, 1]
      })
    })
  
    this.anims.create({
      key: 'shovel_walk_left', 
      frameRate: 8,
      repeat: 1,
      frames: this.anims.generateFrameNumbers('shovelPlayer', {
          frames:[3, 4, 4, 3]
      })
  })
  
  this.anims.create({
    key: 'shovel_walk_right', 
    frameRate: 8,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('shovelPlayer', {
        frames: [1, 2, 2, 1]
    })
  })
  
    this.anims.create({
      key: 'pickaxe_attack_left', 
      frameRate: 8,
      repeat: 1,
      frames: this.anims.generateFrameNumbers('pickaxePlayer', {
          frames: [7, 8, 8, 7]
      })
    })
  
    this.anims.create({
      key: 'pickaxe_attack_right', 
      frameRate: 8,
      repeat: 1,
      frames: this.anims.generateFrameNumbers('pickaxePlayer', {
          frames:[5, 6]
      })
    })
  
    this.anims.create({
      key: 'pickaxe_walk_left', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('pickaxePlayer', {
          frames: [3, 4]
      })
    })
  
    this.anims.create({
      key: 'pickaxe_walk_right', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('pickaxePlayer', {
          frames:[1, 2]
      })
    })

        // proceed once loading completes
        this.scene.start('menuScene')
    }
}