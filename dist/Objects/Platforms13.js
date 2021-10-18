export class Platforms13 {
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
        // State: 0 - Unmovable
        // State: 1 - Falls on touch
        // State: 2 - Moving left -> right
        // State: 3 - Moving right -> left
        // State: 4 - Moving up -> down
        // State: 5 - Moving down -> up
        // State: 6 - Falls if player on it
        let platformsArray = [];
        platformsArray = this.platforms.getChildren();
        for (let i = 0; i < this.platforms.countActive(true); i++) {
            if (i == 0) {
                platformsArray[i].state = 5;
                platformsArray[i].body.velocity.y = -70;
            }
            else if (i == 1 || i == 3) {
                platformsArray[i].state = 3;
                platformsArray[i].body.velocity.x = -70;
            }
            else if (i == 2) {
                platformsArray[i].state = 2;
                platformsArray[i].body.velocity.x = 70;
            }
        }
    }
    getGroup() {
        return this.platforms;
    }
}
