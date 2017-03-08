const theCanvas = document.getElementById("canvasOne");
const ctx = theCanvas.getContext("2d");


const staticText = {
  "intro" : "Вгадай букву починаючи від А - (меншого) до Я (більшого)",
  "wrongCharacter" : "Це не літера",
  "before" : "Перед",
  "after" : "Після",
  "maxTries" : "Максимальна кількість спроб",
  "tip" : "Загадана буква ПОЗА чи ПЕРЕД введеною",
  "finalMsg" : "Ура! Загадана буква",
  "triesLimitOver" : "Перевищено ліміт спроб"

};

const letters = [
  "а","б","в","г","д","е","є","ж","з","и","і","ї","й","к","л",
  "м","н","о","п","р", "с", "м","т","у","ф","х","ц", "ч", "ш", "щ", "ь", "ю", "я"
];

class GuessLetterGame {

  constructor(lettersList) {

    if ( ~Object.prototype.toString.call(lettersList).search(/Array/) ) {
      this.letters = lettersList;
    } else {
      throw new TypeError(`lettersList should be an array of letters for game. 
                            Got -> ${lettersList} | ${typeof lettersList} `)
    }

    this._initCore();



  }

  init() {
    let letterIndex = Math.floor(Math.random() * this.letters.length);
    this.letterToGuess = this.letters[letterIndex];
    window.addEventListener("keypress", this._eventKeyPressed, true);
    this.drawScreen();
  }


  _eventKeyPressed(e) {
    if (!this.gameOver) {

      let letterIndex, guessIndex;
      let letterPressed = String.fromCharCode(e.keyCode).toLowerCase();
      this.guesses++;


      if (this.lettersGuessed.length <= this.maxTriesCount) {
        this.lettersGuessed.push(letterPressed);
      }


      if (letterPressed == this.letterToGuess) {
        this.gameOver = true;
      } else {
        letterIndex = letters.indexOf(letterToGuess);
        guessIndex = letters.indexOf(letterPressed);

        if (guessIndex < 0) {
          this.higherOrLower = "Це не літера!";
        } else if (guessIndex > letterIndex) {
          this.higherOrLower = "Перед";
        } else {
          this.higherOrLower = "Після";
        }
      }
      this._drawScreen();
    }
  }



  _initCore() {
    this.guesses = 0;
    this.message = staticText.intro;

    this.today = new Date().toLocaleString("uk", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });

    this.letterToGuess = "";
    this.higherOrLower = "";
    this.lettersGuessed = [];
    this.gameOver = false;
    this.maxTriesCount = 26;
  };


}



var a = new GuessLetterGame(letters);

let guesses = 0;
let message = "Вгадай букву починаючи від А - (меншого) до Я (більшого)";

let today = new Date().toLocaleString("uk", {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
});
let letterToGuess = "";
let higherOrLower = "";
let lettersGuessed;
let gameOver = false;


function createImageDataPressed(e) {
  console.log("Export");
  window.open(theCanvas.toDataURL(), "canvasImage", "left=0,top=0,width="+theCanvas.width + ",height=" + theCanvas.height + ",toolbar=0, resizable=0");
}

let el = document.getElementById("createImageData");
el.addEventListener('click', createImageDataPressed, false);

function initGame() {
  let letterIndex = Math.floor(Math.random() * letters.length);
  letterToGuess = letters[letterIndex];
  guesses = 0;
  lettersGuessed = [];
  gameOver = false;
  window.addEventListener("keypress", eventKeyPressed, true);
  drawScreen();
}

function eventKeyPressed(e) {
  if (!gameOver) {
    let letterPressed = String.fromCharCode(e.keyCode);

    letterPressed = letterPressed.toLowerCase();
    console.log("letterPressed -> ", letterPressed);
    guesses++;


    if (lettersGuessed.length < 26) {
      lettersGuessed.push(letterPressed);
    }


    if (letterPressed == letterToGuess) {
      gameOver = true;
    } else {
      letterIndex = letters.indexOf(letterToGuess);
      guessIndex = letters.indexOf(letterPressed);
      console.log(guessIndex);
      if (guessIndex < 0) {
        higherOrLower = "Це не літера!";
      } else if (guessIndex > letterIndex) {
        higherOrLower = "Перед";
      } else {
        higherOrLower = "Після";
      }
    }
    drawScreen();
  }
}

function drawScreen() {
  //background;
  ctx.fillStyle = "#ffffaa";
  ctx.fillRect(0,0, 500, 300);
  //box
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(5,5,490,290);

  ctx.textBaseline = "top";
  //Date
  ctx.fillStyle = "#000000";
  ctx.font = "10px Sans-serif";
  ctx.fillText(today, 150,10);

  //message
  ctx.fillStyle = "#FF0000";
  ctx.font = "14px Sans-Serif";
  ctx.fillText(message, 75, 30); //Guesses
  ctx.fillStyle = "#109910";
  ctx.font = "16px Sans-Serif";
  ctx.fillText("Спроб: " + guesses, 215, 50);

  ctx.fillStyle = "#113367";
  ctx.font = "12px Sans-Serif";
  ctx.fillText("( Максимальна кількість спроб: 26 )", 155, 85);



  //Higher or Lower
  ctx.fillStyle = "#000000";
  ctx.font = "16px Sans-Serif";
  ctx.fillText("Загадана буква ПОЗА чи ПЕРЕД введеною: " + higherOrLower, 75, 125);

  //letters Guessed
  ctx.fillStyle = "#FF0000";
  ctx.font = "16px Sans-Serif";
  ctx.fillText("Набрані букви: " + lettersGuessed.toString(), 10, 260);

  if (gameOver) {
    ctx.fillStyle = "#FF0000";
    ctx.font = "40px Sans-Serif";
    ctx.fillText("Ура! Загадана буква -> " + letterToGuess, 15, 180);
  } else if (lettersGuessed.length == 26) {
    gameOver = true;
    ctx.fillStyle = "#FF0000";
    ctx.font = "40px Sans-Serif";
    ctx.fillText("Перевищено ліміт спроб.", 15, 180);
  }


}

initGame();