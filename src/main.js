/*
Dig Champs
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
            debug: true
        }
    },
    fps: {
        target: 120,
        forceSetTimeOut: true
    },
    width: 1000,
    height: 800,
    scene: [Load, Menu, Controls, , Instructions, grassLevel ]
    // scene: [ Instructions ]
}

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config
