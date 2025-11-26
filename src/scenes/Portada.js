
export default class Portada extends Phaser.Scene {
    constructor() {
        super("Portada")
    }
    preload() {
        
    }
    create() {
        // fondo estrellado
         this.estrellas=[]
         for(let i=0;i<50;i++){
            // las posicionamos aleatoriamente
            const x=Phaser.Math.Between(0,800);
            const y=Phaser.Math.Between(0,600);
            // cargamos la imagen de la estrella
           let estrella =  this.add.image(x,y, "estrella")
           // darles tamaño aleatoriamente
           const scale = Phaser.Math.FloatBetween(0.2,1);
           estrella.setScale(scale)
           // les aplicamos velocidad aleatoria que se aplicará en el update
        estrella.velocidad=  Phaser.Math.FloatBetween(20,120)
        // añadimos la estrella creada al array de estrellas
           this.estrellas.push(estrella)
         }
         

        /////// titulo
        this.title = this.add.text(400, 150, "Juego Divertido", {
            fontSize: "64px",
            fill: "#efefef"
        }).setOrigin(0.5)
        this.tweens.add({
            targets:this.title,
            y: 500, 
            duration:5000,
            yoyo:true,
            repeat: -1
        })
        // robot
        this.add.image(400,210,'robot').setScale(0.8,0.8)
      
        
        // botones menu
        this.createUIButton(400, 300, "Start", () => this.scene.start('Game'))
        this.createUIButton(400, 400, "Instrucciones", () => this.scene.start('Instrucciones'))

          // meteorito
         this.meteorito = this.add.image(780,10,'meteorito').setScale(0.8,0.8)
        this.tweens.add({
            targets:this.meteorito,
            x:10,
            y:590,
            repeat:-1,
            duration:5000

        })
        
    
    }
    createUIButton(x, y, label, callback) {
        // dimensiones del boton
        const width = 200;
        const height = 60;
        const color= 0xff0000;//
        // creo el fondo del boton
        const bg = this.add.rectangle(x, y, width, height, color, 1)
            .setOrigin(0.5).setStrokeStyle(3, 0xffffff).setInteractive()
        const text = this.add.text(x, y, label, {
            fontSize: "24px",
            fill: "#ffffff",

        }).setOrigin(0.5).setInteractive()
        bg.on('pointerdown', () => {
           this.sound.add("click").play()
            callback();
        })
        text.on('pointerdown', () => {
            this.sound.add("click").play()
            callback();
        })
    }
     update(time,delta){
        const width = this.sys.game.config.width;

        this.estrellas.forEach(star => {
            // Movimiento horizontal basado en delta
            star.x += star.velocidad * (delta / 1000);

            // Si sale por la derecha, reaparece a la izquierda
            if (star.x > width) {
                star.x = -10;
            }
        })
}
}