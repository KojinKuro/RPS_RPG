import "normalize.css";
import Entity from "./javascript/entity.js";
import { Paper, Rock, Scissors } from "./javascript/moves.js";
import { View, ViewManger } from "./javascript/views.js";
import "./style.scss";

global.game = createGameFactory();
global.rock = new Rock();
global.paper = new Paper();
global.scissors = new Scissors();

// init function
(function () {
  ViewManger.start();
})();

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
