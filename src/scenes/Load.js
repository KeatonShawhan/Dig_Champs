class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.audio('menu_select', './assets/start.wav');
        this.load.audio('lose_game', './assets/lose_game.wav');
        this.load.audio('hurt', './assets/hurt_player.wav');
        this.load.audio('music', './assets/dig_champs_music.wav');
        this.load.audio('score', './assets/levelup.wav');
        this.load.audio('hit_object', './assets/hit_object.wav');
        this.load.audio('swap', './assets/swap.wav');
        this.load.image('tilesetImage', './assets/tileset.png')
        this.load.image('groundImage', './assets/brown.png')
        this.load.image('heart', './assets/heart.png')
        this.load.tilemapTiledJSON('map', './assets/level_1.json')
    
        this.load.spritesheet("shovelPlayer", "./assets/shovel_player.png", {frameWidth:128, frameHeight: 128});
        this.load.spritesheet("pickaxePlayer", "./assets/pickaxe_player.png", {frameWidth:128, frameHeight: 128});
        this.load.spritesheet("snail", "./assets/snail.png", {frameWidth:64, frameHeight: 64});
        this.load.spritesheet("worm", "./assets/worm.png", {frameWidth:64, frameHeight: 64});
        this.load.spritesheet("500_score", "./assets/500score.png", {frameWidth:54, frameHeight: 54});
        this.load.spritesheet("1000_score", "./assets/1000score.png", {frameWidth:54, frameHeight: 54});
        this.load.spritesheet("5000_score", "./assets/5000_score.png", {frameWidth:54, frameHeight: 54});
        this.load.spritesheet("dirt_break", "./assets/dirt_break.png", {frameWidth:32, frameHeight: 32});
        this.load.spritesheet("rock_break", "./assets/rock_break.png", {frameWidth:32, frameHeight: 32});
        this.load.spritesheet("diamond", "./assets/diamond.png", {frameWidth:32, frameHeight: 32});





    
        // particle anims
        this.load.image('pixel', './assets/white_pixel.png')
        this.load.image('5x5', './assets/5x5_white.png')
    }

    create() {
        
    //animation
    this.anims.create({
      key: '500_anim', 
      frameRate: 24,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('500_score', {
          start: 0,
          end: 5,
          first: 0
      })
    })

    this.anims.create({
      key: '1000_anim', 
      frameRate: 24,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('1000_score', {
          start: 0,
          end: 5,
          first: 0
      })
    })

    this.anims.create({
      key: '5000_anim', 
      frameRate: 24,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('5000_score', {
          start: 0,
          end: 5,
          first: 0
      })
    })

    this.anims.create({
        key: 'shovel_attack_left', 
        frameRate: 8,
        repeat: 0,
        frames: this.anims.generateFrameNumbers('shovelPlayer', {
            frames:[7]
        })
    })
  
    this.anims.create({
      key: 'shovel_attack_right', 
      frameRate: 8,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('shovelPlayer', {
          frames: [5]
      })
    })
  
    this.anims.create({
      key: 'shovel_walk_left', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('shovelPlayer', {
          frames:[2, 3]
      })
  })
  
  this.anims.create({
    key: 'shovel_walk_right', 
    frameRate: 8,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('shovelPlayer', {
        frames: [0, 1]
    })
  })
  
    this.anims.create({
      key: 'pickaxe_attack_left', 
      frameRate: 8,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('pickaxePlayer', {
          frames: [7]
      })
    })
  
    this.anims.create({
      key: 'pickaxe_attack_right', 
      frameRate: 8,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('pickaxePlayer', {
          frames:[5]
      })
    })
  
    this.anims.create({
      key: 'pickaxe_walk_left', 
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('pickaxePlayer', {
          frames: [2, 3]
      })
    })
  
    this.anims.create({
      key: 'pickaxe_walk_right', 
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('pickaxePlayer', {
          frames:[0, 1]
      })
    })

    this.anims.create({
      key: 'pickaxe_idle_left', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('pickaxePlayer', {
          frames: [6]
      })
    })
  
    this.anims.create({
      key: 'pickaxe_idle_right', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('pickaxePlayer', {
          frames:[4]
      })
    })
    this.anims.create({
      key: 'shovel_idle_left', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('shovelPlayer', {
          frames: [6]
      })
    })
  
    this.anims.create({
      key: 'shovel_idle_right', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('shovelPlayer', {
          frames:[4]
      })
    })
    this.anims.create({
      key: 'snail_right', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('snail', {
          frames:[1]
      })
    })
    this.anims.create({
      key: 'snail_left', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('snail', {
          frames:[0]
      })
    })

    this.anims.create({
      key: 'worm_right', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('worm', {
          frames:[0]
      })
    })
    this.anims.create({
      key: 'worm_left', 
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('worm', {
          frames:[1]
      })
    })
    this.anims.create({
      key: 'diamond_float', 
      frameRate: 7,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('diamond', {
          frames:[0, 1, 2, 3, 2, 1]
      })
    })

        // proceed once loading completes
        this.scene.start('menuScene')
    }
}