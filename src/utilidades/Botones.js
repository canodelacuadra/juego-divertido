export function createUIButton(scene, x, y, label, callback) {
        // dimensiones del boton
        const width = 200;
        const height = 60;
        const color= 0xff0000;//
        // creo el fondo del boton
        const bg = scene.add.rectangle(x, y, width, height, color, 1)
            .setOrigin(0.5).setStrokeStyle(3, 0xffffff).setInteractive()
        const text = scene.add.text(x, y, label, {
            fontSize: "24px",
            fill: "#ffffff",

        }).setOrigin(0.5).setInteractive()
        bg.on('pointerdown', () => {
           scene.sound.add("click").play()
            callback();
        })
        text.on('pointerdown', () => {
            scene.sound.add("click").play()
            callback();
        })
    }

    export function createUIButtonSmall(scene, x, y, label, callback) {
        // dimensiones del boton
        const width = 60;
        const height = 60;
        const color= 0xff0000;//
        // creo el fondo del boton
        const bg = scene.add.rectangle(x, y, width, height, color, 0.5)
            .setOrigin(0.5).setStrokeStyle(3, 0xffffff).setInteractive()
        const text = scene.add.text(x, y, label, {
            fontSize: "32px",
            fill: "#ffffff",

        }).setOrigin(0.5).setInteractive()
        bg.on('pointerdown', () => {
           scene.sound.add("click").play()
            callback();
        })
        text.on('pointerdown', () => {
            scene.sound.add("click").play()
            callback();
        })
    }
