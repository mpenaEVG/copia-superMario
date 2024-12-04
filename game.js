

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
  this.load.image('enemigo1', 'assets/entities/negroQuieto.png')
  this.load.image('enemigo1-2', 'assets/entities/negroAndando.png')

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

  this.enemigo1 =  this.physics.add.sprite(20,100,'enemigo1')
    .setOrigin(1,-2)
    .setScale(0.50)
  this.enemigo1.setCollideWorldBounds(true)
  this.enemigo1.setVelocityX(100)
  this.enemigo1.setGravityY(500)


  this.isa =  this.physics.add.sprite(20,100,'isa1')
    .setOrigin(-8,0)
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

  this.physics.add.collider(this.isa,this.ground)
  this.physics.add.collider(this.isa,this.tuberia)
  this.physics.add.collider(this.enemigo1,this.tuberia)
  this.physics.add.collider(this.enemigo1,this.ground)
  this.physics.add.overlap(this.isa, this.enemigo1, hitEnemy, null, this);
}

function hitEnemy(player, enemy) {

  if(player.body.touching.down && enemy.body.touching.up){
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
        this.enemigo1.setVelocityX(-100);
        this.enemigo1.flipX = true; // Girar a la izquierda
    } else if(this.enemigo1.body.blocked.left){

        this.enemigo1.setVelocityX(100);
        this.enemigo1.flipX = false; // Girar a la derecha
    }
}
  
}
