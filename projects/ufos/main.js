game_config = {
  title: "UFO Invasion",
  backgroundImage: "city.png",
  update: enemyStateMachine,
}
game = new Game(game_config)

projectile_config = {
  image: "canonball.png",
  direction: UP,
  collisionHandler: projectileColisionHandler,
}

player_config = {
  edges: CLAMP,
  collisionHandler: playerColisionHandler,
  image: "tank.png",
  location: BOTTOM_CENTER,
  projectile: projectile_config,
}
player = new PlayerSprite(player_config)
game.add(player)

enemies = []
for (i = 0; i < 5; i++){
  item_config = {
    imageChoices: ["ufo.png"],
    location: randomStartLocation,
    move: true,
    direction: DOWN,
    edges: BOUNCE,
  }
  item = new EnemySprite(item_config)
  game.add(item)
  startStandbyState(item)
  enemies.push(item)
}

text_config = {
  text: "Score: ${score}",
  location: TOP_CENTER,
  color: "white",
  bold: true,
}
text = new TextSprite(text_config)
game.add(text)

score = 0
game.start()




function playerColisionHandler(src, target) {

  if (target instanceof EnemySprite){
    game.remove(src)
   }
}
function randomStartLocation(){
  randX = random(0,canvas.width - 10)
  randY = 0
  return new Vector(randX, randY)
}
function projectileColisionHandler(src, target) {
  if   (target instanceof EnemySprite) {
    score = score + 10
    game.remove(src)
    target.respawn()
  }
}

function startStandbyState(ufo) {
  ufo.state = "STANDBY"
  dir = randomChoice([LEFT,RIGHT])
ufo.changeDirection(dir)
}

function startAttackState(ufo) {
  ufo.state = "ATTACK"
    dir = randomChoice([DOWN_LEFT,DOWN_RIGHT])
  ufo.changeDirection(dir)
}
function startRetreatState(ufo) {
  ufo.state = "RETREAT"
  ufo.changeDirection(UP)

}


function enemyStateMachine() {
  for (i = 0; i < enemies.length; i++) {
    enemy = enemies[i]

    // Cange state with 1% probability
    if (random(1, 100) <= 1){
      //what is the current state
      if (enemy.state == "STANDBY") {
        // attack 50% of the time
        if (random(1, 100) <= 50) {
            startAttackState(enemy)
        } else {
          startRetreatState(enemy)
        }
      }
      else if (enemy.state == "RETREAT") {
        // attack 50% of the time
        if (random(1, 100) <= 50) {
            startAttackState(enemy)
        } else {
          startStandbyState(enemy)
        }
      }
      else if (enemy.state == "ATTACK") {
        startRetreatState(enemy)
      }
    }
  }
}
