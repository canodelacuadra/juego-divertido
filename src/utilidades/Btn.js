export function createBtn(scene, x, y, label, callback) {
    const width = 80;
    const height = 60;

    const bg = scene.add.rectangle(x, y, width, height, 0x006622)
        .setOrigin(0.5)
        .setStrokeStyle(3, 0xcccccc)
        .setInteractive();

    const text = scene.add.text(x, y, label, {
        fontSize: "24px",
        fill: "#0066220",
    }).setOrigin(0.5);

    const handleClick = () => {
        scene.sound.add("click").play();
        callback();
    };

    bg.on("pointerdown", handleClick);
    text.on("pointerdown", handleClick);

    // ⭐ Permitir cambiar color desde fuera
    bg.setColor = (color) => {
        bg.fillColor = color;
    }
   

    return bg; // ⭐ IMPORTANTE: devolvemos el botón
}