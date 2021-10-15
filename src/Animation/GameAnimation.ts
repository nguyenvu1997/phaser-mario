export const loadGameAnimation = (scene: Phaser.Scene) => {
    // GameOver
    scene.anims.create({
        key: 'smallMarioGameOver',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_gameOver'
        }]
    });
}