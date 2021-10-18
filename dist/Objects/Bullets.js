export class Bullets {
    constructor(scene) {
        this.scene = scene;
        this.bullets = this.scene.physics.add.group({
            maxSize: 3,
        });
    }
    getGroup() {
        return this.bullets;
    }
}
