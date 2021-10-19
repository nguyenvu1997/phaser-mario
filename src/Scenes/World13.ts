import { Coins } from "../Objects/Coins.js";
import { Flag } from "../Objects/Flag.js";
import { Flowers } from "../Objects/Flowers.js";
import { InvisibleWalls } from "../Objects/InvisibleWalls.js";
import { InvisibleWalls13 } from "../Objects/InvisibleWalls13.js";
import { Koopas } from "../Objects/Koopas.js";
import { Mushrooms } from "../Objects/Mushrooms.js";
import { Platforms13 } from "../Objects/Platforms13.js";
import { Player } from "../Objects/Player.js";
import { Turtles } from "../Objects/Turtles.js";
import { GameLogic } from "../Utils/GameLogic.js";



export class World13 extends Phaser.Scene {

    map: Phaser.Tilemaps.Tilemap;
    tileset: Phaser.Tilemaps.Tileset;
    gameLogic: GameLogic;
    player: Player;
    flag: Flag;

    themeSound: Phaser.Sound.BaseSound;
    coinSound: Phaser.Sound.BaseSound;
    itemSound: Phaser.Sound.BaseSound;
    breakSound: Phaser.Sound.BaseSound;
    bumpSound: Phaser.Sound.BaseSound;
    squishSound: Phaser.Sound.BaseSound;
    warpSound: Phaser.Sound.BaseSound;
    powerupSound: Phaser.Sound.BaseSound;
    lifeupSound: Phaser.Sound.BaseSound;
    kickSound: Phaser.Sound.BaseSound;
    flagpoleSound: Phaser.Sound.BaseSound;
    dieSound: Phaser.Sound.BaseSound;

    collisionLayer: Phaser.Tilemaps.TilemapLayer;
    coinBricksLayer: Phaser.Tilemaps.TilemapLayer;

    mushrooms;
    flowers;
    koopas;
    turtles;
    coins;
    platforms;
    invisibleWalls;

    playerCollisions: Phaser.Physics.Arcade.Collider[];

    pointsText: Phaser.GameObjects.Text;
    coinsNumber: Phaser.GameObjects.Text;
    timeText: Phaser.GameObjects.Text;

    tenCoinsBrick: number;

    dataScene: {};

    constructor() {
        super('world13')
        console.log("world13")
        this.playerCollisions = [];
        this.tenCoinsBrick = 10;
    }

    init(data: {}) {
        this.dataScene = data
        console.log(data)
    }

    preload() {
        this.themeSound = this.sound.add('LEVEL1THEMESONG', { loop: true, volume: 0.5 });
        this.coinSound = this.sound.add('COIN', { volume: 0.5 });
        this.itemSound = this.sound.add('ITEM', { volume: 0.5 });
        this.breakSound = this.sound.add('BREAK', { volume: 0.5 });
        this.bumpSound = this.sound.add('BUMP', { volume: 0.5 });
        this.squishSound = this.sound.add('SQUISH', { volume: 0.5 });
        this.warpSound = this.sound.add('WARP', { volume: 0.5 });
        this.powerupSound = this.sound.add('POWERUP', { volume: 0.5 });
        this.lifeupSound = this.sound.add('LIFEUP', { volume: 0.5 });
        this.kickSound = this.sound.add('KICK', { volume: 0.5 });
        this.flagpoleSound = this.sound.add('FLAGPOLE', { volume: 0.5 });
        this.dieSound = this.sound.add('DIE', { volume: 0.5 });
    }

    create() {
        this.gameLogic = new GameLogic(this);
        this.input.keyboard.enabled = true;

        // Render Map
        this.map = this.make.tilemap({ key: "map3" });
        this.tileset = this.map.addTilesetImage("tileset", "tiles");
        const backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.coinBricksLayer = this.map.createLayer("CoinBricks", this.tileset, 0, 0);
        this.collisionLayer = this.map.createLayer("CollisionLayer", this.tileset, 0, 0);
        this.collisionLayer.setCollision([1, 3, 20, 98, 99, 100, 145, 146, 396, 414, 415]);
        this.coinBricksLayer.setCollision([23]);
        backgroundLayer.setCollision([1, 3, 197, 198, 199]);

        // Add Mushrooms + LifeMushrooms + Stars + Flowers + Coins + Platforms
        this.mushrooms = new Mushrooms(this, this.map)
        this.flowers = new Flowers(this, this.map)
        this.coins = new Coins(this, this.map)
        this.platforms = new Platforms13(this, this.map)

        // Create Player
        const spawnPoint = this.map.findObject("Player", obj => obj.name === "Spawn position");
        this.player = new Player(this, spawnPoint.x, spawnPoint.y - 50, 'mario');
        this.player.setPlayerView();
        this.physics.world.setBoundsCollision(true, true, false, false);
        this.player.setMarioSize(this.dataScene['size']);
        this.player.chooseAnimation('walk');
        this.player.setLives(this.dataScene['lives']);
        let playerBullets = this.player.getPlayerBullets();

        this.gameLogic.setInitGame(0, 0);
        this.gameLogic.addText('1-2', 500, this.player.getLives());

        // Get Data From Previos Scene
        this.gameLogic.points = this.dataScene['points']
        this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
        this.gameLogic.coins = this.dataScene['coins']
        this.gameLogic.coinsNumber.setText("x  " + this.gameLogic.coins);

        // Set Up Camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, 0);
        this.cameras.main.setBackgroundColor('#6b8cff');

        // Add Koopas & Turtles
        this.koopas = new Koopas(this, this.map)
        this.turtles = new Turtles(this, this.map)

        let turtlesArray = [];
        turtlesArray = this.turtles.getGroup().getChildren();
        for (let i = 0; i < this.turtles.getGroup().countActive(true); i++) {
            if (i == 1 || i == 3) {
                turtlesArray[i].state = 3;
                turtlesArray[i].setVelocityY(-1);
                turtlesArray[i].play('redFlyingTurtle');
                turtlesArray[i].body.allowGravity = false;
                turtlesArray[i].body.immovable = true;
            }
            else {
                turtlesArray[i].state = 0;
                turtlesArray[i].setVelocityX(-1);
                turtlesArray[i].play('redTurtleWalking');
            }

            turtlesArray[i].setBounceX(1);
            turtlesArray[i].setSize(36, 52);
            turtlesArray[i].setOffset(3, 0);
        }

        // Add Invisible Walls
        this.invisibleWalls = new InvisibleWalls13(this, this.map)

        let wallsArray = [];
        wallsArray = this.invisibleWalls.getGroup().getChildren();
        for (var i = 0; i < this.invisibleWalls.getGroup().countActive(true); i++) {
            if (i == 2 || i == 3 || i == 6 || i == 7 || i == 9 || i == 10) {
                wallsArray[i].setSize(200, 20);
            }
            else {
                wallsArray[i].setSize(20, 200);
            }
            wallsArray[i].setVisible(false);
        }

        // Flag
        const flagPosition = this.map.findObject("Player", obj => obj.name === "Flag");
        this.flag = new Flag(this, flagPosition.x - 21, flagPosition.y + 10, "flag");

        var flagPole = this.physics.add.sprite(flagPosition.x, flagPosition.y + 152, null)
            .setSize(5, 326);
        flagPole.setImmovable(true)
            .setVisible(false);
        (flagPole.body as Phaser.Physics.Arcade.Body).allowGravity = false;

        // 
        // Add Collisions
        //
        // Player & Objects
        this.playerCollisions[0] = this.physics.add.collider(this.player, this.collisionLayer, this.brickCollision, null, this);
        this.playerCollisions[1] = this.physics.add.collider(this.player, this.koopas.getGroup(), this.koopasColliderHandler, null, this);
        this.playerCollisions[2] = this.physics.add.collider(this.player, this.turtles.getGroup(), this.turtlesColliderHandler, null, this);
        this.playerCollisions[3] = this.physics.add.collider(this.player, backgroundLayer);
        this.playerCollisions[4] = this.physics.add.overlap(this.player, this.mushrooms.getGroup(), this.moveMushroom, null, this);
        this.playerCollisions[7] = this.physics.add.overlap(this.player, this.flowers.getGroup(), this.fireFlowerHandler, null, this);
        this.playerCollisions[8] = this.physics.add.collider(this.player, this.platforms.getGroup(), this.platformsHandler, null, this);
        this.playerCollisions[9] = this.physics.add.overlap(this.player, this.coins.getGroup(), this.coinsHandler, null, this);



        this.physics.add.collider(this.player, this.coinBricksLayer, function () {
            if (this.player.body.blocked.up || this.player.body.touching.up)
                this.bumpSound.play();
        }, null, this);



        this.playerCollisions[10] = this.physics.add.collider(this.player, flagPole, function () {
            this.gameLogic.levelEndingAnimations(6606);
        }, null, this);

        // Koopas & Objects
        this.physics.add.collider(this.koopas.getGroup(), this.collisionLayer);
        this.physics.add.collider(this.koopas.getGroup(), this.koopas.getGroup());
        this.physics.add.collider(this.koopas.getGroup(), this.coinBricksLayer);
        this.physics.add.collider(this.koopas.getGroup(), backgroundLayer);

        // Turtles & Objects
        this.physics.add.collider(this.turtles.getGroup(), this.collisionLayer);
        this.physics.add.collider(this.turtles.getGroup(), this.turtles.getGroup(), this.collisionBetweenEnemiesHandler, null, this);
        this.physics.add.collider(this.turtles.getGroup(), this.koopas.getGroup(), this.collisionBetweenEnemiesHandler, null, this);
        this.physics.add.collider(this.turtles.getGroup(), backgroundLayer);
        this.physics.add.overlap(this.turtles.getGroup(), this.invisibleWalls.getGroup(), this.invisibleWallsHandler, null, this);

        // Mushrom & Objects
        this.physics.add.collider(this.mushrooms.getGroup(), this.collisionLayer);
        this.physics.add.collider(this.mushrooms.getGroup(), this.coinBricksLayer);

        // Flower & Objects
        this.physics.add.collider(this.flowers.getGroup(), this.collisionLayer);
        this.physics.add.collider(this.flowers.getGroup(), this.coinBricksLayer);

        // Bullets & Objects
        this.physics.add.collider(playerBullets, this.collisionLayer, this.bulletExplosion, null, this);
        this.physics.add.collider(playerBullets, this.coinBricksLayer, this.bulletExplosion, null, this);
        this.physics.add.collider(playerBullets, this.koopas.getGroup(), this.bulletExplosion, null, this);
        this.physics.add.collider(playerBullets, this.turtles.getGroup(), this.bulletExplosion, null, this);
        this.physics.add.collider(playerBullets, backgroundLayer, this.bulletExplosion, null, this);

        // Platform & Invisible Walls
        this.physics.add.collider(this.platforms.getGroup(), this.invisibleWalls.getGroup(), this.platformsMovement, null, this);


        setTimeout(() => {
            this.themeSound.play();
        }, 2000);
    }

    // Invisible Walls
    invisibleWallsHandler(turtle) {
        if (turtle.state == 0) {
            if (turtle.body.velocity.x < 0)
                turtle.setVelocityX(70);
            else if (turtle.body.velocity.x > 0)
                turtle.setVelocityX(-70);
        }
        else if (turtle.state == 3) {
            console.log(turtle.body.velocity.x)
            if (turtle.body.velocity.x == -1) {
                if (turtle.body.velocity.y < 0)
                    turtle.setVelocityY(70);
                else if (turtle.body.velocity.y > 0)
                    turtle.setVelocityY(-70);
            }
        }
    }

    // Coin
    coinsHandler(player: Player, coin) {
        coin.destroy(true);
        this.gameLogic.coins++;
        this.gameLogic.points += 200;
        this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
        this.gameLogic.coinsNumber.setText("x  " + this.gameLogic.coins);
        this.coinSound.play();
    }

    // Platform
    platformsHandler(player: Player, platform) {
        if ((player.body.touching.down || player.body.blocked.down) && (platform.body.blocked.up || platform.body.touching.up))
            player.body.blocked.down = true;
        platform.body.friction.x = 1;
    }

    platformsMovement(platform, wall) {
        if ((platform.body.blocked.up || platform.body.touching.up) && (wall.body.blocked.down || wall.body.touching.down)) {
            platform.body.velocity.y = 70;
        }
        else if ((platform.body.blocked.down || platform.body.touching.down) && (wall.body.blocked.up || wall.body.touching.up)) {
            platform.body.velocity.y = -70;
        }
        else if ((platform.body.blocked.left || platform.body.touching.left) && (wall.body.blocked.right || wall.body.touching.right)) {
            platform.body.velocity.x = 70;
        }
        else if ((platform.body.blocked.right || platform.body.touching.right) && (wall.body.blocked.left || wall.body.touching.left)) {
            platform.body.velocity.x = -70;
        }
    }

    // Bullets
    bulletExplosion(bullet, object) {
        const koopas = this.koopas.getGroup();
        const turtles = this.turtles.getGroup();

        if (bullet.body.blocked.right || bullet.body.touching.right || bullet.body.blocked.left || bullet.body.touching.left || ((bullet.body.blocked.down ||
            bullet.body.touching.down || bullet.body.blocked.up || bullet.body.touching.up) &&
            ((koopas != null && koopas.contains(object)) || (turtles != null && turtles.contains(object))))) {
            bullet.disableBody(false, false);
            bullet.play('bulletExplosion', true);

            if (koopas != null && koopas.contains(object)) {
                this.gameLogic.points += 100;
                object.destroy(true);
                this.kickSound.play();
            }
            else if (turtles != null && turtles.contains(object)) {
                if (object.state == 0 || object.state == 1)
                    this.gameLogic.points += 200;
                else
                    this.gameLogic.points += 500;

                object.destroy(true);
                this.kickSound.play();
            }
            else
                this.bumpSound.play();

            this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
            this.time.delayedCall(200, function () { bullet.destroy(); }, [], this);
        }
    }

    // Add Mushroom & Fire Flower 
    moveMushroom(player, mushroom) {
        const itemSound = this.itemSound;
        const mushrooms = this.mushrooms.getGroup();
        let collisionLayer = this.collisionLayer;

        if (this.coinBricksLayer.getTileAtWorldXY(mushroom.x, mushroom.y) != null) {
            this.collisionLayer.removeTileAtWorldXY(mushroom.x, mushroom.y);
            this.flowers.getGroup().children.iterate(function (child) {
                if (child.x + child.width / 2 > mushroom.x && child.x - child.width / 2 < mushroom.x && child.y + child.height / 2 > mushroom.y && child.y - child.height / 2 < mushroom.y) {
                    if (player.marioSize == 'small' || player.marioSize == 'invincible-small') {
                        mushroom.setSize(42, 36);
                        mushroom.setOffset(0, 0);
                        mushroom.body.y -= 36;
                        mushroom.setVelocityX(90);
                        mushroom.body.allowGravity = true;
                        mushroom.setBounceX(1);
                        mushroom.setVisible(true)
                        itemSound.play();
                    }
                    else if ((player.marioSize == 'big' || player.marioSize == 'invincible-big' || player.marioSize == 'fire' || player.marioSize == 'invincible-fire') && mushrooms.contains(mushroom)) {
                        collisionLayer.removeTileAtWorldXY(child.x, child.y);
                        child.setVisible(true)
                        child.setSize(40, 36);
                        child.setOffset(1, 0);
                        child.body.y -= 36;
                        itemSound.play();
                        mushroom.destroy(true);
                    }
                }
            });
        }
        else {
            if (this.mushrooms.getGroup().contains(mushroom)) {
                if (this.player.marioSize == 'small') {
                    this.player.marioSize = 'big'
                } else {
                    this.player.marioSize = 'fire'
                }
                this.gameLogic.points += 1000;
                this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
                this.powerupSound.play();
            }
            else {
                player.addLives(1);
                this.lifeupSound.play();
                this.gameLogic.livesText.setText('LIVE\n' + this.player.getLives());
            }
            mushroom.destroy(true);
        }

    }

    fireFlowerHandler(player: Player, flower) {
        flower.destroy(true);
        this.player.setMarioSize('fire')
        this.gameLogic.points += 1000;
        this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
        this.powerupSound.play();
    }

    // Turtles
    // State: 0 - Normal
    // State: 1 - Change Shell
    // State: 2 - Shell Bullet
    // State: 3 - Flying Turtle Verticaly
    // State: 4 - Flying Turtle
    turtlesColliderHandler(player: Player, turtle) {
        if ((player.body.touching.down || player.body.blocked.down) && (turtle.body.touching.up || turtle.body.blocked.up)) {
            if (turtle.state == 0) {
                this.time.delayedCall(6000, this.turtleToStateZero, [turtle, turtle.body.velocity.x, turtle.anims.getCurrentKey], this);
                turtle.setSize(40, 30);
                turtle.setOffset(0, 10);
                player.chooseAnimation("jump");
                player.setVelocityY(-240);
                turtle.body.stop();
                turtle.anims.stop();

                if (turtle.anims.getCurrentKey == "turtleWalking")
                    turtle.setTexture("enemies", "TurtleShell1");
                else if (turtle.anims.getCurrentKey == "blueTurtleWalking")
                    turtle.setTexture("enemies", "BlueTurtleShell1");
                else if (turtle.anims.getCurrentKey == "redTurtleWalking")
                    turtle.setTexture("enemies", "RedTurtleShell1");

                this.gameLogic.points += 100;
                turtle.anims.play('TurtleShell1')

                turtle.state = 1;
            }
            else if (turtle.state == 1) {
                if (player.x <= turtle.x)
                    turtle.setVelocityX(350);
                else
                    turtle.setVelocityX(-350);

                player.chooseAnimation("jump");
                player.setVelocityY(-240);
                turtle.state = 2;
                this.gameLogic.points += 500;
            }
            else if (turtle.state == 2) {
                turtle.body.stop();
                turtle.state = 1;
                player.chooseAnimation("jump");
                player.setVelocityY(-240);
            }
            else if (turtle.state == 3 || turtle.state == 4) {
                turtle.state = 0;
                turtle.body.allowGravity = true;

                player.chooseAnimation("jump");
                player.setVelocityY(-240);

                if (turtle.anims.getCurrentKey == "greenFlyingTurtle")
                    turtle.play("turtleWalking");
                else if (turtle.anims.getCurrentKey == "redFlyingTurtle")
                    turtle.play("redTurtleWalking");

                this.gameLogic.points += 500;

                if (player.x <= turtle.x) {
                    turtle.setVelocityX(70);
                }
                else {
                    turtle.setVelocityX(-70);
                }
            }
            this.squishSound.play();
        }
        else if (this.player.marioSize == 'small' && (turtle.state == 0 || turtle.state == 2 || turtle.state == 3 || turtle.state == 4)) {
            this.gameLogic.playerKilled(this.player);
        }
        else if ((this.player.marioSize == 'big' || this.player.marioSize == 'fire') && (turtle.state == 0 || turtle.state == 2 || turtle.state == 3 || turtle.state == 4)) {
            if (turtle.state == 0) {
                if (turtle.body.touching.left || turtle.body.blocked.left) {
                    const changeMarioSize = true;
                    this.time.delayedCall(1000, function () {
                        if (changeMarioSize)
                            this.player.marioSize = 'small';
                    }, [], this);
                    turtle.setVelocityX(70);
                }
                else if (turtle.body.touching.right || turtle.body.blocked.right) {
                    const changeMarioSize = true;
                    this.time.delayedCall(1000, function () {
                        if (changeMarioSize)
                            this.player.marioSize = 'small';
                    }, [], this);
                    turtle.setVelocityX(-70);
                }
            }
            else if (turtle.state == 2) {
                if (turtle.body.touching.left || turtle.body.blocked.left) {
                    turtle.setVelocityX(350);
                }
                else if (turtle.body.touching.right || turtle.body.blocked.right) {
                    turtle.setVelocityX(-350);
                }
            }

            this.time.delayedCall(3000, function () {
                if (this.player.marioSize == 'transition')
                    this.player.marioSize = 'small';
            }, [], this);
            this.warpSound.play();
        }
        else if (this.player.marioSize == 'invincible-small' || this.player.marioSize == 'invincible-big' || this.player.marioSize == 'invincible-fire') {
            turtle.destroy();
            this.gameLogic.points += 100;
            this.kickSound.play();
        }
        else if (turtle.state == 1) {
            if (player.x <= turtle.x)
                turtle.setVelocityX(350);
            else
                turtle.setVelocityX(-350);
            turtle.state = 2;
        }

        this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
    }

    turtleToStateZero(turtle, speed, animation) {
        if (turtle.active && turtle.state == 1) {
            turtle.setSize(36, 52);
            turtle.setOffset(3, 0);
            turtle.setVelocityX(speed);
            turtle.state = 0;
            turtle.play(animation);
        }
    }

    collisionBetweenEnemiesHandler(turtle, enemy) {
        if (turtle.state == 0 && enemy.state == 1) {
            if (turtle.body.blocked.left || turtle.body.touching.left)
                turtle.setVelocityX(70);
            else if (turtle.body.blocked.right || turtle.body.touching.right)
                turtle.setVelocityX(-70);
        }
        else if (turtle.state == 1 && enemy.state == 0) {
            if (enemy.body.blocked.left || enemy.body.touching.left)
                enemy.setVelocityX(70);
            else if (enemy.body.blocked.right || enemy.body.touching.right)
                enemy.setVelocityX(-70);

            if (turtle.body.touching.left || turtle.body.blocked.left || turtle.body.touching.right || turtle.body.blocked.right) {
                turtle.setVelocityX(0);
            }
        }
        if (turtle.state == 2) {
            if (turtle.body.touching.left || turtle.body.blocked.left) {
                turtle.setVelocityX(-350);
            }
            else if (turtle.body.touching.right || turtle.body.blocked.right) {
                turtle.setVelocityX(350);
            }
            if (enemy.state == 2) {
                turtle.destroy(true);
                this.gameLogic.points += 500;
            }
            enemy.destroy(true);
            this.gameLogic.points += 500;
            this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
            this.kickSound.play();
        }
    }

    // Koopas
    koopasColliderHandler(player: Player, koopa) {
        if ((player.body.touching.down || player.body.blocked.down) && (koopa.body.touching.up || koopa.body.blocked.up)) {
            koopa.setSize(0, 0);
            koopa.setOffset(0, 25);

            if (koopa.anims.getCurrentKey == "koopaWalking")
                koopa.setTexture("enemies", "Koopa3");
            else if (koopa.anims.getCurrentKey == "blueKoopaWalking")
                koopa.setTexture("enemies", "KoopaBlue3");

            this.time.delayedCall(1000, function () { koopa.destroy(); }, [], this);
            this.player.chooseAnimation("jump");
            player.setVelocityY(-240);
            koopa.body.stop();
            koopa.anims.stop();
            this.gameLogic.points += 100;
            this.squishSound.play();
        }
        else if (this.player.marioSize == 'small') {
            this.gameLogic.playerKilled(this.player);
        }
        else if (this.player.marioSize == 'big' || this.player.marioSize == 'fire') {
            const changeMarioSize = true;
            this.time.delayedCall(1000, function () {
                if (changeMarioSize)
                    this.player.marioSize = 'small';
            }, [], this);

            if (koopa.body.touching.left || koopa.body.blocked.left)
                koopa.setVelocityX(70);
            else if (koopa.body.touching.right || koopa.body.blocked.right)
                koopa.setVelocityX(-70);

            this.warpSound.play();
        }
        else if (this.player.marioSize == 'invincible-small') {
            koopa.destroy();
            this.gameLogic.points += 100;
            this.kickSound.play();
        }
        this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
    }

    brickCollision(player) {
        if (player.body.blocked.up || player.body.touching.up) {
            var collisionTile = null;
            collisionTile = this.collisionLayer.getTileAtWorldXY(player.x, player.y - 40);
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
                        this.tenCoinsBrick--;
                        if (this.tenCoinsBrick == 0) {
                            this.collisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
                            this.tenCoinsBrick = 10;
                        }
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
        this.checkGameStatus(this.gameLogic.gameStatus)

        this.koopas.update(this.player);
        this.turtles.update(this.player);
        // this.platformsCycle(this.platforms.getGroup())
    }

    // Check Game Status
    checkGameStatus(gameStatus: string) {
        if (this.player.y > this.game.config.height) {
            this.gameLogic.playerKilled(this.player);
        }

        if (gameStatus == 'dead') {
            (this.player.body as Phaser.Physics.Arcade.Body).allowGravity = true;
            this.physics.world.removeCollider(this.playerCollisions[0]);
            this.physics.world.removeCollider(this.playerCollisions[1]);
            this.physics.world.removeCollider(this.playerCollisions[2]);
            this.physics.world.removeCollider(this.playerCollisions[3]);
            this.physics.world.removeCollider(this.playerCollisions[4]);
            this.physics.world.removeCollider(this.playerCollisions[5]);
            this.physics.world.removeCollider(this.playerCollisions[6]);
            this.physics.world.removeCollider(this.playerCollisions[7]);
            this.physics.world.removeCollider(this.playerCollisions[8]);
        }
    }
}