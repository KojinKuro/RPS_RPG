import "normalize.css";
import { AlertManager } from "./javascript/alert.js";
import Entity from "./javascript/entity.js";
import { HealthManager } from "./javascript/health.js";
import { availableMoves } from "./javascript/moves.js";
import { View, ViewManger } from "./javascript/views.js";
import "./style.scss";

global.game = createGameFactory();
global.rock = availableMoves.normal.rock;
global.paper = availableMoves.normal.paper;
global.scissors = availableMoves.normal.scissors;
global.availableMoves = availableMoves;

global.alertSystem = new AlertManager(".something");
global.healthSystem = new HealthManager(".player-health");

// init function
(function () {
  // ViewManger.start();
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
