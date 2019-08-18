var clock = 0
var status_msg = ""

var gc = new Config()
gc.update = gameLogic
gc.title = "Snack Attack"
gc.backgroundimage = "grass.png"
var game = new Game(gc)

var pc = new Config()
pc.edges = WARP
pc.collisionHandler = playerCollisionHandler
pc.image = "turtle.png"
var player = new PlayerSprite(pc)
game.add(player)

var sc = new Config()
sc.imageChoices = new List("grapes.png", "carrot.png", "bananas.png", "apple.png", "pineapple.png", "broccoli.png", "lemon.png")
sc.respawnTime = 4
var snack = new PowerUpSprite(sc)
game.add(snack)

var jc = new Config()
jc.imageChoices = new List("cupcake.png", "cookie.png", "cake.png")
jc.respawnTime = 2
var junk = new EnemySprite(jc)
game.add(junk)

var smc = new Config()
smc.text = "${status_msg}"
smc.location = MIDDLE_CENTER
smc.color = "black"
smc.size = 42
var status_text = new TextSprite(smc)
game.add(status_text)

var etc = new Config()
etc.text = "${formatClock()}"
etc.location = TOP_CENTER
etc.color = "black"
etc.bold = true
var clock_text = new TextSprite(etc)
game.add(clock_text)

function playerCollisionHandler(player, food) {
  if (food instanceof PowerUpSprite) {
    food.respawn()
    player.r = player.r + 10
    if (player.r >= 200) {
      status_msg = "azlan you won"
      game.paused = true
    }
  }
  if (food instanceof EnemySprite) {
    food.respawn()
    player.r = player.r - 10
    if (player.r < 10) {
      status_msg = "legend archer you lost"
      game.paused = true
    }
  }
}

function gameLogic(game) {
  clock = game.elapsedTime

}

function formatClock() {
  var date = new Date(null)
  date.setSeconds(Math.floor(clock / 10))
  return date.toISOString().substr(11, 8)
}
