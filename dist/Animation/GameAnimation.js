export const loadGameAnimation = (scene) => {
    // GameOver
    scene.anims.create({
        key: 'smallMarioGameOver',
        frames: [{
                key: 'mario',
                frame: 'SmallMario_gameOver'
            }]
    });
};
