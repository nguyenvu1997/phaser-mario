import { Player } from "../Objects/Player.js";

export class GameLogic {
    scene: Phaser.Scene;
    levelTime: number;

    pointsText: Phaser.GameObjects.Text;
    coinsNumber: Phaser.GameObjects.Text;
    timeText: Phaser.GameObjects.Text;
    livesText: Phaser.GameObjects.Text;

    gameState: string;

    points: number;
    coins: number;
    lives: number;

    dieSound: Phaser.Sound.BaseSound;
    gameoverSound: Phaser.Sound.BaseSound;
    themeSound: Phaser.Sound.BaseSound;

    gameStatus: string;

    setInitGame(point: number, coin: number) {
        this.points = point;
        this.coins = coin;
    }

    getGameState() {
        return this.gameState;
    }

    setGameState(gameState: string) {
        this.gameState = gameState
    }

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.levelTime = 500;
        this.dieSound = this.scene.sound.add('DIE', { volume: 0.5 });
        this.gameoverSound = this.scene.sound.add('GAMEOVER', { volume: 0.5 });
        this.themeSound = this.scene.sound.add('LEVEL1THEMESONG', { loop: true, volume: 0.5 });
    }

    addText(currentLevel: string, levelTime: number, lives: number) {
        this.pointsText = this.scene.add.text(30, 10, 'MARIO\n' + this.points, { font: '30px Russo One', color: '#FFFFFF' }).setScrollFactor(0);
        let coinSymbolImg1 = this.scene.add.image(190, 52, 'coinSymbol1').setScrollFactor(0);
        this.coinsNumber = this.scene.add.text(212, 33, "x  " + this.coins, { font: '30px Russo One', color: '#FFFFFF' }).setScrollFactor(0);
        let levelText = this.scene.add.text(320, 10, "WORLD\n    " + currentLevel, { font: '30px Russo One', color: '#FFFFFF' }).setScrollFactor(0);
        this.timeText = this.scene.add.text(470, 10, "TIME\n " + levelTime, { font: '30px Russo One', color: '#FFFFFF' }).setScrollFactor(0);
        this.livesText = this.scene.add.text(570, 10, "LIVE\n " + lives, { font: '30px Russo One', color: '#FFFFFF' }).setScrollFactor(0);

        this.scene.time.addEvent({
            delay: 500, callback: function levelTimeCountDown() {
                if (this.getGameState() != 'end') {
                    levelTime--;
                } else {
                    this.points += levelTime * 50;
                    this.pointsText.setText('MARIO\n' + this.points);
                    levelTime = 0;
                }
                this.timeText.setText("TIME\n " + levelTime);
            }, callbackScope: this, loop: true
        });
    }

    playerKilled(player: Player) {
        this.scene['live']--;
        console.log(player.lives)
        this.scene.input.keyboard.enabled = false;
        (player.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        player.setVelocityX(0);

        if (player.getLives() > 1) {
            this.gameStatus = 'dead';
            this.dieSound.play();
        }
        else {
            this.gameStatus = 'gameover';
            this.gameoverSound.play();
        }

        player.play("smallMarioGameOver");
        this.scene.tweens.add({
            targets: player,
            y: player.y - 100,
            duration: 1000,
            ease: 'Sine.easeInOut',
        });

        player.setVelocityY(0);
        (player.body as Phaser.Physics.Arcade.Body).allowGravity = true;
        this.themeSound.stop();

        this.scene.time.delayedCall(2000, function () {
            this.restartTheScene(player);
        }, [], this);
    }

    restartTheScene(player: Player) {
        this.scene['themeSound'].stop();
        this.scene.scene.restart();
        this.scene.input.keyboard.enabled = true;
        (player.body as Phaser.Physics.Arcade.Body).allowGravity = true;
        player.marioSize = 'small';
    }

    goToNextScene(currentScene: Phaser.Scene, data?: {}) {
        if (currentScene == this.scene.scene.get("world11")) {
            this.scene.scene.stop("world11");
            this.scene['themeSound'].stop();
            this.scene.scene.start("world12", data);
        }
        else if (currentScene == this.scene.scene.get("world12")) {
            this.scene.scene.stop("world12");
            this.scene['themeSound'].stop();
            this.scene.scene.start("world13", data);
        }
        else if (currentScene == this.scene.scene.get("world13")) {
            this.scene.scene.stop("world13");
            this.scene.scene.start("world14");
        }
        else if (currentScene == this.scene.scene.get("world14")) {
            this.scene.scene.stop("world14");
            this.scene.scene.start("world21");
        }
        else if (currentScene == this.scene.scene.get("world21")) {
            this.scene.scene.stop("world21");
            this.scene.scene.start("world22");
        }

    }

    levelEndingAnimations(doorX, data?: {}) {
        this.scene.input.keyboard.enabled = false;
        this.scene['player'].chooseAnimation("climb");

        this.scene.tweens.add({
            targets: this.scene['flag'],
            y: 400,
            duration: 1000,
        });

        this.scene['flagpoleSound'].play();

        this.scene.time.delayedCall(500, function () {
            this.scene['player'].x += 7;
            this.scene['player'].setFlipX(true);
            this.scene['player'].chooseAnimation("walk");
            this.scene['player'].resetFlip();

            this.scene.tweens.add({
                targets: this.scene['player'],
                ease: 'Linear',
                x: doorX,
                duration: 3600,
                offsetX: 50,
            });
        }, [], this);

        this.scene.time.delayedCall(4500, function () {
            this.scene['player'].setVisible(false);
            this.goToNextScene(this.scene, data);
        }, null, this);
    }

}