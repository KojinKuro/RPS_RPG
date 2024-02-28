import "normalize.css";
import { Paper, Rock, Scissors } from "./moves.js";
import "./style.scss";

function isButton(node) {
  return node.tagName.toLowerCase() === "button";
}

var mainView = document.querySelector(".main-view");
mainView.addEventListener("click", function (event) {
  if (isButton(event.target)) console.log(event.target.innerText);
});

function createGame() {
  let playerPoints = 0;
  let computerPoints = 0;
  let tiePoints = 0;

  function getPoints() {
    console.log("Player Points:", playerPoints);
    console.log("Tied Points:", tiePoints);
    console.log("Computer Points:", computerPoints);
  }

  function inputMove(move) {
    let availableMoves = [new Scissors(), new Rock(), new Paper()];
    let computerMove = availableMoves[randomNumber(availableMoves.length - 1)];
    let gameResult = move.tryToBeat(computerMove);

    console.log("you did: ", move.name);
    console.log("computer did:", computerMove.name);
    switch (gameResult) {
      case true:
        console.log("you won");
        playerPoints += 1;
        break;
      case false:
        console.log("you lost");
        computerPoints += 1;
        break;
      case undefined:
        console.log("you tied");
        tiePoints += 1;
        break;
    }

    getPoints();
  }

  // return a number from 0 to number including 0 and number
  function randomNumber(number) {
    let randomNumber = Math.floor(Math.random() * (number + 1));
    return randomNumber;
  }

  return { inputMove };
}

global.game = createGame();
global.rock = new Rock();
global.paper = new Paper();
global.scissors = new Scissors();
