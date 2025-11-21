import robot from "../assets/robot.svg"
export default class Game extends Phaser.Scene {
    constructor() {
        super("Game")
    }
    preload() { 
        this.load.image('robot',robot)
    }
    create() {
       
        const walls = this.physics.add.staticGroup();
        const mapa = [
            "################",
            "#..............#",
            "#.##############",
            "#..............#",
            "#.##############",
            "#..............#",
            "#..............#",
            "################"
        ];
        const tileW = this.scale.width / mapa[0].length;
        const tileH = this.scale.height / mapa.length;
        mapa.forEach((fila, y) => {
            fila.split("").forEach((c, x) => {
                if (c === "#") {
                    const wall = this.add.rectangle(
                        x * tileW + tileW / 2,
                        y * tileH + tileH / 2,
                        tileW,
                        tileH,
                        0xff0000
                    );
                    this.physics.add.existing(wall, true);
                    walls.add(wall);
                }
            });
        });
        // colocamos el robot
        this.robot = this.add.image(400,300,"robot").setScale(0.5)
       

    }
    update() { }
}