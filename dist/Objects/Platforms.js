export class Platforms {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        this.platforms = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        const PlatformObjects = this.map.getObjectLayer('Platforms')['objects'];
        PlatformObjects.forEach(obj => {
            const platform = this.platforms.create(obj.x + 60, obj.y - 8, 'platformImg');
            platform.setSize(126, 18);
            platform.setOffset(0, 0);
            platform.setBounce(1);
        });
        let platformsArray = [];
        platformsArray = this.platforms.getChildren();
        for (let i = 0; i < this.platforms.countActive(true); i++) {
            if (i == 0 || i == 1) {
                platformsArray[i].state = 4;
                platformsArray[i].body.velocity.y = 70;
            }
            else if (i == 2 || i == 3) {
                platformsArray[i].state = 5;
                platformsArray[i].body.velocity.y = -70;
            }
        }
    }
    getGroup() {
        return this.platforms;
    }
}
