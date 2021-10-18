export class InvisibleWalls {
    scene: Phaser.Scene;
    invisibleWalls: Phaser.Physics.Arcade.Group;
    map: Phaser.Tilemaps.Tilemap;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.scene = scene
        this.map = map;

        this.invisibleWalls = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false,
        });

        const InvisibleWallObjects = map.getObjectLayer("InvisibleWalls")['objects'];
        InvisibleWallObjects.forEach(obj => {
            const invisibleWall = this.invisibleWalls.create(obj.x + 10, obj.y + 50);
            invisibleWall.setSize(20, 200)
                .setVisible(false);
        })

    }

    getGroup() {
        return this.invisibleWalls
    }

}