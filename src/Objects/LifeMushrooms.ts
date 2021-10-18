export class LifeMushrooms {
    scene: Phaser.Scene;
    lifeMushrooms: Phaser.Physics.Arcade.Group;
    map: Phaser.Tilemaps.Tilemap;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.scene = scene
        this.map = map;
        this.lifeMushrooms = this.scene.physics.add.group({ allowGravity: false })

        const LifeMushroomObjects = map.getObjectLayer('LifeMushrooms')['objects'];
        LifeMushroomObjects.forEach(obj => {
            const lifeMushroom = this.lifeMushrooms.create(obj.x + 21, obj.y - 38, 'lifeMushroomImg');
            lifeMushroom.setSize(22, 36);
            lifeMushroom.setOffset(10, 2);
            lifeMushroom.setVisible(false);
        });
    }

    getGroup() {
        return this.lifeMushrooms
    }

}