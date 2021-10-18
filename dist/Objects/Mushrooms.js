export class Mushrooms {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        this.mushrooms = this.scene.physics.add.group({ allowGravity: false });
        const MushroomObjects = this.map.getObjectLayer('Mushrooms')['objects'];
        MushroomObjects.forEach(obj => {
            const mushroom = this.mushrooms.create(obj.x + 21, obj.y - 38, 'mushroomImg');
            mushroom.setSize(25, 34);
            mushroom.setOffset(8, 2);
            mushroom.setVisible(false);
        });
    }
    getGroup() {
        return this.mushrooms;
    }
}
