import { createUIButtonSmall } from "../utilidades/Botones";
import { createBtn } from "../utilidades/Btn";
export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload() { }
    create() {
        const mapa = [
            "################",
            "#1...#..#..#..###",
            "#.##.0.###.....#",
            "#.##.#...0...###",
            "##.....#####...#",
            "#..###.......###",
            "#..0...###.....#",
            "################"
        ];
        const tileW = this.game.config.width / mapa[0].length;
        const tileH = this.game.config.height / mapa.length;
        // Guardamos grupos en la escena
        this.walls = this.physics.add.staticGroup();
        this.tuercas = this.physics.add.staticGroup();
        this.cubitoshielo = this.physics.add.staticGroup();

        mapa.forEach((fila, y) => {
            fila.split("").forEach((c, x) => {
                const px = x * tileW + tileW / 2;
                const py = y * tileH + tileH / 2;
                switch (c) {
                    case "#": {
                        const wall = this.add.rectangle(px, py, tileW, tileH, 0xE7CCEB);
                        this.walls.add(wall); // ya crea body estático
                        break;
                    }
                    case ".": {
                        const tuerca = this.tuercas.create(px, py, 'tuerca').setScale(0.1);
                        tuerca.body.setCircle(8);
                        tuerca.refreshBody();
                        break;
                    }
                    case "0": {
                        const cbt = this.cubitoshielo.create(px, py, 'cubito').setScale(0.2);
                        cbt.body.setCircle(8);
                        cbt.refreshBody();
                        break;
                    }
                    case "1": {
                        // Un solo robot
                        this.robot = this.physics.add.sprite(px, py, 'robot');
                        this.robot.setScale(0.33);
                        break;
                    }
                }
            });
        });
        // Colisiones de las paredes con las tuercas,robots y los cubitos de hielo:
        this.physics.add.collider(this.robot, this.walls);
        this.physics.add.collider(this.tuercas, this.walls);
        this.physics.add.collider(this.cubitoshielo, this.walls);
        this.physics.add.overlap(this.robot, this.tuercas, tragarTuercas, null, this);
        this.physics.add.overlap(this.robot, this.cubitoshielo, tragarCubitosHielo, null, this);
        this.glup = this.sound.add('glup')

        function tragarTuercas(robot, tuerca) {
            tuerca.disableBody(true, true); // esta es la tuerca tocada
            this.glup.play();
            //robot.setTint('0xff0000')
            this.puntos++
            this.actualizarHUD()

        }
        function tragarCubitosHielo(robot, hielo) {
            hielo.disableBody(true, true); // este es el cubito tocado
            this.glup.play();
            this.vidas--
            this.actualizarHUD()
        }
        //Creamos los cursores:
        this.cursors = this.input.keyboard.createCursorKeys();
        //puntos y vidas
        // HUD
        this.puntos = 0;
        this.vidas = 1;
        this.tiempo = 120;

        this.puntosVidas = this.add.text(10, 10, "", {
            color: "maroon",
            fontSize: 32
        });


        this.actualizarHUD = () => {
            this.puntosVidas.setText(`Puntos: ${this.puntos}   Vidas: ${this.vidas} Tiempo: ${Math.floor(this.tiempo)} `);
            if (this.vidas <= 0 || this.tiempo <= 0) {
                this.scene.start('GameOver')

            }
            if (this.tuercas.countActive(true) === 0) {
                this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.5, "¡Ganaste campeón!", {
                    color: "red",
                    fontSize: 64
                }).setOrigin(0.5);
                this.scene.pause();     // 🔥 Pausar escena
                this.physics.pause();   // 🔥 Congelar físicas
            }
        };

        this.actualizarHUD();

        // botonera
        createBtn(this, 100, this.game.config.height - 40, "ℹ️", () => { this.scene.start("Instrucciones") })

        this.paused = false;  // estado inicial

        // --- BOTÓN PAUSAR ---
        this.bPause = createBtn(
            this,
            200,
            this.game.config.height - 40,
            "⏸️",
            () => { this.activarPausa(); }
        );

        // --- BOTÓN REANUDAR ---
        this.bResume = createBtn(
            this,
            300,
            this.game.config.height - 40,
            "▶️",
            () => { this.desactivarPausa(); }
        );

        

        // Colores iniciales
        this.bPause.setColor(0x00CC44);
        this.bResume.setColor(0x0066220);
        






    }
    activarPausa() {
        if (this.paused) return;

        this.paused = true;
        this.physics.pause();

        // tiempo queda congelado
        // update deja de mover al robot
        this.bPause.setColor(0x0066220); // 
        this.bResume.setColor(0x00CC44); // 
    }

    desactivarPausa() {
        if (!this.paused) return;

        this.paused = false;
        this.physics.resume();

        this.bPause.setColor(0x00CC44);
        this.bResume.setColor(0x0066220); // verde
    }

    update(time, delta) {

        if (this.paused) return;  // 🔥 Detiene movimiento y tiempo

        const speed = 160;
        this.robot.setVelocity(0);

        if (this.cursors.left.isDown) this.robot.setVelocityX(-speed);
        else if (this.cursors.right.isDown) this.robot.setVelocityX(speed);

        if (this.cursors.up.isDown) this.robot.setVelocityY(-speed);
        else if (this.cursors.down.isDown) this.robot.setVelocityY(speed);

        this.tiempo -= delta / 1000;

        this.actualizarHUD();
    }
}
