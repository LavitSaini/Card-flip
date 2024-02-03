function main(){ // Main function 

  // Card data
  const cardsArray = [
    {
      name: "shell",
      img: "img/blueshell.png",
    },
    {
      name: "star",
      img: "img/star.png",
    },
    {
      name: "bobomb",
      img: "img/bobomb.png",
    },
    {
      name: "mario",
      img: "img/mario.png",
    },
    {
      name: "luigi",
      img: "img/luigi.png",
    },
    {
      name: "peach",
      img: "img/peach.png",
    },
    {
      name: "1up",
      img: "img/1up.png",
    },
    {
      name: "mushroom",
      img: "img/mushroom.png",
    },
    {
      name: "thwomp",
      img: "img/thwomp.png",
    },
    {
      name: "bulletbill",
      img: "img/bulletbill.png",
    },
    {
      name: "coin",
      img: "img/coin.png",
    },
    {
      name: "goomba",
      img: "img/goomba.png",
    },
  ];
  
  // Accesing Overlay element
  let overLay = document.querySelector(".overlay");
  
  // Accessing play button and quit button
  let play = document.querySelector(".play");
  let quit = document.querySelector(".quit");
  
  // Accessing audios of the game
  let buttonClickAudio = document.querySelector("#button-click-audio");
  let cardsflipAudio = document.querySelector("#cards-flip-audio");
  let cardsMatchedAudio = document.querySelector("#cards-matched-audio");
  let gameWinAudio = document.querySelector("#game-win-audio");
  
  // Accessing counter board element to display the number of counts
  let counterBoard = document.querySelector(".counter-board");
  
  // Decalre variable with name counter that holds the value how many times we flip the cards
  let counter = 0;
  
  // Deaclare a variable check all pairs of the cards are matched
  let check = 0;
  
  // function to change the value of counter borad
  function changeCounterBoard() {
    counterBoard.innerText = `Moves: ${counter}`;
  }
  
  changeCounterBoard();
  
  // Adding event listener on quit button to quit the game
  quit.addEventListener("click", () => {
    buttonClickAudio.play();
    setTimeout(() => {
      window.close();
    }, 500);
  });
  
  // Adding event listener on play button to start the game
  play.addEventListener("click", () => {
    buttonClickAudio.play();
    // Hiding Overlay element
    overLay.classList.add("none");
  });
  
  // Accessing parent element of the cards using its card-container id
  let cardsParent = document.querySelector(".cards-container");
  
  // function to shuffle the Array elements
  function shuffleArray() {
    let randomPosition;
    for (let i = cardsArray.length - 1; i >= 0; i--) {
      randomPosition = Math.floor(Math.random() * (i + 1));
      let temp = cardsArray[i];
      cardsArray[i] = cardsArray[randomPosition];
      cardsArray[randomPosition] = temp;
    }
    return cardsArray;
  }
  
  // function to display all cards on screen
  function displayUI() {
    cardsParent.innerHTML = "";
    for (let i = 0; i < 2; i++) {
      shuffleArray();
      cardsArray.forEach((card) => {
        // Creating element for card
        let Card = document.createElement("div");
        let front = document.createElement("div");
        let back = document.createElement("div");
  
        // Adding classes to card elements
        Card.classList.add("card");
        front.classList.add("front");
        back.classList.add("back");
  
        // Adding data attribute in Card element
        Card.setAttribute("data-name", card.name);
  
        // Adding background image in back element
        back.style.backgroundImage = `url(${card.img})`;
  
        // Appending card elements inside parent element
        Card.append(front, back);
        cardsParent.append(Card);
      });
    }
  }
  
  displayUI();
  
  // function to reset count, firstCardName and secondCardName values
  function resetValues() {
    count = 0;
    firstCardName = "";
    secondCardName = "";
    let selectedCards = document.querySelectorAll(".rotate-card");
    setTimeout(() => {
      selectedCards.forEach((card) => {
        card.classList.remove("rotate-card");
      });
    }, 1000);
  }
  
  // function to check the match of the two cards
  function matchCards() {
    cardsMatchedAudio.play();
    let selectedCards = document.querySelectorAll(".rotate-card");
    setTimeout(() => {
      selectedCards.forEach((card) => {
        card.style.backgroundImage = "none";
        card.nextElementSibling.style.backgroundImage = "none";
      });
    }, 1000);
    check++;
  }
  
  // Declare count variable that help to select only one pair of two cards
  let count = 0;
  
  // Declare two variable to store the names of two selected cards
  let firstCardName = "";
  let secondCardName = "";
  
  // Adding event listener on cards parent element
  cardsParent.addEventListener("click", (event) => {
    let clicked = event.target;
  
    if (
      clicked.classList.contains("cards-container") ||
      clicked.classList.contains("back") ||
      clicked.classList.contains("rotate-card")
    ) {
      return;
    }
  
    cardsflipAudio.play();
    counter++;
    changeCounterBoard();
  
    if (count < 2) {
      count++;
      if (count === 1) {
        firstCardName = clicked.parentElement.dataset.name;
        clicked.classList.add("rotate-card");
      } else {
        secondCardName = clicked.parentElement.dataset.name;
        clicked.classList.add("rotate-card");
      }
  
      if (firstCardName !== "" && secondCardName !== "") {
        if (firstCardName === secondCardName) {
          matchCards();
          resetValues();
          checkAllCardsMatched();
        } else {
          resetValues();
          checkAllCardsMatched();
        }
      }
    }
  });
  
  // Accessing buttons box parent element
  let buttonsBox = document.querySelector(".buttons-box");
  
  // function to check when all pairs of the cards are matched
  function checkAllCardsMatched() {
    if (check === 12) {
      gameWinAudio.play();
  
      // Creating new play again button
      let playAgain = document.createElement("button");
      playAgain.innerText = "Play Again";
      playAgain.classList.add("btn");
  
      // Hiding Another buttons inside Buttons Box
      play.classList.add("none");
      quit.classList.add("none");
  
      // Show Overlay element
      overLay.classList.remove("none");
  
      // Appending play again button inside buttons box
      buttonsBox.append(playAgain);
  
      // Show play Again button
      playAgain.classList.remove("none");
  
      playAgain.addEventListener("click", () => {
        buttonClickAudio.play();
  
        setTimeout(() => {
          // Display game staring buttons
          play.classList.remove("none");
          quit.classList.remove("none");
  
          // Hide overlay element
          overLay.classList.add("none");
  
          // Hide Play Again button
          playAgain.classList.add("none");
  
          // Change check value to 0
          check = 0;
  
          // Change counter value to 0
          counter = 0;
  
          // Calling function to reset the game
          resetValues();
          changeCounterBoard();
          displayUI();
        }, 500);
      });
    }
  }

}

main(); // Calling main function

