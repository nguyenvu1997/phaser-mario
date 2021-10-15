export const loadTurtleAnimation = (scene: Phaser.Scene) => {
    
    // Turtle Walking
    scene.anims.create({
        key: 'turtleWalking',
        frames: [{
            key: 'enemies',
            frame: 'Turtle1'
        },
        {
            key: 'enemies',
            frame: 'Turtle2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Blue Turtle Walking
    scene.anims.create({
        key: 'blueTurtleWalking',
        frames: [{
            key: 'enemies',
            frame: 'BlueTurtle1'
        },
        {
            key: 'enemies',
            frame: 'BlueTurtle2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Red Turtle Walking
    scene.anims.create({
        key: 'redTurtleWalking',
        frames: [{
            key: 'enemies',
            frame: 'RedTurtle1'
        },
        {
            key: 'enemies',
            frame: 'RedTurtle2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Red Flying Turtle
    scene.anims.create({
        key: 'redFlyingTurtle',
        frames: [{
            key: 'enemies',
            frame: 'FlyingRedTurtle1'
        },
        {
            key: 'enemies',
            frame: 'FlyingRedTurtle2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Green Flying Turtle
    scene.anims.create({
        key: 'greenFlyingTurtle',
        frames: [{
            key: 'enemies',
            frame: 'FlyingTurtle1'
        },
        {
            key: 'enemies',
            frame: 'FlyingTurtle2'
        }],
        frameRate: 6,
        repeat: -1
    });
}