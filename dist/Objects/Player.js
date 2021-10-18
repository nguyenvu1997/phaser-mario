import { Bullets } from "./Bullets.js";
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setVelocity(0);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.speed = 10;
        this.jumpSound = this.scene.sound.add('JUMP', { volume: 0.5 });
        this.fireballSound = this.scene.sound.add('FIREBALL', { volume: 0.5 });
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.bullets = new Bullets(this.scene);
        this.bulletsGroup = this.bullets.getGroup();
        this.isPlayerDead = false;
    }
    getActiveInvincible() {
        return this.activeInvincible;
    }
    setActiveInvincible(isActive) {
        this.activeInvincible = isActive;
    }
    getLives() {
        return this.lives;
    }
    setLives(lives) {
        this.lives = lives;
    }
    addLives(lives) {
        this.lives += lives;
    }
    getIsPlayerDead() {
        return this.isPlayerDead;
    }
    setMarioSize(size) {
        this.marioSize = size;
    }
    getPlayerBullets() {
        return this.bulletsGroup;
    }
    update() {
        this.handleInput();
        if (this.y >= 544) {
            this.isPlayerDead = true;
            this.setVelocityX(0);
        }
        // Handle Bullets
        if (this.bulletsGroup != null) {
            this.bulletsGroup.children.iterate(function (child) {
                if (child.body.onFloor()) {
                    child.setVelocityY(-300);
                }
            });
        }
    }
    setPlayerView() {
        if (this.marioSize == 'small') {
            this.setTexture("mario", "SmallMario_front_view");
        }
        else {
            if (this.marioSize == 'big') {
                this.setTexture("mario", "BigMario_front_view");
            }
            else if (this.marioSize == 'fire') {
                this.setTexture("mario", "BigFireMario_front_view");
            }
        }
    }
    chooseAnimation(action) {
        if (action == "walk") {
            if (this.marioSize == 'small')
                this.play("smallMarioWalk", true);
            else if (this.marioSize == 'big')
                this.play("bigMarioWalk", true);
            else if (this.marioSize == 'fire')
                this.play("bigFireMarioWalk", true);
            else if (this.marioSize == 'invincible-small')
                this.play("smallMarioWalkInvincible1", true);
            else if (this.marioSize == 'invincible-big')
                this.play("bigMarioWalkInvincible1", true);
            else if (this.marioSize == 'invincible-fire')
                this.play("bigFireMarioWalkInvincible1", true);
        }
        else if (action == "jump") {
            if (this.marioSize == 'small')
                this.play("smallMarioJumping", true);
            else if (this.marioSize == 'big')
                this.play("bigMarioJumping", true);
            else if (this.marioSize == 'fire')
                this.play("bigFireMarioJumping", true);
            else if (this.marioSize == 'invincible-small')
                this.play("smallMarioJumpingInvincible1", true);
            else if (this.marioSize == 'invincible-big')
                this.play("bigMarioJumpingInvincible1", true);
            else if (this.marioSize == 'invincible-fire')
                this.play("bigFireMarioJumpingInvincible1", true);
        }
        else if (action == "frontView") {
            if (this.marioSize == 'small')
                this.play("smallMarioFrontView", true);
            else if (this.marioSize == 'big')
                this.play("bigMarioFrontView", true);
            else if (this.marioSize == 'fire')
                this.play("bigFireMarioFrontView", true);
            else if (this.marioSize == 'invincible-small')
                this.play("smallMarioFrontViewInvincible1", true);
            else if (this.marioSize == 'invincible-big')
                this.play("bigMarioFrontViewInvincible1", true);
            else if (this.marioSize == 'invincible-fire')
                this.play("bigFireMarioFrontViewInvincible1", true);
        }
        else if (action == "climb") {
            if (this.marioSize == 'small')
                this.play("smallMarioClimbing", true);
            else if (this.marioSize == 'big')
                this.play("bigMarioClimbing", true);
            else if (this.marioSize == 'fire')
                this.play("bigFireMarioClimbing", true);
            else if (this.marioSize == 'invincible-small')
                this.play("smallMarioClimbingInvincible1", true);
            else if (this.marioSize == 'invincible-big')
                this.play("bigMarioClimbingInvincible1", true);
            else if (this.marioSize == 'invincible-fire')
                this.play("bigFireClimbingInvincible1", true);
        }
        else if (action == "sitDown") {
            if (this.marioSize == 'big')
                this.play("bigMarioSittingDown", true);
            else if (this.marioSize == 'fire')
                this.play("bigFireMarioSittingDown", true);
            else if (this.marioSize == 'invincible-big')
                this.play("bigMarioSittingDownInvincible1", true);
            else if (this.marioSize == 'invincible-fire')
                this.play("bigFireSittingDownInvincible1", true);
        }
        if (action == "swim") {
            if (this.marioSize == 'small')
                this.play("smallMarioSwimming", true);
            else if (this.marioSize == 'big')
                this.play("bigMarioSwimming", true);
            else if (this.marioSize == 'fire')
                this.play("fireMarioSwimming", true);
            else if (this.marioSize == 'invincible-small')
                this.play("smallMarioWalkInvincible1", true);
            else if (this.marioSize == 'invincible-big')
                this.play("bigMarioWalkInvincible1", true);
            else if (this.marioSize == 'invincible-fire')
                this.play("bigFireMarioWalkInvincible1", true);
        }
    }
    handleInput() {
        const camera = this.scene.cameras.main;
        // Moving
        if (this.scene.input.keyboard.enabled == true) {
            if (this.cursors.left.isDown) {
                this.setVelocityX(-300);
                this.setFlipX(true);
                this.chooseAnimation("walk");
                if (this.marioSize == 'small' || this.marioSize == 'invincible-small') {
                    this.setSize(20, 30);
                    this.setOffset(6, 0);
                }
                else {
                    this.setSize(20, 64)
                        .setOffset(6, -1);
                }
            }
            else if (this.cursors.right.isDown) {
                this.setVelocityX(300);
                this.resetFlip();
                this.chooseAnimation("walk");
                if (this.marioSize == 'small' || this.marioSize == 'invincible-small') {
                    this.setSize(20, 30);
                    this.setOffset(6, 0);
                }
                else {
                    this.setSize(20, 64)
                        .setOffset(6, -1);
                }
            }
            else if (this.cursors.down.isDown) {
                this.chooseAnimation("sitDown");
                if (this.marioSize == 'small' || this.marioSize == 'invincible-small') {
                    this.setSize(20, 30);
                    this.setOffset(6, 0);
                }
                else {
                    this.setSize(0, 44)
                        .setOffset(3, -1);
                }
            }
            else {
                this.setVelocityX(0);
                this.chooseAnimation("frontView");
                if (this.marioSize == 'small' || this.marioSize == 'invincible-small') {
                    this.setSize(20, 30);
                    this.setOffset(6, 0);
                }
                else {
                    this.setSize(20, 64)
                        .setOffset(6, -1);
                }
            }
            if (this.cursors.up.isDown) {
                if (this.body.onFloor()) {
                    this.setVelocityY(-500);
                    this.jumpSound.play();
                }
                else {
                    this.chooseAnimation("jump");
                }
            }
        }
        else {
            this.cursors.up.isDown = false;
            this.cursors.left.isDown = false;
            this.cursors.right.isDown = false;
        }
        // Fire
        if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
            if (this.bulletsGroup.getTotalFree() > 0 && (this.marioSize == 'fire' || this.marioSize == 'invincible-fire')) {
                var bullet = this.bulletsGroup.create(this.x, this.y, 'bulletAtlas', 'Bullet1');
                if (this.flipX == false)
                    bullet.setVelocityX(500);
                else
                    bullet.setVelocityX(-500);
                bullet.setSize(10, 10);
                bullet.play('bulletAnimation', true);
                this.fireballSound.play();
            }
        }
    }
}
