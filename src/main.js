import "normalize.css";
import Entity from "./entity.js";
import { Paper, Rock, Scissors } from "./moves.js";
import "./style.scss";

global.game = createGameFactory();
global.rock = new Rock();
global.paper = new Paper();
global.scissors = new Scissors();
var mainView = document.querySelector(".main-view");

mainView.addEventListener("click", function (event) {
  if (isButton(event.target)) console.log(event.target.innerText);
});

function isButton(node) {
  return node.tagName.toLowerCase() === "button";
}

function createGameFactory() {
  const playerEntity = new Entity("Player");
  const tiedEntity = new Entity("Tied");
  const computerEntity = new Entity("Computer");

  const entityArray = [playerEntity, tiedEntity, computerEntity];

  function printPoints() {
    entityArray.forEach((entity) => {
      console.log(`${entity.name} Points: ${entity.points}`);
    });
  }

  function runRound() {
    console.log(`${playerEntity.name} did ${playerEntity.move.name}`);
    console.log(`${computerEntity.name} did ${computerEntity.move.name}`);

    let gameWinner = playerEntity.fight(computerEntity);
    gameWinner !== undefined ? gameWinner.onWin() : tiedEntity.onWin();
  }

  function inputPlayerMove(move) {
    playerEntity.setMove(move);
    computerEntity.setMove();
    runRound();
    printPoints();
  }

  return { inputPlayerMove };
}
