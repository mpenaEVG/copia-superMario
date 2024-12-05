

const config =  {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: '#049cd8',
  parent: 'game',
  pixelArt:true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 300},
      debug: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
}

new Phaser.Game(config)


function preload(){
    this.load.image(
      'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )
    this.load.image(
      'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )
    this.load.image(
      'pipe',
      'assets/scenery/pipe1.png'
    )

  this.load.image('isa1', 'assets/entities/isa.png')
  this.load.image('isa2', 'assets/entities/isaandando.png')
  this.load.image('enemigo1', 'assets/entities/box1.1-right1.png')
  this.load.image('enemigo1-2', 'assets/entities/box1.1-left1.png')
  this.load.image('bolaFuego-explota', 'assets/entities/fireball-explosion.png')
  this.load.image('bolaFuego', 'assets/entities/fireball.png')
}

function create(){

  this.add.image(100,50,'cloud1')
    .setOrigin(0,0)
    .setScale(0.15)

  this.ground = this.physics.add.staticGroup()
  this.ground 
    .create(config.width/2, config.height-16,'floorbricks')
    .setScale(2)
    .refreshBody()
  
  this.tuberia = this.physics.add.staticGroup()
  this.tuberia 
    .create(150,config.height-70,'pipe')
    .setScale(1)
    .refreshBody()

  this.enemigo1 =  this.physics.add.sprite(0,200,'enemigo1')
    .setOrigin(0.5,1)
    .setScale(0.50)
  this.enemigo1.setCollideWorldBounds(true)
  this.enemigo1.setVelocityX(100)
  this.enemigo1.setGravityY(500)

  this.enemigo2 =  this.physics.add.sprite(300,100,'enemigo1')
    .setOrigin(0.5,1)
    .setScale(0.50)
  this.enemigo2.setCollideWorldBounds(false)
  this.enemigo2.setVelocityY(100)
  this.enemigo2.setGravityY(-300)

  this.isa =  this.physics.add.sprite(20,100,'isa1')
    .setOrigin(0.5,1)
    .setScale(0.50)

  this.isa.setCollideWorldBounds(true)

  this.bolasDeFuego = this.physics.add.group({
    defaultKey: 'bolaFuego',
    maxSize: 10
  })

  this.keys = this.input.keyboard.createCursorKeys()
  this.keys.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

  this.anims.create({
      key:'mario-walk',
      frames:[
        {key:'isa1'},
        {key:'isa2'},
      ],
      frameRate:10,
      repeat: -1
    })

  
  this.anims.create({
      key:'enemigo1-walk',
      frames:[
        {key:'enemigo1'},
        {key:'enemigo1-2'},
      ],
      frameRate:5,
      repeat: -1
    })

  this.enemigo1.play('enemigo1-walk')
  this.enemigo2.play('enemigo1-walk')


  this.physics.add.collider(this.isa,this.ground)
  this.physics.add.collider(this.isa, this.tuberia, onPipeCollision, null, this);

  this.physics.add.collider(this.enemigo1,this.tuberia)
  this.physics.add.collider(this.enemigo1,this.ground)



  this.physics.add.overlap(this.isa, this.enemigo1, hitEnemy, null, this);
}

function hitEnemy(player, enemy) {

  if (player.body.touching.down && enemy.body.touching.up && player.y + player.height / 2 < enemy.y){
    enemy.destroy()
    player.setVelocity(-150)
  }else{
    player.setTint(0xff0000)
  }
}

  
function update() {
  if (this.keys.left.isDown) {
    this.isa.setVelocityX(-100)
    this.isa.play('mario-walk', true)
    this.isa.flipX = true
  } else if (this.keys.right.isDown) {
    this.isa.setVelocityX(100); 
    this.isa.play('mario-walk', true)
    this.isa.flipX = false
  } else {
    this.isa.setVelocityX(0); 
    this.isa.setTexture('isa1')
  }

  if (this.keys.up.isDown && this.isa.body.touching.down) {
    this.isa.setVelocityY(-200)
  }

  if(this.enemigo1 && this.enemigo1.body){


    if (this.enemigo1.body.blocked.right) {
          this.enemigo1.setVelocityX(-100)
          this.enemigo1.flipX = true
      } else if(this.enemigo1.body.blocked.left){

          this.enemigo1.setVelocityX(100)
          this.enemigo1.flipX = false
      }
}
if (this.enemigo2.y <= 40) {
    this.enemigo2.setVelocityY(100);  // Cambia a velocidad positiva para descender
  } else if (this.enemigo2.y >= 150) {
    this.enemigo2.setVelocityY(-100);  // Cambia a velocidad negativa para ascender
  } 

if(Phaser.Input.Keyboard.JustDown(this.keys.space)){
  lanzarBolaDeFuego.call(this)
}
    
  this.cameras.main.startFollow(this.isa)
  this.cameras.main.setBounds(0, 0, 5000, 244)
}


function hitEnemy(player, enemy) {

  if (player.body.touching.down && enemy.body.touching.up && player.y + player.height / 2 < enemy.y){
    enemy.destroy()
    player.setVelocity(-150)
  }else{
    player.setTint(0xff0000)
  }
}


function onPipeCollision(player,pipe){
  if(player.body.touching.down && pipe.body.touching.up){
    player.setVelocityY(0)
  }
}


function lanzarBolaDeFuego(){
  const bola = this.bolasDeFuego.get()

  if(bola){

    bola.setActive(true).setVisible(true)
    bola.setPosition(this.isa.x,this.isa.y-20)

    if(this.isa.flipX){
      bola.setVelocityX(-300)
    }else{
      bola.setVelocityX(300)
    }

    bola.setVelocityY(0)

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        bola.setActive(false).setVisible(false)
      },
      callbackScope: this
    })
  }

}
