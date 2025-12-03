import './style.css'
import Phaser from 'phaser'
import Preload from './scenes/Preload';
import GameOver from './scenes/GameOver';
import Instrucciones from './scenes/Instrucciones';
import Portada from './scenes/Portada';
import Game from './scenes/Game';
const config = {
  type: Phaser.AUTO,
  parent:document.getElementById('container'),
  backgroundColor: "#333",
  width: 800,
  height: 600,
   physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
   scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
        width: 300,
        height: 200
    },
    max: {
        width: 1200,
        height: 900
    }
    },
    title:"El cometuercas",
    version:"1.0",
  scene: [Preload,Portada,Game,GameOver,Instrucciones] // Aquí registras la escena

}
document.fonts.load("16px fuenteNova").then(() => {
    // Iniciar Phaser aquí
    const game = new Phaser.Game(config);
});
