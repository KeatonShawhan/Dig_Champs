/*
Dig Champs
Names: Keaton Shawhan, Zoe Feller
Date: 12/8/23
Hours spent: ??
Points hit ():

*/

"use strict"

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    fps: {
        target: 120,
        forceSetTimeOut: true
    },
    width: 1000,
    height: 800,
    autoCenter: true,
    scene: [Load, Menu, Controls, Level1_Controls, Level2_Controls, Level3_Controls, Credits, Instructions, grassLevel, caveLevel, beachLevel ]
    // scene: [ Instructions ]
}

let canBeHit = true;
let overlappingObstacle = false;
let pick_attack_state = "false"
let shovel_attack_state = "true"
let game_score = 0

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config
