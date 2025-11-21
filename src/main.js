import './style.css'
import Phaser from 'phaser'

import GameOver from './scenes/GameOver';
import Instrucciones from './scenes/Instrucciones';
import Portada from './scenes/Portada';
import Game from './scenes/Game';
const config = {
  type: Phaser.AUTO,
  backgroundColor: "#333",
  width: 800,
  height: 600,
   physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [Game,Portada,GameOver,Instrucciones] // Aquí registras la escena

}
const game = new Phaser.Game(config);