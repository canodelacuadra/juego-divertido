// este archivo precarga todos los recursos del juego
import click from "../assets/click.mp3"
import ambiente from "../assets/arcade.mp3"
import robot from "../assets/robot.svg"
import tuerca from "../assets/tuerca.svg"
import cubito from "../assets/ice-cube.svg"
import estrella from "../assets/star-red.svg"
import meteorito from "../assets/fireball.svg"
import glup from "../assets/glup.mp3"
import pedo from "../assets/pedo.mp3"
import boom from "../assets/boom.mp3"

export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload")
    }
    preload() {
        this.load.audio('ambiente', ambiente)
        this.load.audio('click', click)
        this.load.image('cubito', cubito)
        this.load.image('robot', robot)
        this.load.image('tuerca', tuerca)
          this.load.image('estrella', estrella)
           this.load.image('meteorito', meteorito)
           this.load.audio('glup', glup)
            this.load.audio('pedo', pedo)
             this.load.audio('boom', boom)
    }
    create() {
        this.scene.start('Portada')
    }
    update() { }
}