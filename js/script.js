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

// Create function to add placeholders for each letter of word
//Use array then join it back to a string using .join("") method
const placeholder = function () {
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
  const guess = letterInput.value;
  console.log(guess);
  letterInput.value = "";
});
