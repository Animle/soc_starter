var gc = new Config()
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

function playerCollisionHandler(player, food) {
  if (food instanceof PowerUpSprite) {
    food.respawn()
    player.r = player.r + 5
    if (player.r >= 200) {
      console.log("game over you win")
      game.paused = true
    }
  }
  if (food instanceof EnemySprite) {
    food.respawn()
    player.r = player.r - 10
    if (player.r < 10) {
      console.log("game over you lose")
      game.paused = true
    }
  }
}
