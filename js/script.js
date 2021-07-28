//CREATE VARIABLES
// unordered list of player's guessed letters
const guessedLetterList = document.querySelector(".guessed-letters");

// Guess! button
const guessButton = document.querySelector(".guess");

//text input for player's guess
const letterInput = document.querySelector(".letter");

// word progress paragraph
const wordInProgress = document.querySelector(".word-in-progress");

// remaining guess paragraph
const guessesRemaining = document.querySelector(".remaining");

//span in paragraph for remaining guessesRemaining
const guessesRemainingSpan = document.querySelector(".remaining span");

//message when player guesses letter
const message = document.querySelector(".message");

//hidden button prompting player to play Again
const playAgainButton = document.querySelector(".play-again");

//starting word to test
const word = "magnolia";

// create empty array for all letters guessed by player
const guessedLetters = [];

// Create function to add placeholders for each letter of word
//Use array then join it back to a string using .join("") method
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// Add event listener to button
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value;
  const validGuess = validateInput(guess);
  if (validGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

// Create function to validate player's letterInput
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/; //accepted letter sequence; regular expression
  if (input === "") { //checks if input is empty
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) { // checks if more than one letter input
    message.innerText = "Please enter one letter at a time."
  } else if (!input.match(acceptedLetter)) { //checks if guess matches regular expression pattern
    message.innerText = "Please enter a letter only.";
  } else {
    return input;
  }
};

// Create a function to capture letterInput
const makeGuess = function (guess) {
  guess = guess.toUpperCase(); //JS is case sensitive; convert to upper case
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter. Try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
