export const loadBowserAnimation = (scene) => {
    // Bowser Walking
    scene.anims.create({
        key: 'bowserWalking',
        frames: [{
                key: 'enemies',
                frame: 'Bowser1'
            },
            {
                key: 'enemies',
                frame: 'Bowser2'
            }],
        frameRate: 3,
        repeat: -1
    });
    // Bowser Firing
    scene.anims.create({
        key: 'bowserFiring',
        frames: [{
                key: 'enemies',
                frame: 'Bowser3'
            },
            {
                key: 'enemies',
                frame: 'Bowser4'
            }],
        frameRate: 3,
        repeat: -1
    });
};
