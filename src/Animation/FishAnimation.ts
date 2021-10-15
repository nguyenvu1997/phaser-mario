export const loadFishAnimation = (scene: Phaser.Scene) => {
    // Green Fish
    scene.anims.create({
        key: 'greenFish',
        frames: [{
            key: 'enemies',
            frame: 'Fish1'
        },
        {
            key: 'enemies',
            frame: 'Fish2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Blue Fish
    scene.anims.create({
        key: 'blueFish',
        frames: [{
            key: 'enemies',
            frame: 'BlueFish1'
        },
        {
            key: 'enemies',
            frame: 'BlueFish2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Red Fish
    scene.anims.create({
        key: 'redFish',
        frames: [{
            key: 'enemies',
            frame: 'RedFish1'
        },
        {
            key: 'enemies',
            frame: 'RedFish2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Grey Fish
    scene.anims.create({
        key: 'greyFish',
        frames: [{
            key: 'enemies',
            frame: 'GreyFish1'
        },
        {
            key: 'enemies',
            frame: 'GreyFish2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Blue Piranha
    scene.anims.create({
        key: 'bluePiranha',
        frames: [{
            key: 'enemies',
            frame: 'BluePlant1'
        },
        {
            key: 'enemies',
            frame: 'BluePlant2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Green Piranha
    scene.anims.create({
        key: 'greenPiranha',
        frames: [{
            key: 'enemies',
            frame: 'Plant1'
        },
        {
            key: 'enemies',
            frame: 'Plant2'
        }],
        frameRate: 6,
        repeat: -1
    });

}