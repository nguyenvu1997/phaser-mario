import { Player } from "./Player.js";

export class Turtles {
    scene: Phaser.Scene;
    turtles: Phaser.Physics.Arcade.Group;
    map: Phaser.Tilemaps.Tilemap;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.scene = scene
        this.map = map;
        this.turtles = this.scene.physics.add.group()

        const TurtleObjects = map.getObjectLayer('Turtles')['objects'];
        TurtleObjects.forEach(obj => {
            const turtle = this.turtles.create(obj.x + 21, obj.y - 52, 'enemies', 'Turtle2');
        });
        this.turtles.children.iterate(function (child) {
            (child as Phaser.Physics.Arcade.Sprite).setBounceX(1)
                .setSize(36, 52)
                .setOffset(3, 0)
                .setVelocityX(-1)
                .setState(0)
        });
        this.turtles.playAnimation('turtleWalking');
    }

    getGroup() {
        return this.turtles
    }

    update(player: Player) {
        if (this.turtles != null) {
            this.turtles.children.iterate(function (child: Phaser.Physics.Arcade.Sprite) {
                if (child.state == 0 && child.x < player.x + 500) {
                    if (child.body.velocity.x == -1)
                        child.setVelocityX(-70);
                    else if (child.body.velocity.x > 0) {
                        child.setVelocityX(70);
                        child.setFlipX(true);
                    }
                    else if (child.body.velocity.x < 0) {
                        child.setVelocityX(-70);
                        child.resetFlip();
                    }
                }
                else if (child.state == 3 && child.x < player.x + 500) {
                    if (child.body.velocity.y == -1)
                        child.setVelocityY(-70);
                }
                else if (child.state == 4 && child.x < player.x + 500) {
                    if ((child.body as Phaser.Physics.Arcade.Body).onFloor())
                        child.setVelocityY(-400);
                    if (child.body.velocity.x == -1)
                        child.setVelocityX(-70);
                    else if (child.body.velocity.x > 0) {
                        child.setVelocityX(70);
                        child.setFlipX(true);
                    }
                    else if (child.body.velocity.x < 0) {
                        child.setVelocityX(-70);
                        child.resetFlip();
                    }
                }
            });
        }
    }
}