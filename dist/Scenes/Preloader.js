import { loadBowserAnimation, loadFishAnimation, loadGameAnimation, loadKoopaAnimation, loadMarioAnimation, loadTurtleAnimation } from "../Animation/Export.js";
export class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
        console.log('preloader');
    }
    preload() {
        // Load tileset images
        this.load.image("tiles", "assets/Images/tileset.png");
        //load tileset images NEW
        this.load.image("spacedTiles", "assets/Images/tilesetEdited.png");
        // Load atlas
        this.load.atlas('mario', 'assets/Images/Spritesheets/playerSpritesheet (1).png', 'assets/Images/JSON Sprites/playerSprites (1).json');
        this.load.atlas('enemies', 'assets/Images/Spritesheets/enemiesSpritesheet.png', 'assets/Images/JSON Sprites/enemiesSprites.json');
        this.load.atlas('bulletAtlas', 'assets/Images/Spritesheets/bulletsSpritesheet.png', 'assets/Images/JSON Sprites/bulletsSprites.json');
        this.load.atlas('fireBreathAtlas', 'assets/Images/Spritesheets/fireSpritesheet.png', 'assets/Images/JSON Sprites/fireSprites.json');
        // Load maps
        this.load.tilemapTiledJSON("map1", "assets/Levels/world11.json");
        this.load.tilemapTiledJSON("map1Hidden", "assets/Levels/world11hidden.json");
        this.load.tilemapTiledJSON("map2", "assets/Levels/world12.json");
        this.load.tilemapTiledJSON("map2End", "assets/Levels/world12FlagScene.json");
        this.load.tilemapTiledJSON("map3", "assets/Levels/world13.json");
        this.load.tilemapTiledJSON("map4", "assets/Levels/world14.json");
        this.load.tilemapTiledJSON("map5", "assets/Levels/world21.json");
        this.load.tilemapTiledJSON("map22", "assets/Levels/world22.json");
        // Add object images
        this.load.image("brickImg", "assets/Images/Objects Images/brickImg.png");
        this.load.image("flagImg", "assets/Images/Objects Images/flag.png");
        this.load.image("mushroomImg", "assets/Images/Objects Images/mushroomImg.png");
        this.load.image("lifeMushroomImg", "assets/Images/Objects Images/lifeMushroomImg.png");
        this.load.image("starImg", "assets/Images/Objects Images/starImg.png");
        this.load.image("flowerImg", "assets/Images/Objects Images/flowerImg.png");
        this.load.image("platformImg", "assets/Images/Objects Images/platformImg.png");
        this.load.image("smallPlatformImg", "assets/Images/Objects Images/smallPlatformImg.png");
        this.load.image("coinImg1", "assets/Images/Objects Images/coinImg1.png");
        this.load.image("axeImg", "assets/Images/Objects Images/axeImg.png");
        // Load images
        this.load.image("flag", "assets/Images/Objects Images/level1Flag.png");
        this.load.image("coinSymbol1", "assets/Images/Objects Images/coinSymbol1.png");
        this.load.image("background22", "assets/Images/Screenshot_17.png");
        // Load startgame scene image
        this.load.image("startSceneImg", "assets/Images/startScene.png");
        // Load sounds
        this.load.audio("COIN", "assets/Sounds/Coin.wav");
        this.load.audio("LIFEUP", "assets/Sounds/1up.wav");
        this.load.audio("BEEP", "assets/Sounds/Beep.wav");
        this.load.audio("JUMP", "assets/Sounds/Jump.wav");
        this.load.audio("BOWSERDIE", "assets/Sounds/Bowser Die.wav");
        this.load.audio("BREAK", "assets/Sounds/Break.wav");
        this.load.audio("BUMP", "assets/Sounds/Bump.wav");
        this.load.audio("DIE", "assets/Sounds/Die.wav");
        this.load.audio("ENEMYFIRE", "assets/Sounds/Enemy Fire.wav");
        this.load.audio("FIREBALL", "assets/Sounds/Fire Ball.wav");
        this.load.audio("FLAGPOLE", "assets/Sounds/Flagpole.wav");
        this.load.audio("GAMEOVER", "assets/Sounds/Game Over.wav");
        this.load.audio("ITEM", "assets/Sounds/Item.wav");
        this.load.audio("KICK", "assets/Sounds/Kick.wav");
        this.load.audio("PAUSE", "assets/Sounds/Pause.wav");
        this.load.audio("POWERUP", "assets/Sounds/Powerup.wav");
        this.load.audio("SKID", "assets/Sounds/Skid.wav");
        this.load.audio("SQUISH", "assets/Sounds/Squish.wav");
        this.load.audio("THWOMP", "assets/Sounds/Thwomp.wav");
        this.load.audio("VINE", "assets/Sounds/Vine.wav");
        this.load.audio("WARP", "assets/Sounds/Warp.wav");
        this.load.audio('LEVEL1THEMESONG', "assets/Sounds/01 - Super Mario Bros.mp3");
    }
    create() {
        loadBowserAnimation(this);
        loadFishAnimation(this);
        loadGameAnimation(this);
        loadKoopaAnimation(this);
        loadMarioAnimation(this);
        loadTurtleAnimation(this);
        this.scene.start('world11');
    }
}
