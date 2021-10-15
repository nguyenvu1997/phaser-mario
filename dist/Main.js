/// <reference path="../node_modules/phaser/types/phaser.d.ts" />
import { Preloader } from "./Scenes/Preloader.js";
import { World11 } from "./Scenes/World11.js";
const config = {
    type: Phaser.AUTO,
    width: 671,
    height: 522,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 830 },
            debug: true
        }
    },
    scene: [Preloader, World11],
};
const game = new Phaser.Game(config);
