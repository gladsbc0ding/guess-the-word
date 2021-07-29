//CREATE VARIABLES
// unordered list of player's guessed letters
const guessedLettersList = document.querySelector(".guessed-letters");

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
let word = "magnolia";

// create empty array for all letters guessed by player
const guessedLetters = [];

// Create variable for number of guessesRemaining
let remainingGuesses = 8;

// Add an async function to fetch data
const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n"); //transform fetched data into array
  //console.log(wordArray);
  // Grab random word
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim(); // removes whitespace before/after word
  placeholder(word);
} ;
getWord();

// Create function to add placeholders for each letter of word
//Use array then join it back to a string using .join("") method
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    //console.log(letter);
    placeholderLetters.push("☀️");
    //placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

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
  if (input.length === 0) { //checks if input is empty
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) { // checks if more than one letter input
    message.innerText = "Please enter one letter at a time.";
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
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

// Create a function to show guessed letters
const showGuessedLetters = function () {
  guessedLettersList.innerHTML = "";
  for (const letter of guessedLetters) {
    const li =  document.createElement("li");
    li.innerText = letter;
    guessedLettersList.append(li);
  }
};

// Create a function to update the word in wordInProgress
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push ("☀️");
      //revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkPlayerWon();
};

// Create a function to count the guesses remaniningGuesses
const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, ${guess} is not in the word.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Yay! ${guess} is in the word.`;
  }
  if (remainingGuesses === 0) {
    message.innerHTML = `Sorry, game over. The word was <span class="highlight">${word}</span>.`;
    guessesRemainingSpan.innerText = " 0 guesses";
  } else if (remainingGuesses === 1) {
    guessesRemainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};

// Create a function to check if the player won
const checkPlayerWon = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!!</p>';
  }
};
