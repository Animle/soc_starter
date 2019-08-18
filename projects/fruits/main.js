fruits = []
game_config = {
  title: "Fruit bowl",
  backgroundImage: "orchard.png",
  update: myGameLogic,
}
game = new Game(game_config)

player_config = {
  image: "bowl.png",
  location: BOTTOM_CENTER,
  edges: CLAMP,
  collisionHandler: playerCollisonHandler,
}
player = new PlayerSprite(player_config)
game.add(player)

for (i = 0; i < 5; i++) {
  item_config = {
    imageChoices: ["apple.png", "peach.png", "plum.png", "pineapple.png", "bananas.png"],
    move: true,
    direction: DOWN,
    location: randomStartLocation,
    edges: WARP,
  }
  item = new PowerUpSprite(item_config)
  game.add(item)
  fruits.push(item)
}

text_config = {
  text: "Score: ${score}",
  location: TOP_CENTER,
  color: "black",
  bold: true,
}
text = new TextSprite(text_config)
game.add(text)

score = 0
game.start()

//================================================================================
// custom Functions
//================================================================================
function playerCollisonHandler(src, target) {
  if (target instanceof PowerUpSprite) {
    score = score + 10

    target.respawn()
  }
}

function randomStartLocation() {
  randX = random(10, canvas.width - 10)
  randY = 0
  return new Vector(randX, randY)
}

function myGameLogic() {
  for (i = 0; i < fruits.length; i++) {
    fruit = fruits[i]
    rect = fruit.getBoundingRect()
    if (rect.centerY > canvas.height) {
      fruit.respawn()
    }
  }
}
