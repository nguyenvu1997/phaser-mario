import { Flag } from "../Objects/Flag.js";
import { Flowers } from "../Objects/Flowers.js";
import { Koopas } from "../Objects/Koopas.js";
import { LifeMushrooms } from "../Objects/LifeMushrooms.js";
import { Mushrooms } from "../Objects/Mushrooms.js";
import { Player } from "../Objects/Player.js";
import { Stars } from "../Objects/Stars.js";
import { Turtles } from "../Objects/Turtles.js";
import { GameLogic } from "../Utils/GameLogic.js";

export class World11 extends Phaser.Scene {

    map: Phaser.Tilemaps.Tilemap;
    tileset: Phaser.Tilemaps.Tileset;
    gameLogic: GameLogic;
    currentScene: Phaser.Scene;
    player: Player;
    flag: Flag;

    themeSound: Phaser.Sound.BaseSound;
    coinSound: Phaser.Sound.BaseSound;
    itemSound: Phaser.Sound.BaseSound;
    breakSound: Phaser.Sound.BaseSound;
    bumpSound: Phaser.Sound.BaseSound;

    collisionLayer: Phaser.Tilemaps.TilemapLayer;
    coinBricksLayer: Phaser.Tilemaps.TilemapLayer;

    mushrooms: Mushrooms;
    lifeMushrooms: LifeMushrooms;
    stars: Stars;
    flowers: Flowers;
    koopas: Koopas;
    turtles: Turtles;

    playerCollisions: Phaser.Physics.Arcade.Collider[];

    pointsText: Phaser.GameObjects.Text;
    coinsNumber: Phaser.GameObjects.Text;
    timeText: Phaser.GameObjects.Text;

    constructor() {
        super('world11')
        this.playerCollisions = [];
    }

    preload() {
        this.themeSound = this.sound.add('LEVEL1THEMESONG', { loop: true, volume: 0.5 });
        this.coinSound = this.sound.add('COIN', { volume: 0.5 });
        this.itemSound = this.sound.add('ITEM', { volume: 0.5 });
        this.breakSound = this.sound.add('BREAK', { volume: 0.5 });
        this.bumpSound = this.sound.add('BUMP', { volume: 0.5 });
    }

    create() {
        // Infomation
        this.gameLogic = new GameLogic(this);
        this.gameLogic.setInitGame(0, 0);
        this.gameLogic.addText('1-1', 500);


        this.currentScene = this;

        this.map = this.make.tilemap({ key: "map1" });
        this.tileset = this.map.addTilesetImage("tileset", "tiles");
        const backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.coinBricksLayer = this.map.createLayer("CoinBricks", this.tileset, 0, 0);
        this.collisionLayer = this.map.createLayer("CollisionLayer", this.tileset, 0, 0);

        this.coinBricksLayer.setCollision([23]);
        this.collisionLayer.setCollision([1, 3, 20, 98, 99, 100, 145, 146, 396, 414, 415]);

        this.physics.world.setBoundsCollision(true, true, false, false);

        // Create Player
        const spawnPoint = this.map.findObject("Player", obj => obj.name === "Spawn position");
        this.player = new Player(this, spawnPoint.x, spawnPoint.y - 50, 'mario');
        this.player.setPlayerView();
        this.player.setMarioSize('fire');
        this.player.chooseAnimation('walk');
        let playerBullets = this.player.getPlayerBullets();

        // Add Flag
        const flagPosition = this.map.findObject("Player", obj => obj.name === "Flag");
        this.flag = new Flag(this, flagPosition.x - 21, flagPosition.y + 10, "flag");

        // Add Collision
        this.physics.add.collider(this.player, this.collisionLayer)

        // Set Up Camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, 0);
        this.cameras.main.setBackgroundColor('#6b8cff');

        // Add Mushrooms + LifeMushrooms + Stars
        this.mushrooms = new Mushrooms(this, this.map)
        this.lifeMushrooms = new LifeMushrooms(this, this.map)
        this.stars = new Stars(this, this.map)
        this.flowers = new Flowers(this, this.map)

        // Add Koopas
        this.koopas = new Koopas(this, this.map)
        this.turtles = new Turtles(this, this.map)

        this.themeSound.play();

        // Add Collisions
        this.playerCollisions[0] = this.physics.add.collider(this.player, [this.collisionLayer, this.coinBricksLayer], null, this.brickCollision, this);
        this.physics.add.collider(this.koopas.getGroup(), this.collisionLayer);
        this.physics.add.collider(this.turtles.getGroup(), this.collisionLayer);
        this.physics.add.collider(playerBullets, this.collisionLayer);


        // Exit Position 1
        const exitPosition1 = this.map.findObject("Player", obj => obj.name === "HiddenWorldGate");
        let exit1 = this.physics.add.sprite(exitPosition1.x + 36, exitPosition1.y + 5, null)
            .setImmovable(true)
            .setSize(60, 57);
        (exit1.body as Phaser.Physics.Arcade.Body).allowGravity = false;

    }

    brickCollision() {
        if (this.player.body.blocked.up || this.player.body.touching.up) {
            var collisionTile = null;
            collisionTile = this.collisionLayer.getTileAtWorldXY(this.player.x, this.player.y - 40);
            if (collisionTile) {
                if (this.coinBricksLayer.getTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36) != null) {
                    if (collisionTile.index == 20) {
                        this.gameLogic.points += 200;
                        this.gameLogic.coins++;
                        this.collisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
                        this.coinSound.play();
                    }
                    else if (collisionTile.index == 414) {
                        this.collisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
                        this.itemSound.play();
                    }
                    else if (collisionTile.index == 415) {
                        this.collisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
                        this.gameLogic.coins++;
                        this.gameLogic.points += 200;
                        this.coinSound.play();
                    }

                }
                else if (this.collisionLayer.getTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36) != null) {
                    if (this.player.marioSize != 'small') {
                        if (collisionTile.index == 396) {
                            this.gameLogic.points += 50;
                            this.collisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
                            this.breakSound.play();
                        }
                    }
                    else if (collisionTile.index == 396) {
                        this.bumpSound.play();
                    }
                }
                this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
                this.gameLogic.coinsNumber.setText("x  " + this.gameLogic.coins);
            }
        }
    }

    update() {
        this.player.update();
        this.checkStatusGame(this.player)

        this.koopas.update(this.player);
        this.turtles.update(this.player);
    }

    checkStatusGame(player: Player) {
        if (this.player.getIsPlayerDead()) {
            this.scene.start('world11')
        }
    }
}
