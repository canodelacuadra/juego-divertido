import { construirTablero } from "../utilidades/construirTablero";
import mapas from "../utilidades/mapas.json"
import { createBtn } from "../utilidades/Btn";
export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload() { }
    create() {
        // Mostramos un tablero aleatorio
        const claves = Object.keys(mapas);      // ["mapa1", "mapa2", "mapa3","jose","elisa"]
        const aleatoria = claves[Math.floor(Math.random() * claves.length)];
        
        const mapaSeleccionado = mapas[aleatoria];
        // construimos el laberinto
        construirTablero(this, mapaSeleccionado)
        // Colisiones de las paredes con las tuercas,robots y los cubitos de hielo:
        this.physics.add.collider(this.robot, this.walls);
        this.physics.add.collider(this.tuercas, this.walls);
        this.physics.add.collider(this.cubitoshielo, this.walls);
        this.physics.add.overlap(this.robot, this.tuercas, tragarTuercas, null, this);
        this.physics.add.overlap(this.robot, this.cubitoshielo, tragarCubitosHielo, null, this);
        this.glup = this.sound.add('glup')
        this.pedo = this.sound.add('pedo')
        this.boom = this.sound.add('boom')

        function tragarTuercas(robot, tuerca) {
            tuerca.disableBody(true, true); // esta es la tuerca tocada
            this.glup.play();
            //robot.setTint('0xff0000')
            this.puntos++
            this.actualizarHUD()

        }
        function tragarCubitosHielo(robot, hielo) {
            hielo.disableBody(true, true); // este es el cubito tocado+
            //robot.setTint(0x0000ff)
            this.pedo.play();
            this.vidas--
            this.actualizarHUD()
        }
        //Creamos los cursores:
        this.cursors = this.input.keyboard.createCursorKeys();
        //puntos y vidas
        // HUD
        this.puntos = 0;
        this.vidas = 3;
        this.tiempo = 120;

        this.puntosVidas = this.add.text(10, 10, "", {
            color: "maroon",
            fontSize: 32
        });

        this.actualizarHUD = () => {
            const emoji = "🤖"; // el emoji que quieras
           const vidasEmoji = emoji.repeat(this.vidas);
            this.puntosVidas.setText(`Puntos: ${this.puntos}   Vidas: ${vidasEmoji} Tiempo: ${Math.floor(this.tiempo)} `);
            if (this.vidas <= 0 || this.tiempo <= 0) {
                this.boom.play()
                this.scene.start('GameOver')

            }
            /* if(this.tiempo>=0&& this.vidas>=1 && this.tuercas.countActive(true) === 0 ){
                 construirTablero(this, mapaSeleccionado)

            } */
            if (this.tuercas.countActive(true) === 0) {
                this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.5, "¡Ganaste campeón!", {
                    color: "red",
                    fontSize: 64
                }).setOrigin(0.5);
                this.scene.pause();     // Pausar escena
                this.physics.pause();   //  Congelar físicas
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
        this.bResume.setColor(0x0066220)

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
