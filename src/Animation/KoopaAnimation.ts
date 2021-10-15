export const loadKoopaAnimation = (scene: Phaser.Scene) => {
    // Koopa Walking
    scene.anims.create({
        key: 'koopaWalking',
        frames: [{
            key: 'enemies',
            frame: 'Koopa1'
        }, {
            key: 'enemies',
            frame: 'Koopa2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Blue Koopa Walking
    scene.anims.create({
        key: 'blueKoopaWalking',
        frames: [{
            key: 'enemies',
            frame: 'KoopaBlue1'
        }, {
            key: 'enemies',
            frame: 'KoopaBlue2'
        }],
        frameRate: 6,
        repeat: -1
    });
}