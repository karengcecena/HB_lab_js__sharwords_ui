const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
// The divs should be appended to the section with id="word-container".
const createDivsForChars = (word) => {
  for (const letter of word) {
    document.querySelector('#word-container').insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons"
const generateLetterButtons = () => {
  for (const abcs of ALPHABET) {
    document.querySelector('#letter-buttons').insertAdjacentHTML('beforeend', `<button>${abcs}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled= true;

};

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

const isLetterInWord = (letter) => {
  const allLetterDivs = document.querySelectorAll(`.${letter}`);
  
  if (allLetterDivs.length > 0) {
    return true;
  } else{
    return false;
  }
};


const handleCorrectGuess = (letter) => {
  
  const allLetterDivs = document.querySelectorAll(`.${letter}`);

  for (const div of allLetterDivs){
      div.innerHTML = letter;
  }
}; 


const handleWrongGuess = (letter) => {
  
  const allLetterDivs = document.querySelectorAll(`.${letter}`);

  if (allLetterDivs.length === 0 && numWrong < 5){
    numWrong += 1;
    document.querySelector('img').setAttribute('src', `/static/images/guess${numWrong}.png`);
 
  } else if (numWrong === 5) { 
      const letters = document.querySelectorAll('button')
      for (letter of letters){
        letter.disabled = true;
      }

      document.querySelector('#play-again').style.display = 'block';
  
  }
}; 


// <div class="letter-box ${letter}"></div>
// .insertAdjacentHTML(letter)
// <div class="letter-box ${letter}">letter</div>
// 'button.letter.buttons'
  

// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess
  // You can change this to choose a random word from WORDS once you
  // finish this lab but we hard code it so we know what the word is
  // and can tell if things look correct for this word
  // const word = random.choice(WORDS)
  const word = "hello";
  // const wordCopy = word.slice();
  const wordList = Array.from(word);
  const wordSet = new Set(wordList);
  let correctGuesses = 0;
  

  // call the function that makes an empty line for each letter in the word
  // Replace this line with the function call
  createDivsForChars(word);

  // call the function that makes a button for each letter in the alphabet
  // Replace this line with the function call
  generateLetterButtons();

  // in the next lab, you will be adding functionality to handle when
  
  // add an event handler to handle clicking on a letter
  for (const button of document.querySelectorAll('button')) {
    button.addEventListener('click', () => {
      const letter = button.innerHTML;

      // disables button so it can't be clicked again
      disableLetterButton(letter);
      
      // check if letter is in word
      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter);
        correctGuesses += 1;
        
        if (wordSet.size == correctGuesses){
          document.querySelector('#you-win').style.display = 'block';
        }

      } else {
        handleWrongGuess(letter);
      }
         
    });
};
  // add an event handler to handle clicking on the Play Again button
  const resetGame = () => {
    window.location.replace("/sharkwords");
  }
    
  const reset = document.querySelector('a');
  reset.addEventListener('click', resetGame);

  const reset2 = document.querySelector('p');
  reset2.addEventListener('click', resetGame);

})();
