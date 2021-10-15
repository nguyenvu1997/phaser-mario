export class Stars {
    scene: Phaser.Scene;
    stars: Phaser.Physics.Arcade.Group;
    map: Phaser.Tilemaps.Tilemap;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.scene = scene
        this.map = map;
        this.stars = this.scene.physics.add.group({ allowGravity: false })

        const StarObjects = map.getObjectLayer('Stars')['objects'];
        StarObjects.forEach(obj => {
            const star = this.stars.create(obj.x + 21, obj.y - 38, 'starImg');
            star.setSize(25, 36);
            star.setOffset(8, 2);
        });
    }

    getGroup() {
        return this.stars
    }

}