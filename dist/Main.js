/// <reference path="../node_modules/phaser/types/phaser.d.ts" />
import { Preloader } from "./Scenes/Preloader.js";
import { World11 } from "./Scenes/World11.js";
import { World12 } from "./Scenes/World12.js";
import { World13 } from "./Scenes/World13.js";
const config = {
    type: Phaser.AUTO,
    width: 671,
    height: 522,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 830 },
            debug: false
        }
    },
    scene: [Preloader, World11, World12, World13],
};
const game = new Phaser.Game(config);
