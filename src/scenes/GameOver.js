export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver")
    }
    preload() { }
    create() {
        this.add.text(window.innerWidth / 2, window.innerHeight / 2, "GameOver", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
    }
    update() { }
}