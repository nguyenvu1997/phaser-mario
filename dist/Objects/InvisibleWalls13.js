export class InvisibleWalls13 {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        this.invisibleWalls = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false,
        });
        const InvisibleWallObjects = map.getObjectLayer("InvisibleWalls")['objects'];
        InvisibleWallObjects.forEach(obj => {
            const invisibleWall = this.invisibleWalls.create(obj.x + 10, obj.y + 50);
        });
    }
    getGroup() {
        return this.invisibleWalls;
    }
}
