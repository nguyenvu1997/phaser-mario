export class Bullets {
    scene: Phaser.Scene;
    bullets: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.bullets = this.scene.physics.add.group({
			maxSize: 1000,
		});
    }

    getGroup() {
        return this.bullets
    }

}