export class Flowers {
    scene: Phaser.Scene;
    flowers: Phaser.Physics.Arcade.Group;
    map: Phaser.Tilemaps.Tilemap;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.scene = scene
        this.map = map;
        this.flowers = this.scene.physics.add.group({
            allowGravity: false,
            visible: false,
        })

        const FlowerObjects = map.getObjectLayer('Flowers')['objects'];
        FlowerObjects.forEach(obj => {
            const flower = this.flowers.create(obj.x + 21, obj.y - 38, 'flowerImg');
            flower.setSize(20, 20);
            flower.setOffset(11, 8);
            flower.setVisible(false);
        });
    }

    getGroup() {
        return this.flowers
    }

}