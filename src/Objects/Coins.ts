export class Coins {
    scene: Phaser.Scene;
    coins: Phaser.Physics.Arcade.Group;
    map: Phaser.Tilemaps.Tilemap;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.scene = scene
        this.map = map;
        this.coins = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true,
        });

        const CoinObjects = map.getObjectLayer('Coins')['objects'];
        CoinObjects.forEach(obj => {
            const coin = this.coins.create(obj.x + 21, obj.y - 36, 'coinImg1');
            coin.setSize(26, 32);
        });
    }

    getGroup() {
        return this.coins
    }

}