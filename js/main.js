// Select all board cells
const cells = document.querySelectorAll(".cell");
// Display for winner messages
const winnerMessage = document.querySelector(".winner-message");
// Text content for the winner announcement
const winnerText = document.querySelector(".winner-text");
// Button to start the next round or reset the game
const nextRoundButton = document.querySelector(".next-round-button");
// Display for player X's score
const scoreX = document.querySelector("#scoreX");
// Display for player O's score
const scoreO = document.querySelector("#scoreO");
// Buttons to select the game mode (e.g., player vs. player or vs. computer)
const gamemodeButtons = document.querySelectorAll(".gamemode-button");

// Inputs for player names
const playerXNameInput = document.querySelector("#playerX");
const playerONameInput = document.querySelector("#playerO");
// Button to start the game after entering names
const startGameButton = document.querySelector(".start-game-button");
// Section for entering player names
const playerNamesSection = document.querySelector(".player-names");
// SVG for drawing winning line
const winningLineSVG = document.querySelector("#winningLine");
// Game container
const gameContainer = document.querySelector(".game-container");

// Track the current player ("X" or "O")
let currentPlayer = "X";
// Store the current state of the board
let boardState = Array(9).fill(null);
// Keep track of the score for both players
let score = { X: 0, O: 0 };
// Current game mode (e.g., "player" or "computer")
let gamemode = "";
// Player names
let playerNames = {
  X: "Speler X", // Default name for player X
  O: "Speler O"  // Default name for player O
};
// Store the winning combination
let winningCombination = null;

// All possible winning combinations on the board
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// List of inappropriate words for name validation
const badwords = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];  

// List of special characters not allowed in names
const specialCharacters = ['!', '?', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', '"', '\'', ',', '.', '/', '<', '>', '?', '~'];

// Check if a name is valid (no special characters or bad words)
function isValidName(name) {
  // Check for special characters
  if (specialCharacters.some(char => name.includes(char))) {
    alert("Speciale tekens zijn niet toegestaan in de naam.");
    return false;
  }
// Convert the name to lowercase and check for bad words
  const nameLowerCase = name.toLowerCase();
  if (badwords.some(badword => nameLowerCase.includes(badword))) {
    alert("Je naam bevat ongepaste woorden.");
    return false;
  }

  return true;
}

// Check if the current board state has a winner
function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      winningCombination = combination;
      return true;
    }
  }
  winningCombination = null;
  return false;
}

// Draw a line through the winning cells
function drawWinningLine() {
  if (!winningCombination) return;
  
  const [a, b, c] = winningCombination;
  const cellWidth = 110;
  const cellHeight = 110;
  const padding = 8;
  
  // Get positions of winning cells
  const getPosition = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return {
      x: col * cellWidth + padding + cellWidth / 2,
      y: row * cellHeight + padding + cellHeight / 2
    };
  };
  
  const pos1 = getPosition(a);
  const pos2 = getPosition(c);
  
  // Clear previous line
  winningLineSVG.innerHTML = '';
  
  // Create line with animation
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', pos1.x);
  line.setAttribute('y1', pos1.y);
  line.setAttribute('x2', pos2.x);
  line.setAttribute('y2', pos2.y);
  line.setAttribute('stroke', currentPlayer === 'X' ? '#ff6b6b' : '#4ecdc4');
  line.setAttribute('stroke-width', '6');
  line.setAttribute('stroke-linecap', 'round');
  line.setAttribute('stroke-dasharray', Math.hypot(pos2.x - pos1.x, pos2.y - pos1.y));
  line.setAttribute('stroke-dashoffset', Math.hypot(pos2.x - pos1.x, pos2.y - pos1.y));
  line.style.animation = 'drawLine 0.6s ease-out forwards';
  
  winningLineSVG.appendChild(line);
  
  // Add animation to SVG if not already present
  if (!document.querySelector('style[data-win-animation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-win-animation', 'true');
    style.textContent = `
      @keyframes drawLine {
        to {
          stroke-dashoffset: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Highlight winning cells
  [a, b, c].forEach(index => {
    cells[index].classList.add('winning');
  });
}

// Check if the game is a draw (all cells are filled)
function isDraw() {
  return boardState.every(cell => cell !== null);
}

// Handle a player's move when they click on a cell
function handleClick(event) {
  const index = event.target.dataset.index;
  // Ignore clicks if the cell is taken, the game is over, or a player has won 5 rounds
  if (boardState[index] !== null || !winnerMessage.classList.contains("hidden") || score.X >= 5 || score.O >= 5) {
    return;
  }

  // Update board state and display the player's move
  boardState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer);

  if (checkWinner()) {
    // Draw winning line
    setTimeout(() => {
      drawWinningLine();
    }, 300);
    
    // Update score and display winner message
    score[currentPlayer]++;
    updateScoreboard();
    winnerText.textContent = `🎉 ${playerNames[currentPlayer]} wint deze ronde! 🎉`;
    winnerMessage.classList.remove("hidden");
    // Check if the player has reached 5 points
    if (score[currentPlayer] === 5) {
      winnerText.textContent = `🏆 ${playerNames[currentPlayer]} heeft 5 punten behaald en gewonnen! 🏆`;
      nextRoundButton.textContent = "🔄 Opnieuw Spelen";
    } else {
      nextRoundButton.textContent = "🔄 Volgende Ronde";
    }

    nextRoundButton.classList.remove("hidden");
    cells.forEach(cell => cell.removeEventListener("click", handleClick));
  } else if (isDraw()) {
    // Handle draw case
    winnerText.textContent = "🤝 Het is een gelijkspel! 🤝";
    winnerMessage.classList.remove("hidden");
    nextRoundButton.textContent = "🔄 Volgende Ronde";
    nextRoundButton.classList.remove("hidden");
    cells.forEach(cell => cell.removeEventListener("click", handleClick));
  } else {
    // Switch to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    // Make the computer move if in computer mode
    if (gamemode === "computer" && currentPlayer === "O") {
      setTimeout(computerMove, 500);
    }
  }
}

// Make a move for the computer
function computerMove() {
  const availableCells = [];
  boardState.forEach((value, index) => {
    if (value === null) {
      availableCells.push(index);
    }
  });
  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

  if (randomIndex !== undefined) {
    const cell = cells[randomIndex];
    cell.click();
  }
}

// Update the scoreboard display
function updateScoreboard() {
  scoreX.textContent = score.X;
  scoreO.textContent = score.O;
  document.querySelector("#scoreboard-playerX").textContent = `${playerNames.X}: ${score.X}`;
  document.querySelector("#scoreboard-playerO").textContent = `${playerNames.O}: ${score.O}`;
}

// Start a new round by resetting the board
function startNextRound() {
  boardState.fill(null);
  winningCombination = null;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winning");
  });
  winningLineSVG.innerHTML = '';
  currentPlayer = "X";
  winnerMessage.classList.add("hidden");
  nextRoundButton.classList.add("hidden");
  cells.forEach(cell => cell.addEventListener("click", handleClick));
}

// Reset the game (score and board)
function resetGame() {
  score.X = 0;
  score.O = 0;
  updateScoreboard();
  boardState.fill(null);
  winningCombination = null;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winning");
  });
  winningLineSVG.innerHTML = '';
  currentPlayer = "X";
  winnerMessage.classList.add("hidden");
  nextRoundButton.classList.add("hidden");
  cells.forEach(cell => cell.addEventListener("click", handleClick));
}

// Select the game mode (player vs player or vs computer)
function selectGamemode(mode) {
  gamemode = mode;
  if (mode === "player") {
    document.querySelector(".gamemode-selection").classList.add("hidden");
    playerNamesSection.classList.remove("hidden");
  } else {
    startGameForComputer();
  }
}

// Start the game in computer mode
function startGameForComputer() {
  gamemode = "computer";
  startGame();
}

// Start the game after validating player names
function startGame() {
  const playerXName = playerXNameInput.value.trim();
  const playerOName = playerONameInput.value.trim();

  if (!isValidName(playerXName) || !isValidName(playerOName)) {
    return; 
  }

  playerNames.X = playerXName || "Speler X";
  playerNames.O = playerOName || "Speler O";

  document.querySelector(".gamemode-selection").classList.add("hidden");
  playerNamesSection.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  document.querySelector(".scoreboard").classList.remove("hidden");

  updateScoreboard();

  cells.forEach(cell => cell.addEventListener("click", handleClick));
}

// Hide the next round button initially
nextRoundButton.classList.add("hidden");

// Add event listeners to game mode buttons
gamemodeButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (!gamemode) {
      selectGamemode(button.dataset.mode);
    }
  });
});

// Add event listener to the start game button
startGameButton.addEventListener("click", startGame);

// Add event listener to the next round button
nextRoundButton.addEventListener("click", function() {
  if (score.X === 5 || score.O === 5) {
    resetGame();
  } else {
    startNextRound();
  }
});