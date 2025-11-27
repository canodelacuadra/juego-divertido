export function construirTablero(scene,mapa){

        const tileW = scene.game.config.width / mapa[0].length;
        const tileH = scene.game.config.height / mapa.length;
        // Guardamos grupos en la escena
        scene.walls = scene.physics.add.staticGroup();
        scene.tuercas = scene.physics.add.staticGroup();
        scene.cubitoshielo = scene.physics.add.staticGroup();

        mapa.forEach((fila, y) => {
            fila.split("").forEach((c, x) => {
                const px = x * tileW + tileW / 2;
                const py = y * tileH + tileH / 2;
                switch (c) {
                    case "#": {
                        const wall = scene.add.rectangle(px, py, tileW, tileH, 0xE7CCEB);
                        scene.walls.add(wall); // ya crea body estático
                        break;
                    }
                    case ".": {
                        const tuerca = scene.tuercas.create(px, py, 'tuerca').setScale(0.1);
                        tuerca.body.setCircle(8);
                        tuerca.refreshBody();
                        break;
                    }
                    case "0": {
                        const cbt = scene.cubitoshielo.create(px, py, 'cubito').setScale(0.2);
                        cbt.body.setCircle(8);
                        cbt.refreshBody();
                        break;
                    }
                    case "1": {
                        // Un solo robot
                        scene.robot = scene.physics.add.sprite(px, py, 'robot');
                        scene.robot.setScale(0.33);
                        break;
                    }
                }
            });
        });


    }