export function createMeteorito(scene, num) {

    scene.meteorito = scene.physics.add.image(num - 20, 20, 'meteorito').setScale(0.8, 0.8)
    scene.tweens.add({
        targets: scene.meteorito,
        x: 20,
        y: scene.game.config.height - 20,
        repeat: -1,
        duration: 5000
    })
      

}

