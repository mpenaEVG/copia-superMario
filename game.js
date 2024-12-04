

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
  this.load.image('enemigo1', 'assets/entities/negroQuieto')
  this.load.image('isa2', 'assets/entities/negroAndando')

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


  this.enemigo 0 this.physics.add.sprite(150,config.height-40,'isa2')
    .setScale(0.50)
    .setOrigin(0,0)

  this.isa =  this.physics.add.sprite(20,100,'isa1')
    .setOrigin(0,0)
    .setScale(0.50)

  this.isa.setCollideWorldBounds(true)
  this.isa.setBounce(0.2)


  this.keys = this.input.keyboard.createCursorKeys()
 
  this.anims.create({
      key:'mario-walk',
      frames:[
        {key:'isa1'},
        {key:'isa2'},
      ],
      frameRate:10,
      repeat: -1
    })

  this.physics.add.collider(this.isa,this.ground)

  this.physics.add.collider(this.isa,this.tuberia)
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
}
