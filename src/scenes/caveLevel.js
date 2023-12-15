class caveLevel extends Phaser.Scene {
    constructor() {
        super('caveLevel')
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
      const map = this.make.tilemap({key: "cave_map", tileWidth: 32, tileHeight: 32})
      const tile = map.addTilesetImage("cave_tileset", 'cave_tilesetImage')
      
      
      const bgLayer = map.createLayer("background", tile, 0,-110)

      //  initialize background groups ------------------------------------------------------------------------------------
  
      // dirt piles
      this.dirts = this.physics.add.group({
        classType: dirt,
        runChildUpdate: true
      });
      this.dirts.create(1000, height-320, 'dirt_break').setScale(4);
      this.dirts.create(1300, height-320, 'dirt_break').setScale(4);
      this.dirts.create(2100, height-320, 'dirt_break').setScale(4);
      this.dirts.create(2600, height-320, 'dirt_break').setScale(4);
      this.dirts.create(3100, height-320, 'dirt_break').setScale(4);
      this.dirts.children.iterateLocal('setSize', 32, 32, 0,0);
  
      //rocks
      this.rocks = this.physics.add.group({
        classType: rock,
        runChildUpdate: true
      });
      this.rocks.create(1700, height-320, 'rock_break').setScale(4);
      this.rocks.create(2400, height-320, 'rock_break').setScale(4);
      this.rocks.create(2900, height-320, 'rock_break').setScale(4);
      this.rocks.create(3300, height-320, 'rock_break').setScale(4);
      this.rocks.children.iterateLocal('setSize', 32, 32, 0,0);
  
      //diamond - level ender
      this.diamond = this.physics.add.sprite((map.width * 32) - 200, height - 340, "diamond")
      console.log(map.width*32)
      this.diamond.setScale(3)
      this.diamond.setSize(28,30)
      this.diamond.play("diamond_float")
  
      
  
  
      //  initialize players ------------------------------------------------------------------------------------
      // shovel player
      this.shovelPlayer = new shovelPlayer(this, width/2-400, height-350, 'shovelPlayer').setScale(1.4);
  
      // pickaxe player
      this.pickaxePlayer = new pickaxePlayer(this, width/2-200, height-350, 'pickaxePlayer').setScale(1.4);
      this.shovelPlayer.setVelocityY(0)
      this.pickaxePlayer.setVelocityY(0)
  
      this.shovelPlayer.setSize(80, 100)
      this.shovelPlayer.setOffset(20,20)
      this.pickaxePlayer.setSize(80,100)
      this.pickaxePlayer.setOffset(20,20)
  
      // movement keys for shovel
      this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  
      // movement keys for pickaxe
      this.leftArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.rightArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      
      // swap places key
      this.swapKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.swapKeyPressed = false; // Flag to track key press state
  
      // attack keys
      this.shovelAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.pickaxeAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
  
      this.currentPlayer = "pickaxe";
      this.score = 0
      //lives = 3;


    // initialize enemy groups ------------------------------------------------------------------------------------

      // snail enemy
      this.snails = this.physics.add.group({
        classType: snail,
        runChildUpdate: true
      });
      //this.snails.create(1200, height-290, 'snail').setScale(1.6);
      this.snails.create(2300, height-290, 'snail').setScale(1.6);
      this.snails.create(3000, height-290, 'snail').setScale(1.6);
  
      this.snails.children.iterateLocal('setSize', 45, 40, 20,20);
  
      // worm enemy
      this.worms = this.physics.add.group({
        classType: worm,
        runChildUpdate: true
      });
      this.worms.create(1500, height-290, 'worm').setScale(1.6);
      this.worms.create(2000, height-290, 'worm').setScale(1.6);
      this.worms.create(3500, height-290, 'worm').setScale(1.6);
  
      this.worms.children.iterateLocal('setSize', 30, 60, 20,10);

      // beetle enemy
      this.beetles = this.physics.add.group({
        classType: beetle,
        runChildUpdate: true
      });
      this.beetles.create(800, height-290, 'beetle').setScale(1.6);
      this.beetles.create(1700, height-290, 'beetle').setScale(1.6);
      this.beetles.create(2500, height-290, 'beetle').setScale(1.6);
  
      this.beetles.children.iterateLocal('setSize', 50, 50, 10,10);
  
  
      // collisions ------------------------------------------------------------------------------------
  
      // collision between players
      this.physics.add.collider(this.pickaxePlayer, this.shovelPlayer);
  
  
      // Collision between enemies and players
  
      this.physics.add.overlap(this.shovelPlayer, this.worms, this.worm_inter, null, this);
      this.physics.add.overlap(this.pickaxePlayer, this.worms, this.worm_inter, null, this);
      this.physics.add.overlap(this.pickaxePlayer, this.snails, this.snail_inter, null, this);
      this.physics.add.overlap(this.shovelPlayer, this.snails, this.snail_inter, null, this);

      this.physics.add.overlap(this.pickaxePlayer, this.beetles, this.beetle_inter, null, this);
      this.physics.add.overlap(this.shovelPlayer, this.beetles, this.beetle_inter, null, this);
  
      this.physics.add.collider(this.shovelPlayer, this.dirts, this.dirt_inter, null, this);
      this.physics.add.overlap(this.pickaxePlayer, this.dirts, this.dirt_inter, null, this);
      this.physics.add.overlap(this.pickaxePlayer, this.rocks, this.rock_inter, null, this);
      this.physics.add.overlap(this.shovelPlayer, this.rocks, this.rock_inter, null, this);
  
      this.physics.add.overlap(this.pickaxePlayer, this.diamond, this.diamond_inter, null, this);
      
  
     
  
    
  
      // collisions ------------------------------------------------------------------------------------
  
      //cameras 
      this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels-195)
      this.cameras.main.startFollow(this.pickaxePlayer, true, 0.25, .25)
      this.physics.world.setBounds(0,0,map.widthInPixels, map.heightInPixels)
  
      // score label ------------------------------------------------------------------------------------
  
      // Yellow stroke text (outermost layer)
      this.textStroke = this.add.text(200, 60, "SCORE:   " + game_score, {
        fontFamily: '"ArcadeFont"',
        fontSize: '50px',
        stroke: '#fef154',
        strokeThickness: 20,
        color: '#00000000'
      });
  
      // Black thin stroke (middle layer)
      this.textBlackThinStroke = this.add.text(199,60, "SCORE:   " + game_score, {
        fontFamily: '"ArcadeFont"',
        fontSize: '50px',
        stroke: '#000000',
        strokeThickness: 7,
        color: '#00000000'
      });
  
      // Orange fill text (innermost layer)
      this.textFill = this.add.text(200,60, "SCORE:   " + game_score, {
        fontFamily: '"ArcadeFont"',
        fontSize: '50px',
        color: '#d9581b'
      });
  
      this.score_animation = this.add.sprite(this.enx, this.eny, "500_score")
      this.score_animation.setVisible(false)
  
      this.textStroke.setOrigin(0.5, 0.5);
      this.textBlackThinStroke.setOrigin(0.5, 0.5);
      this.textFill.setOrigin(0.5, 0.5);
  
      this.textStroke.setScrollFactor(0)
      this.textBlackThinStroke.setScrollFactor(0)
      this.textFill.setScrollFactor(0)
  
  
      // hearts/lives ------------------------------------------------------------------------------------
      this.heart1 = this.add.sprite(785, 60, "heart")
      this.heart2 = this.add.sprite(855, 60, "heart")
      this.heart3 = this.add.sprite(925, 60, "heart")

    

    if(lives == 1){
      this.heart1.setVisible(false)
      this.heart2.setVisible(false)
      this.heart3.setVisible(true)
    }else if(lives == 2){
      this.heart1.setVisible(false)
      this.heart2.setVisible(true)
      this.heart3.setVisible(true)
    }else {
      this.heart1.setVisible(true)
      this.heart2.setVisible(true)
      this.heart3.setVisible(true)
    }

    this.heart1.setScrollFactor(0)
    this.heart2.setScrollFactor(0)
    this.heart3.setScrollFactor(0)
      
      // lose life temp timer
      this.tempTime = 0
  
      // death sound
      this.death_sound = this.sound.add('lose_game', {volume: 0.5});
  
      // background music
       this.music = this.sound.add('music', {loop: true}).setVolume(0.5);
        this.music.play();
  
      // score sound
      this.scoreSound = this.sound.add('score').setVolume(1);
  
      // hurt sound
      this.hurtSound = this.sound.add('hurt').setVolume(0.5);
  
      // hit object sound
      this.hitObjectSound = this.sound.add('hit_object').setVolume(0.6);
  
      // swap positions sound
      this.swapSound = this.sound.add('swap').setVolume(1);
    }
  
    update() {
      if (lives > 0){  // control active player
        if (this.currentPlayer === "shovel") {
          this.cameras.main.startFollow(this.shovelPlayer, false, 0.25, 0.25)
          this.shovelPlayer.update(this.AKey, this.DKey, this.swapKey, this.pickaxePlayer, this.shovelAttack, this.swapSound);
        } else if (this.currentPlayer === "pickaxe") {
          this.cameras.main.startFollow(this.pickaxePlayer, false, 0.25, 0.25)
          this.pickaxePlayer.update(this.leftArrow, this.rightArrow, this.swapKey, this.shovelPlayer, this.pickaxeAttack, this.swapSound);
        }
  
  
        // attack hitboxes ------------------------------------------------------------------------------------
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
      }else{
        if (this.RKey.isDown) {
          game_score = 0
          lives = 3
          this.scene.start("menuScene");
        }
      }
      
  
    }
  
  
    // game functions ------------------------------------------------------------------------------------
  
    updateGameTime() {
      if (this.shovelPlayer_lives > 0 && this.pickaxePlayer_lives > 0) {
          this.gameTime += 1; // Increment by one second
      }
    }
    
    // rock collision
    rock_inter(player, enemy){
      if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), enemy.getBounds())) {
        overlappingObstacle = true;
      } 
      if(pick_attack_state){
        if (canBeHit) {
          this.hitObjectSound.play();
          enemy.lives--;
          enemy.frame_num += 1
          enemy.setFrame(enemy.frame_num)
          canBeHit = false;
          this.particles = this.add.particles(enemy.x, enemy.y + 20, '5x5', { 
            speed: 200,
            lifespan: 300,
            quantity: 1,
            tint: 0x6b6969
          });
          this.time.addEvent({
            delay: 300,
            callback: () => {
                this.particles.destroy();
            },
            callbackScope: this.scene
          });
          this.time.delayedCall(500, () => {
              canBeHit = true;
          });
  
          if (enemy.lives <= 0) {
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
            game_score += 1000
            this.updateScore();
            overlappingObstacle = false;
          }
        }
      }
    }
  
    dirt_inter(player, enemy){
      if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), enemy.getBounds())) {
        overlappingObstacle = true;
      } 
      if(shovel_attack_state){
        if (canBeHit) {
          this.hitObjectSound.play();
          enemy.lives--;
          enemy.frame_num += 1
          enemy.setFrame(enemy.frame_num)
          canBeHit = false;
          this.particles = this.add.particles(enemy.x, enemy.y + 20, '5x5', { 
            speed: 200,
            lifespan: 300,
            quantity: 1,
            tint: 0x75e3d16
          });
          this.time.addEvent({
            delay: 300,
            callback: () => {
                this.particles.destroy();
            },
            callbackScope: this.scene
          });
          this.time.delayedCall(500, () => {
              canBeHit = true;
          });
  
          if (enemy.lives <= 0) {
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
            game_score += 1000
            this.updateScore();
            overlappingObstacle = false;
          }
        }
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
        game_score += 1000
        this.updateScore();
      } else{
        if ((this.gameTime-this.tempTime) > 1){
          this.tempTime = this.gameTime;
          this.loseLife();
        }
    }
    
    }
    //beetle collisions
    beetle_inter(player, enemy) {
        if(pick_attack_state){
          if (enemy.state == 2){
            if (canBeHit) {
              this.hitObjectSound.play();
              enemy.state --;
              //enemy.setFrame(enemy.frame_num)
              canBeHit = false;
              this.particles = this.add.particles(enemy.x, enemy.y + 20, '5x5', { 
                speed: 200,
                lifespan: 300,
                quantity: 1,
                tint: 0x6b6969
              });
              this.time.addEvent({
                delay: 300,
                callback: () => {
                    this.particles.destroy();
                },
                callbackScope: this.scene
              });
              this.time.delayedCall(500, () => {
                  canBeHit = true;
              });
            }
          }
        }
      if(shovel_attack_state){
        if (enemy.state == 1){
          if (canBeHit) {
            this.hitObjectSound.play();
            enemy.state --;
            //enemy.setFrame(enemy.frame_num)
            canBeHit = false;
            this.particles = this.add.particles(enemy.x, enemy.y + 20, '5x5', { 
            speed: 200,
            lifespan: 300,
            quantity: 1,
            tint: 0x6b6969
            });
            this.time.addEvent({
            delay: 300,
            callback: () => {
                this.particles.destroy();
            },
            callbackScope: this.scene
            });
            this.time.delayedCall(500, () => {
                canBeHit = true;
            });

            if (enemy.state <= 0) {
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
              game_score += 1000
              this.updateScore();
              overlappingObstacle = false;
            }
          }
        }
      }
      if (this.shovelPlayer.x > enemy.x || this.pickaxePlayer.x > enemy.x){
        if ((this.gameTime-this.tempTime) > 1){
          this.tempTime = this.gameTime;
          this.loseLife();
        }
      }
      /*
      if (!shovel_attack_state && !pick_attack_state) {
        if ((this.gameTime-this.tempTime) > 1){
          this.tempTime = this.gameTime;
          this.loseLife();
        }
      }
      */
    }
  
    //diamond collisions
    diamond_inter(player, enemy) {
      if(pick_attack_state){
        this.enx = enemy.x
        this.eny = enemy.y
        enemy.destroy()
        //score animation
        this.score_animation.x = this.enx
        this.score_animation.y = this.eny
        this.score_animation.setVisible(true)
        this.score_animation.play("5000_anim", true)
        this.score_animation.on('animationcomplete', () => {
         this.score_animation.setVisible(false)
        },this);
        game_score += 5000
        this.music.stop();
        this.updateScore();
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
        game_score+=500;
        this.updateScore();
      } else{
        if ((this.gameTime-this.tempTime) > 1){
          this.tempTime = this.gameTime;
          this.loseLife();
        }
      }
    }
  
    updateGameTime() {
      if (lives > 0) {
          this.gameTime += 1; // Increment by one second
      }
    }
  
    loseLife(){
      if (lives == 3){
        this.heart1.setVisible(false);
        this.hurtSound.play();
      }else if (lives == 2){
        this.heart2.setVisible(false);
        this.hurtSound.play();
      }else if (lives == 1){
        this.heart3.setVisible(false);
        this.death();
      }
      
      this.shovelPlayer.becomeInvincible();
      this.pickaxePlayer.becomeInvincible();
      lives -= 1;
    }
    
    updateScore(){
      //this.score += 1000;
      this.scoreSound.play();
      this.textStroke.setText('SCORE:   ' + game_score);
      this.textBlackThinStroke.setText('SCORE:   ' + game_score);
      this.textFill.setText('SCORE:   ' + game_score);
    }
  
    death(){
      if (this.currentPlayer == "shovel"){
        let overlay = this.add.rectangle(this.shovelPlayer.x, this.shovelPlayer.y, game.config.width, game.config.height*2, 0x1CE2D5);
        this.deathText = this.add.text(this.shovelPlayer.x, this.shovelPlayer.y - 100, 'GAME OVER', { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
        this.finalScoreText = this.add.text(this.shovelPlayer.x, this.shovelPlayer.y, 'Final Score: ' + game_score, { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
        this.restartText = this.add.text(this.shovelPlayer.x, this.shovelPlayer.y + 100, 'Press R to restart', { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
      }
      else {
        let overlay = this.add.rectangle(this.pickaxePlayer.x, this.pickaxePlayer.y, game.config.width, game.config.height*2, 0x1CE2D5);
        this.finalScoreText = this.add.text(this.pickaxePlayer.x, this.pickaxePlayer.y - 100, 'GAME OVER', { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
        this.finalScoreText = this.add.text(this.pickaxePlayer.x, this.pickaxePlayer.y, 'Final Score: ' + game_score, { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
        this.restartText = this.add.text(this.pickaxePlayer.x, this.pickaxePlayer.y + 100, 'Press R to restart', { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
      }
      this.music.stop();
      this.death_sound.play();
    }
  

  win(){
    if (this.currentPlayer == "shovel"){
      let overlay = this.add.rectangle(this.shovelPlayer.x, this.shovelPlayer.y, game.config.width, game.config.height*2, 0x1CE2D5);
      this.deathText = this.add.text(this.shovelPlayer.x, this.shovelPlayer.y - 100, 'YOU WIN!', { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
      this.finalScoreText = this.add.text(this.shovelPlayer.x, this.shovelPlayer.y, 'Final Score: ' + game_score, { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
      this.restartText = this.add.text(this.shovelPlayer.x, this.shovelPlayer.y + 100, 'Press R to restart', { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
    }
    else {
      let overlay = this.add.rectangle(this.pickaxePlayer.x, this.pickaxePlayer.y, game.config.width, game.config.height*2, 0x1CE2D5);
      this.finalScoreText = this.add.text(this.pickaxePlayer.x, this.pickaxePlayer.y - 100, 'YOU WIN!', { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
      this.finalScoreText = this.add.text(this.pickaxePlayer.x, this.pickaxePlayer.y, 'Final Score: ' + game_score, { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
      this.restartText = this.add.text(this.pickaxePlayer.x, this.pickaxePlayer.y + 100, 'Press R to restart', { fontSize: '76px', fill: '#FFF' }).setOrigin(0.5);
    }
    this.music.stop();
  }
}