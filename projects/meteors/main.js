 game_config = {
  title: "Meteor Shower",
  backgroundImage: "space.png",
}
game= new Game(game_config)
  projectile_config = {
    image: "missile.png",
    direction: UP,
    collisionHandler:projectileCollisionHandler,
  }



player_config = {
  image: "ufo.png",
  edges: WARP,
  collisionHandler: playerCollisonHandler,
  projectile: projectile_config,
}
player = new PlayerSprite(player_config)
game.add(player)
for (i = 0; i < 10; i++){
item_config = {
    imageChoices: ["meteor1.png", "meteor2.png", "meteor3.png",],
    move: true,
    direction: createNormalizedRandomVector,
    location: randomStartLocation,
    edges: WARP,
    rotateSpeed: randomRotateSpeed,
  }
  item = new EnemySprite(item_config)
  game.add(item)
}

text_config = {
  text: "Score: ${score}",
  location: TOP_CENTER,
  color: "white",
  bold: true,}
text = new TextSprite(text_config)
game.add(text)

score = 0
game.start()

//================================================================================
// custom Functions
//================================================================================
function playerCollisonHandler(src, target) {
  if (target instanceof EnemySprite){
    game.remove(src)
    src.respawn()
  }
}
  function projectileCollisionHandler(src, target){
    if (target instanceof EnemySprite){
      score = score + 10
      game.remove(src)
      //game.respawn(target)
      target.respawn()
    }
}
function randomStartLocation() {
  randX = random(10, canvas.width - 10)
  randY = 0
return new Vector(randX, randY)
}





function randomRotateSpeed() {
  return random(1, 100)
}
