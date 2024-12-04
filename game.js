

const config =  {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: '#fff',
  parent: 'game',
  scene: {
    preload,
    create,
    update
  }
}

new Phaser.Game(config)


function preload(){
  console.log('preload')
}
function create(){
  console.log('create')
}
function update(){
}
