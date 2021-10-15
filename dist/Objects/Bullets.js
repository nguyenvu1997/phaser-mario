export class Bullets {
    constructor(scene) {
        this.scene = scene;
        this.bullets = this.scene.physics.add.group({
            maxSize: 1000,
        });
    }
    getGroup() {
        return this.bullets;
    }
}
