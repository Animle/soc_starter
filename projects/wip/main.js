//=========================================================================
// GLOBALS
// ========================================================================
var num_meteors = 3
var score = 0
var status_msg = ""

//=========================================================================
// CUSTOM GAME OBJECTS
// ========================================================================
class SpaceShipSprite extends PlayerSprite {
  move(direction) {
    if (direction == LEFT) {
      this.direction.rotate(-5)
      this.angle = this.direction.getAngleInDegrees() + 90
    } else if (direction == RIGHT) {
      this.direction.rotate(5)
      this.angle = this.direction.getAngleInDegrees() + 90
    }

    if (direction == UP) {
      super.move(UP)
    } else if (direction == DOWN) {
      super.move(DOWN)
    }
  }
}

//=========================================================================
// GAME OBJECTS
// ========================================================================
var gc = new Config()
gc.title = "Meteor Shower"
gc.backgroundimage = "space.png"
var game = new Game(gc)

var bc = new Config("bullet config")
bc.image = "missile.png"
bc.direction = UP

var pc = new Config("player config")
pc.image = "spaceship.png"
pc.projectile = bc
pc.edges = WARP
pc.direction = UP
var player = new SpaceShipSprite(pc)
game.add(player)

var stc = new Config("score text config")
stc.text = "Score: ${score}"
stc.location = TOP_CENTER
stc.color = "white"
stc.bold = true
var score_text = new TextSprite(stc)
game.add(score_text)

var stmc = new Config()
stmc.text = "${status_msg}"
stmc.location = MIDDLE_CENTER
stmc.color = "white"
stmc.bold = true
stmc.size = 42
var ststus_msg_text = new TextSprite(stmc)
game.add(ststus_msg_text)

var hmc = new Config()
hmc.location = new Vector(2, 2)
var health_meter = new StatusBarSprite(hmc)
game.add(health_meter)

for (i = 0; i < num_meteors; i++) {
  var mc = new Config("meteor config")
  mc.imageChoices = new List("meteor1.png", "meteor2.png", "meteor3.png")
  mc.location = randomStartLocation
  mc.rotateSpeed = randomRotateSpeed
  mc.direction = createNormalizedRandomVector
  mc.edges = WARP
  mc.move = true
  mc.collisionHandler = impact
  var meteor = new EnemySprite(mc)
  game.add(meteor)
}

//=========================================================================
// CUSTOM FUNCTIONS
// ========================================================================
function impact(meteor, other_sprite) {
  if (other_sprite instanceof PlayerSprite) {
    health_meter.value = health_meter.value - 25
    meteor.respawn()
    if (health_meter.value <= 0) {
      game.remove(other_sprite)
      status_msg = "Game Over"
    }
  } else if (other_sprite instanceof BulletSprite) {
    score = score + 10
    game.remove(other_sprite)
    meteor.respawn()
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
