
export default class Game extends Phaser.Scene {
    constructor() {
        super("Game")
    }
    preload() { }
    create() {
        this.add.text(400,300, "Estas jugando", {
            fontSize: "48px",
            fill: "#efefef"
        }).setOrigin(0.5)
        
    }
    update() { }
}