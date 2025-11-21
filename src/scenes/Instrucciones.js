export default class Instrucciones extends Phaser.Scene {
    constructor() {
        super("Instrucciones")
    }
    preload() { }
    create() {
        this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Instrucciones", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
    }
    update() { }
}