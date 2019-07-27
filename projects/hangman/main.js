game_config = {
  title: "Hangman",
  backgroundColor: "black",
  keyPressedHandler: userInput,
  update: hangmanLogic,
}
game = new Game(game_config)

player_config = {
  image: "two_legs.png",
  width: 340,
  height: 280,
  location: MIDDLE_CENTER,
  direction: RIGHT,
}
player = new RectSprite(player_config)
player.id = PLAYER_ID
game.add(player)

gallows_config = {
  image: "gallows.png",
  width: 340,
  height: 280,
  location: MIDDLE_CENTER,
  direction: RIGHT,
}
gallows = new RectSprite(gallows_config)
gallows.id = ENEMY_ID
game.add(gallows)

bad_guess_config = {
  text: "${bad_guesses}",
  location: new Vector(canvas.width/2, 12),
  align: ALIGN_CENTER,
  valign: VALIGN_TOP,
  color: "red",
  bold: true,
}
bad_guess = new TextSprite(bad_guess_config)
game.add(bad_guess)

puzzle_config = {
  text: "${current_guess}",
  location: new Vector(canvas.width/2, canvas.height - 12),
  align: ALIGN_CENTER,
  valign: VALIGN_BOTTOM,
  color: "white",
  bold: true,
}
puzzle = new TextSprite(puzzle_config)
game.add(puzzle)

msg_config = {
  text: "${current_msg}",
  location: MIDDLE_CENTER,
  size: 36,
  color: "blue",
  bold: true,
}
msg = new TextSprite(msg_config)
game.add(msg)
canvas.style.letterSpacing = "6px"
bad_guesses = ["Missed letters"]
current_guess = "Current Guess"
current_msg = "Current Msg"
game_over = false
choose_game = false
player_image_idx = 0
player_images = ["empty.png", "head.png", "body.png", "one_arm.png", "two_arms.png", "one_leg.png", "two_legs.png"]

current_puzzle = ""
puzzles = [
  "sushi",
  "eating",
  "sleeping",
  "earth",
  "animals",
  "cake stinks",
  "games",
  "hangman",
  "video game programming",
  "droids will be droids",
  "naruto",
  "lakeland florida",
  "ice pops",
  "game over",
  "ha ha ha ha",
]

game.start()
startNewGame()

// =================
// Custom Functions
// =================
function hangmanLogic() {
  if (game_over == true) {
    return
  }

  if (bad_guesses.length >= player_images.length - 1) {
    gameOver("You lost")
  } else if (current_puzzle != "" && current_guess == current_puzzle) {
    gameOver("You won")
  }
}

function newPuzzle() {
  puzzle = randomChoice(puzzles)
  setPuzzle(puzzle)
}

function setPuzzle(phrase) {
  choose_game = false
  current_msg = ""
  current_puzzle = phrase.toUpperCase()
  current_guess = current_puzzle.replace(/[A-Z]/g, "_")
}

function gameOver(msg) {
  game_over = true
  current_msg = "Game Over, " + msg
  current_guess = current_puzzle
  current_puzzle = ""
}

function startNewGame() {
  game_over = false
  choose_game = true
  current_msg = "Enter or P"
  bad_guesses = []
  current_guess = ""
  player_image_idx = 0
  setPlayerImage()
}

function setPlayerImage() {
  img = player_images[player_image_idx]
  player.setImage(img)
}

function guess(letter) {
  current_msg = ""
  if (current_puzzle.includes(letter)) {
    for (c = 0; c < current_puzzle.length; c++) {
      if (current_puzzle.charAt(c) == letter) {
        before = current_guess.substr(0, c)
        after = current_guess.substr(c + 1)
        current_guess = before + letter + after
      }
    }
  } else {
    if (bad_guesses.includes(letter)) {
      current_msg = "You already guessed " + letter
    } else {
      bad_guesses.push(letter)
      player_image_idx = player_image_idx + 1
      setPlayerImage()
    }
  }
}

function userInput(key) {
  if (game_over == true) {
    if (key == KEY_ENTER) {
    startNewGame()
    }
  }
  else if (choose_game == true) {
    if (key == KEY_ENTER) {
      newPuzzle()
    } else if (key == KEY_P) {
      val = prompt("Enter a word or phrase")
      if (val) {
        setPuzzle(val)
      }
    }
  }
  else if (key == KEY_A){
    guess("A")
  }
  else if (key == KEY_B){
    guess("B")
  }
  else if (key == KEY_C){
    guess("C")
  }
  else if (key == KEY_D){
    guess("D")
  }
  else if (key == KEY_E){
    guess("E")
  }
  else if (key == KEY_F){
    guess("F")
  }
  else if (key == KEY_G){
    guess("G")
  }
  else if (key == KEY_H){
    guess("H")
  }
  else if (key == KEY_I){
    guess("I")
  }
  else if (key == KEY_J){
    guess("J")
  }
else if (key == KEY_K){
  guess("K")
}
else if (key == KEY_L){
  guess("L")
}
else if (key == KEY_M){
  guess("M")
}
else if (key == KEY_N){
  guess("N")
}
else if (key == KEY_O){
  guess("O")
}
else if (key == KEY_P){
  guess("P")
}
else if (key == KEY_Q){
  guess("Q")
}
else if (key == KEY_R){
  guess("R")
}
else if (key == KEY_S){
  guess("S")
}
else if (key == KEY_T){
  guess("T")
}
else if (key == KEY_U){
  guess("U")
}
else if (key == KEY_V){
  guess("V")
}
else if (key == KEY_W){
  guess("W")
}
else if (key == KEY_X){
  guess("X")
}
else if (key == KEY_Y){
  guess("Y")
}
  else if (key == KEY_Z) {
    guess("Z")
  }
}
