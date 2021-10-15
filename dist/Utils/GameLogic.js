export class GameLogic {
    constructor(scene) {
        this.scene = scene;
        this.levelTime = 500;
    }
    setInitGame(point, coin) {
        this.points = point;
        this.coins = coin;
    }
    getGameState() {
        return this.gameState;
    }
    setGameState(gameState) {
        this.gameState = gameState;
    }
    addText(currentLevel, levelTime) {
        this.pointsText = this.scene.add.text(40, 10, 'MARIO\n' + this.points, { font: '30px Russo One', color: '#FFFFFF' }).setScrollFactor(0);
        let coinSymbolImg1 = this.scene.add.image(200, 52, 'coinSymbol1').setScrollFactor(0);
        this.coinsNumber = this.scene.add.text(222, 33, "x  " + this.coins, { font: '30px Russo One', color: '#FFFFFF' }).setScrollFactor(0);
        let levelText = this.scene.add.text(330, 10, "WORLD\n    " + currentLevel, { font: '30px Russo One', color: '#FFFFFF' }).setScrollFactor(0);
        this.timeText = this.scene.add.text(490, 10, "TIME\n " + levelTime, { font: '30px Russo One', color: '#FFFFFF' }).setScrollFactor(0);
        this.scene.time.addEvent({
            delay: 500, callback: function levelTimeCountDown() {
                if (this.getGameState() != 'end') {
                    levelTime--;
                }
                else {
                    this.points += levelTime * 50;
                    this.pointsText.setText('MARIO\n' + this.points);
                    levelTime = 0;
                }
                this.timeText.setText("TIME\n " + levelTime);
            }, callbackScope: this, loop: true
        });
    }
}
