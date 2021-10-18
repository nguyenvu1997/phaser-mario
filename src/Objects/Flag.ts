export class Flag extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
    }
}