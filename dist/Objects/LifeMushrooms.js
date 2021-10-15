export class LifeMushrooms {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        this.lifeMushrooms = this.scene.physics.add.group({ allowGravity: false });
        const LifeMushroomObjects = map.getObjectLayer('LifeMushrooms')['objects'];
        LifeMushroomObjects.forEach(obj => {
            const lifeMushroom = this.lifeMushrooms.create(obj.x + 21, obj.y - 38, 'lifeMushroomImg');
            lifeMushroom.setSize(22, 36);
            lifeMushroom.setOffset(10, 2);
        });
    }
    getGroup() {
        return this.lifeMushrooms;
    }
}
