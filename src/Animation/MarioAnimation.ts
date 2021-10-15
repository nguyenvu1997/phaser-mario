export const loadMarioAnimation = (scene: Phaser.Scene) => {
    // Fire
    scene.anims.create({
        key: 'fireBreathAnimation',
        frames: [{
            key: 'fireBreathAtlas',
            frame: 'Fire1'
        }, {
            key: 'fireBreathAtlas',
            frame: 'Fire2'
        }],
        frameRate: 10,
        repeat: -1
    });

    // Bullets Animation
    scene.anims.create({
        key: 'bulletAnimation',
        frames: [{
            key: 'bulletAtlas',
            frame: 'Bullet1'
        }, {
            key: 'bulletAtlas',
            frame: 'Bullet2'
        }, {
            key: 'bulletAtlas',
            frame: 'Bullet3'
        }, {
            key: 'bulletAtlas',
            frame: 'Bullet4'
        }],
        frameRate: 8,
        repeat: -1
    });

    // Bullet Explosion
    scene.anims.create({
        key: 'bulletExplosion',
        frames: [{
            key: 'bulletAtlas',
            frame: 'BulletExplosion1'
        }, {
            key: 'bulletAtlas',
            frame: 'BulletExplosion2'
        }, {
            key: 'bulletAtlas',
            frame: 'BulletExplosion3'
        }],
        frameRate: 19,
        repeat: -1
    });

    //
    // Small Mario
    //
    // Small Mario Walking
    scene.anims.create({
        key: 'smallMarioWalk',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_walking_1'
        }, {
            key: 'mario',
            frame: 'SmallMario_walking_2'
        }, {
            key: 'mario',
            frame: 'SmallMario_walking_3'
        }],
        frameRate: 9,
        repeat: -1
    });

    // Invincible Small Mario Walking
    scene.anims.create({
        key: 'smallMarioWalkInvincible1',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_walking_1'
        }, {
            key: 'mario',
            frame: 'SmallInvincible3Mario_walking_1'
        }, {
            key: 'mario',
            frame: 'SmallInvincible1Mario_walking_1'
        }, {
            key: 'mario',
            frame: 'SmallInvincible2Mario_walking_1'
        }, {
            key: 'mario',
            frame: 'SmallMario_walking_2'
        }, {
            key: 'mario',
            frame: 'SmallInvincible3Mario_walking_2'
        }, {
            key: 'mario',
            frame: 'SmallInvincible1Mario_walking_2'
        }, {
            key: 'mario',
            frame: 'SmallInvincible2Mario_walking_2'
        }, {
            key: 'mario',
            frame: 'SmallMario_walking_3'
        }, {
            key: 'mario',
            frame: 'SmallInvincible3Mario_walking_3'
        }, {
            key: 'mario',
            frame: 'SmallInvincible1Mario_walking_3'
        }, {
            key: 'mario',
            frame: 'SmallInvincible2Mario_walking_3'
        }],
        frameRate: 20,
        repeat: -1
    });

    // Small Mario Front View
    scene.anims.create({
        key: 'smallMarioFrontView',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_front_view'
        }]
    });

    // Invincible Small Mario Front View
    scene.anims.create({
        key: 'smallMarioFrontViewInvincible1',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_front_view'
        }, {
            key: 'mario',
            frame: 'SmallInvincible3Mario_front_view'
        }, {
            key: 'mario',
            frame: 'SmallInvincible1Mario_front_view'
        }, {
            key: 'mario',
            frame: 'SmallInvincible2Mario_front_view'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Small Mario Sprinting
    scene.anims.create({
        key: 'smallMarioSprint',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_sprint'
        }]
    });

    // Invincible Small Mario Sprinting
    scene.anims.create({
        key: 'smallMarioSprintInvincible1',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_sprint'
        }, {
            key: 'mario',
            frame: 'SmallInvincible3Mario_sprint'
        }, {
            key: 'mario',
            frame: 'SmallInvincible1Mario_sprint'
        }, {
            key: 'mario',
            frame: 'SmallInvincible2Mario_sprint'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Small Mario Jumping
    scene.anims.create({
        key: 'smallMarioJumping',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_jump'
        }],
    });

    // Invincible Small Mario Jumping
    scene.anims.create({
        key: 'smallMarioJumpingInvincible1',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_jump'
        }, {
            key: 'mario',
            frame: 'SmallInvincible3Mario_jump'
        }, {
            key: 'mario',
            frame: 'SmallInvincible1Mario_jump'
        }, {
            key: 'mario',
            frame: 'SmallInvincible2Mario_jump'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Small Mario Climbing
    scene.anims.create({
        key: 'smallMarioClimbing',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_climb_1'
        },
        {
            key: 'mario',
            frame: 'SmallMario_climb_2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Invincible Small Mario Climbing
    scene.anims.create({
        key: 'smallMarioClimbingInvincible1',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_climb_1'
        }, {
            key: 'mario',
            frame: 'SmallMario_climb_2'
        }, {
            key: 'mario',
            frame: 'SmallInvincible3Mario_climb_1'
        }, {
            key: 'mario',
            frame: 'SmallInvincible3Mario_climb_2'
        }, {
            key: 'mario',
            frame: 'SmallInvincible1Mario_climb_1'
        }, {
            key: 'mario',
            frame: 'SmallInvincible1Mario_climb_2'
        }, {
            key: 'mario',
            frame: 'SmallInvincible2Mario_climb_1'
        }, {
            key: 'mario',
            frame: 'SmallInvincible2Mario_climb_2'
        }],
        frameRate: 20,
        repeat: -1
    });

    // Small Mario Swimming
    scene.anims.create({
        key: 'smallMarioSwimming',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_swimming_1'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_2'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_3'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_4'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_5'
        }],
        frameRate: 15,
        repeat: -1
    });

    // Invincible Small Mario Swimming
    scene.anims.create({
        key: 'smallMarioSwimmingInvincible1',
        frames: [{
            key: 'mario',
            frame: 'SmallMario_swimming_1'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_2'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_3'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_4'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_5'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_2'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_3'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_4'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_5'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_2'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_3'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_4'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_5'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_2'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_3'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_4'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_5'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_2'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_3'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_4'
        }, {
            key: 'mario',
            frame: 'SmallMario_swimming_5'
        }],
        frameRate: 20,
        repeat: -1
    });

    //
    // Big Mario
    //
    // Big Mario Walking
    scene.anims.create({
        key: 'bigMarioWalk',
        frames: [{
            key: 'mario',
            frame: 'BigMario_walking_1'
        }, {
            key: 'mario',
            frame: 'BigMario_walking_2'
        }, {
            key: 'mario',
            frame: 'BigMario_walking_3'
        }],
        frameRate: 10,
        repeat: -1
    });

    // Invincible Big Mario Walking
    scene.anims.create({
        key: 'bigMarioWalkInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigMario_walking_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_walking_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_walking_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_walking_1'
        }, {
            key: 'mario',
            frame: 'BigMario_walking_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_walking_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_walking_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_walking_2'
        }, {
            key: 'mario',
            frame: 'BigMario_walking_3'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_walking_3'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_walking_3'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_walking_3'
        }],
        frameRate: 20,
        repeat: -1
    });

    // Big Mario Front View
    scene.anims.create({
        key: 'bigMarioFrontView',
        frames: [{
            key: 'mario',
            frame: 'BigMario_front_view'
        }]
    });

    // Invincible Big Mario Front View
    scene.anims.create({
        key: 'bigMarioFrontViewInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigMario_front_view'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_front_view'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_front_view'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_front_view'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Big Mario Sprinting 
    scene.anims.create({
        key: 'bigMarioSprint',
        frames: [{
            key: 'mario',
            frame: 'BigMario_sprint'
        }]
    });

    // Invincible Big Mario Sprinting
    scene.anims.create({
        key: 'bigMarioSprintInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigMario_sprint'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_sprint'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_sprint'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_sprint'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Big Mario Jumping
    scene.anims.create({
        key: 'bigMarioJumping',
        frames: [{
            key: 'mario',
            frame: 'BigMario_jump'
        }],
    });

    // Invincible Big Mario Jumping
    scene.anims.create({
        key: 'bigMarioJumpingInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigMario_jump'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_jump'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_jump'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_jump'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Big Mario Sitting Down
    scene.anims.create({
        key: 'bigMarioSittingDown',
        frames: [{
            key: 'mario',
            frame: 'BigMario_sitdown'
        }]
    });

    // Invincible Big Mario Sitting Down
    scene.anims.create({
        key: 'bigMarioSittingDownInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigMario_sitdown'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_sitdown'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_sitdown'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_sitdown'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Big Mario Climbing
    scene.anims.create({
        key: 'bigMarioClimbing',
        frames: [{
            key: 'mario',
            frame: 'BigMario_climb_1'
        },
        {
            key: 'mario',
            frame: 'BigMario_climb_2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Invincible Big Mario Climbing
    scene.anims.create({
        key: 'bigMarioClimbingInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigMario_climb_1'
        }, {
            key: 'mario',
            frame: 'BigMario_climb_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_climb_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_climb_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_climb_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_climb_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_climb_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_climb_2'
        }],
        frameRate: 20,
        repeat: -1
    });

    // Big Mario Swimming
    scene.anims.create({
        key: 'bigMarioSwimming',
        frames: [{
            key: 'mario',
            frame: 'BigMario_swimming_1'
        }, {
            key: 'mario',
            frame: 'BigMario_swimming_2'
        }, {
            key: 'mario',
            frame: 'BigMario_swimming_3'
        }, {
            key: 'mario',
            frame: 'BigMario_swimming_4'
        }, {
            key: 'mario',
            frame: 'BigMario_swimming_5'
        }, {
            key: 'mario',
            frame: 'BigMario_swimming_6'
        }],
        frameRate: 6,
        repeat: -1
    });

    //
    // Fire Mario
    //
    // Fire Mario Walking
    scene.anims.create({
        key: 'bigFireMarioWalk',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_walking_1'
        }, {
            key: 'mario',
            frame: 'BigFireMario_walking_2'
        }, {
            key: 'mario',
            frame: 'BigFireMario_walking_3'
        }],
        frameRate: 10,
        repeat: -1
    });

    // Invincible Fire Mario Walking
    scene.anims.create({
        key: 'bigFireMarioWalkInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_walking_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_walking_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_walking_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_walking_1'
        }, {
            key: 'mario',
            frame: 'BigFireMario_walking_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_walking_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_walking_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_walking_2'
        }, {
            key: 'mario',
            frame: 'BigFireMario_walking_3'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_walking_3'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_walking_3'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_walking_3'
        }],
        frameRate: 20,
        repeat: -1
    });

    // Invincible Fire Mario
    scene.anims.create({
        key: 'bigFireMarioClimbingInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_climb_1'
        }, {
            key: 'mario',
            frame: 'BigFireMario_climb_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_climb_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_climb_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_climb_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_climb_2'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_climb_1'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_climb_2'
        }],
        frameRate: 20,
        repeat: -1
    });

    // Fire Mario Front View
    scene.anims.create({
        key: 'bigFireMarioFrontView',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_front_view'
        }]
    });

    // Invincible Fire Mario Front View
    scene.anims.create({
        key: 'bigFireMarioFrontViewInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_front_view'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_front_view'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_front_view'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_front_view'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Fire Mario Sprinting
    scene.anims.create({
        key: 'bigFireMarioSprint',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_sprint'
        }]
    });

    // Invincible Fire Mario Sprinting
    scene.anims.create({
        key: 'bigFireMarioSprintInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_sprint'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_sprint'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_sprint'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_sprint'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Fire Mario Jumping
    scene.anims.create({
        key: 'bigFireMarioJumping',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_jump'
        }],
    });

    // Invincible Fire Mario Jumping
    scene.anims.create({
        key: 'bigFireMarioJumpingInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_jump'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_jump'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_jump'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_jump'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Fire Mario Sitting Down	    
    scene.anims.create({
        key: 'bigFireMarioSittingDown',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_sitdown'
        }]
    });

    // Invincible Fire Mario Sitting Down
    scene.anims.create({
        key: 'bigFireMarioSittingDownInvincible1',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_sitdown'
        }, {
            key: 'mario',
            frame: 'BigInvincible3Mario_sitdown'
        }, {
            key: 'mario',
            frame: 'BigInvincible1Mario_sitdown'
        }, {
            key: 'mario',
            frame: 'BigInvincible2Mario_sitdown'
        }],
        frameRate: 12,
        repeat: -1
    });

    // Fire Mario Climbing
    scene.anims.create({
        key: 'bigFireMarioClimbing',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_climb_1'
        },
        {
            key: 'mario',
            frame: 'BigFireMario_climb_2'
        }],
        frameRate: 6,
        repeat: -1
    });

    // Fire Mario Swimming
    scene.anims.create({
        key: 'fireMarioSwimming',
        frames: [{
            key: 'mario',
            frame: 'BigFireMario_swimming_2'
        }, {
            key: 'mario',
            frame: 'BigFireMario_swimming_4'
        }, {
            key: 'mario',
            frame: 'BigFireMario_swimming_5'
        }, {
            key: 'mario',
            frame: 'BigFireMario_swimming_6'
        }, {
            key: 'mario',
            frame: 'BigFireMario_swimming_3'
        }, {
            key: 'mario',
            frame: 'BigFireMario_swimming_1'
        }],
        frameRate: 6,
        repeat: -1
    });
}