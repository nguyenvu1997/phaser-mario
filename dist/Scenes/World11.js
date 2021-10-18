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
    constructor() {
        super('world11');
        console.log("world11");
        this.playerCollisions = [];
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
    }
    create() {
        // Infomation
        this.gameLogic = new GameLogic(this);
        this.input.keyboard.enabled = true;
        // Render Map
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
        this.player = new Player(this, spawnPoint.x + 5000, spawnPoint.y - 50, 'mario');
        this.player.setPlayerView();
        // invincible
        this.player.setMarioSize('small');
        this.player.chooseAnimation('walk');
        this.player.setLives(2);
        let playerBullets = this.player.getPlayerBullets();
        this.gameLogic.setInitGame(0, 0);
        this.gameLogic.addText('1-1', 500, this.player.getLives());
        // Set Up Camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, 0);
        this.cameras.main.setBackgroundColor('#6b8cff');
        // Add Mushrooms + LifeMushrooms + Stars
        this.mushrooms = new Mushrooms(this, this.map);
        this.lifeMushrooms = new LifeMushrooms(this, this.map);
        this.stars = new Stars(this, this.map);
        this.flowers = new Flowers(this, this.map);
        // Add Koopas
        this.koopas = new Koopas(this, this.map);
        this.turtles = new Turtles(this, this.map);
        this.themeSound.play();
        // Add Collisions
        // Player & Objects
        this.physics.add.collider(this.player, this.collisionLayer);
        this.playerCollisions[0] = this.physics.add.collider(this.player, [this.collisionLayer, this.coinBricksLayer], null, this.brickCollision, this);
        this.playerCollisions[1] = this.physics.add.collider(this.player, this.koopas.getGroup(), this.koopasColliderHandler, null, this);
        this.playerCollisions[2] = this.physics.add.collider(this.player, this.turtles.getGroup(), this.turtlesColliderHandler, null, this);
        // Mushrooms & Layer
        this.physics.add.collider(this.mushrooms.getGroup(), this.collisionLayer);
        this.physics.add.collider(this.mushrooms.getGroup(), this.coinBricksLayer);
        this.playerCollisions[3] = this.physics.add.overlap(this.player, this.mushrooms.getGroup(), this.moveMushroom, null, this);
        // Life Mushrooms & Layer
        this.physics.add.collider(this.lifeMushrooms.getGroup(), this.collisionLayer);
        this.physics.add.collider(this.lifeMushrooms.getGroup(), this.coinBricksLayer);
        this.playerCollisions[4] = this.physics.add.overlap(this.player, this.lifeMushrooms.getGroup(), this.moveMushroom, null, this);
        this.physics.add.collider(this.koopas.getGroup(), this.collisionLayer);
        this.physics.add.collider(this.koopas.getGroup(), this.koopas.getGroup());
        this.physics.add.collider(this.turtles.getGroup(), this.collisionLayer);
        this.physics.add.collider(this.turtles.getGroup(), this.koopas.getGroup(), this.collisionBetweenEnemiesHandler, null, this);
        // Bullets & Objects
        this.physics.add.collider(playerBullets, this.collisionLayer, this.bulletExplosion, null, this);
        this.physics.add.collider(playerBullets, this.coinBricksLayer, this.bulletExplosion, null, this);
        this.physics.add.collider(playerBullets, this.koopas.getGroup(), this.bulletExplosion, null, this);
        this.physics.add.collider(playerBullets, this.turtles.getGroup(), this.bulletExplosion, null, this);
        // Stars & Objects
        this.physics.add.collider(this.stars.getGroup(), this.collisionLayer);
        this.playerCollisions[5] = this.physics.add.overlap(this.player, this.stars.getGroup(), this.moveStar, null, this);
        // Flowers & Objects
        this.physics.add.collider(this.flowers.getGroup(), this.collisionLayer);
        this.playerCollisions[6] = this.physics.add.overlap(this.player, this.flowers.getGroup(), this.fireFlowerHandler, null, this);
        // Coin Bricks Layer & Objects
        this.physics.add.collider(this.coinBricksLayer, this.mushrooms.getGroup());
        this.physics.add.collider(this.coinBricksLayer, this.koopas.getGroup());
        this.physics.add.collider(this.coinBricksLayer, this.stars.getGroup());
        this.physics.add.collider(this.coinBricksLayer, this.flowers.getGroup());
        this.playerCollisions[7] = this.physics.add.collider(this.player, this.coinBricksLayer, function () {
            if (this.player.body.blocked.up || this.player.body.touching.up)
                this.bumpSound.play();
        }, null, this);
        // Add Flag
        const flagPosition = this.map.findObject("Player", obj => obj.name === "Flag");
        this.flag = new Flag(this, flagPosition.x - 21, flagPosition.y + 10, "flag");
        var flagPole = this.physics.add.sprite(flagPosition.x, flagPosition.y + 152, null)
            .setSize(5, 326);
        flagPole.setImmovable(true)
            .setVisible(false);
        flagPole.body.allowGravity = false;
        this.playerCollisions[8] = this.physics.add.collider(this.player, flagPole, function () {
            this.gameLogic.levelEndingAnimations(8580, {
                points: this.gameLogic.points,
                size: this.player.marioSize,
                coins: this.gameLogic.coins,
                lives: this.player.getLives()
            });
        }, null, this);
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
    // Add Star
    moveStar(player, star) {
        const marioSize = player.marioSize;
        star.setVisible(true);
        if (this.coinBricksLayer.getTileAtWorldXY(star.x, star.y) != null) {
            this.collisionLayer.removeTileAtWorldXY(star.x, star.y);
            star.setSize(42, 36);
            star.setOffset(0, 0);
            star.body.y -= 36;
            star.setVelocityX(100);
            star.body.allowGravity = true;
            star.setBounce(1, 1);
            this.powerupSound.play();
        }
        else {
            if (player.marioSize == 'small') {
                player.marioSize = 'invincible-small';
            }
            else if (player.marioSize == 'big') {
                player.marioSize = 'invincible-big';
            }
            else if (player.marioSize == 'fire') {
                player.marioSize = 'invincible-fire';
            }
            star.destroy(true);
            this.time.delayedCall(14000, function getOldSize() {
                player.marioSize = marioSize;
            }, [], this);
            this.gameLogic.points += 1000;
            this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
            this.powerupSound.play();
        }
    }
    // Add Mushroom & Fire Flower 
    moveMushroom(player, mushroom) {
        const itemSound = this.itemSound;
        const lifeMushrooms = this.lifeMushrooms.getGroup();
        const mushrooms = this.mushrooms.getGroup();
        let collisionLayer = this.collisionLayer;
        if (this.coinBricksLayer.getTileAtWorldXY(mushroom.x, mushroom.y) != null) {
            this.collisionLayer.removeTileAtWorldXY(mushroom.x, mushroom.y);
            this.flowers.getGroup().children.iterate(function (child) {
                if (child.x + child.width / 2 > mushroom.x && child.x - child.width / 2 < mushroom.x && child.y + child.height / 2 > mushroom.y && child.y - child.height / 2 < mushroom.y) {
                    if (player.marioSize == 'small' || player.marioSize == 'invincible-small' || lifeMushrooms.contains(mushroom)) {
                        mushroom.setSize(42, 36);
                        mushroom.setOffset(0, 0);
                        mushroom.body.y -= 36;
                        mushroom.setVelocityX(90);
                        mushroom.body.allowGravity = true;
                        mushroom.setBounceX(1);
                        mushroom.setVisible(true);
                        itemSound.play();
                    }
                    else if ((player.marioSize == 'big' || player.marioSize == 'invincible-big' || player.marioSize == 'fire' || player.marioSize == 'invincible-fire') && mushrooms.contains(mushroom)) {
                        collisionLayer.removeTileAtWorldXY(child.x, child.y);
                        child.setVisible(true);
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
                    this.player.marioSize = 'big';
                }
                else {
                    this.player.marioSize = 'fire';
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
    fireFlowerHandler(player, flower) {
        flower.destroy(true);
        this.player.setMarioSize('fire');
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
    turtlesColliderHandler(player, turtle) {
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
                turtle.anims.play('TurtleShell1');
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
                if (turtle.anims.getCurrentKey() == "greenFlyingTurtle")
                    turtle.play("turtleWalking");
                else if (turtle.anims.getCurrentKey() == "redFlyingTurtle")
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
        console.log(animation);
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
    koopasColliderHandler(player, koopa) {
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
        else if (this.player.marioSize == 'invincible-small' || this.player.marioSize == 'invincible-big' || this.player.marioSize == 'invincible-fire') {
            koopa.destroy();
            this.gameLogic.points += 100;
            this.kickSound.play();
        }
        this.gameLogic.pointsText.setText('MARIO\n' + this.gameLogic.points);
    }
    brickCollision() {
        if (this.player.body.blocked.up || this.player.body.touching.up) {
            let collisionTile = null;
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
        this.checkGameStatus(this.gameLogic.gameStatus);
        this.koopas.update(this.player);
        this.turtles.update(this.player);
    }
    // Check Game Status
    checkGameStatus(gameStatus) {
        if (this.player.y > this.game.config.height) {
            this.gameLogic.playerKilled(this.player);
        }
        if (gameStatus == 'dead') {
            this.player.body.allowGravity = true;
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
