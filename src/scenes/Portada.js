export default class Portada extends Phaser.Scene {
    constructor() {
        super("Portada")
    }
    preload() { }
    create() {
        this.title = this.add.text(400,300, "Juego Divertido", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
        //Lanzamos el evento:
        this.title.setInteractive();
        this.title.on('pointerdown', () => {
            this.scene.start("Game");
        })

        //Hacemos Instrucciones
        this.instrucciones = this.add.text(400, 450, "Instrucciones", {
            fontSize: "64px",
            fill: "#ffff00"
        }).setOrigin(0.5)
        //Lanzamos el evento:
        this.instrucciones.setInteractive();
        this.instrucciones.on('pointerdown', () => {
            this.scene.start("Instrucciones");
        })

       
    }
    update() { }
}