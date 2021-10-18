export class Coins {
    constructor(scene, map) {
        this.scene = scene;
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
        return this.coins;
    }
}
