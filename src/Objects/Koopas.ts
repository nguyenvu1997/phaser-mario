import { Player } from "./Player.js";

export class Koopas {
    scene: Phaser.Scene;
    koopas: Phaser.Physics.Arcade.Group;
    map: Phaser.Tilemaps.Tilemap;
    player: Player;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.scene = scene
        this.map = map;
        this.koopas = this.scene.physics.add.group()

        const KoopaObjects = map.getObjectLayer('Koopas')['objects'];
        KoopaObjects.forEach(obj => {
            const koopa = this.koopas.create(obj.x + 21, obj.y - 36, 'enemies', "Koopa1");
        });
        this.koopas.children.iterate(function (child) {
            (child as Phaser.Physics.Arcade.Sprite).setBounceX(1)
                .setSize(36, 36)
                .setOffset(3, 0)
                .setVelocityX(-1);
        });
        this.koopas.playAnimation('koopaWalking');
    }

    getGroup() {
        return this.koopas
    }

    update(player: Player) {
        if (this.koopas != null) {
            this.koopas.children.iterate(function (child: Phaser.Physics.Arcade.Sprite) {
                if (child.x < player.x + 500) {
                    if (child.body.velocity.x == -1)
                        child.setVelocityX(-700);
                    else if (child.body.velocity.x > 0)
                        child.setVelocityX(70);
                    else if (child.body.velocity.x < 0)
                        child.setVelocityX(-70);
                }
            });
        }
    }
}