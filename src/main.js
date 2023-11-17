/*
Endless Runner: Stick Run
Names: Keaton Shawhan, Zoe Feller
Date: 12/8/23
Hours spent: 
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
            debug: false
        }
    },
    width: 1000,
    height: 600,
    scene: [ Menu, Play ]
    // scene: [ Play ]
}

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config
