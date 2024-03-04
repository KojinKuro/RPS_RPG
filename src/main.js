import "normalize.css";
import { AlertManager } from "./javascript/alert.js";
import Entity from "./javascript/entity.js";
import { HealthManager } from "./javascript/health.js";
import { availableMoves } from "./javascript/moves.js";
import { ViewManger } from "./javascript/views.js";
import "./style.scss";

global.ViewManager = ViewManger;
global.game = createGameFactory(availableMoves["normal"]);
global.playerHealth = new HealthManager(".player-health");
global.computerHealth = new HealthManager(".computer-health");

// init function
(function () {
  const startObserver = new MutationObserver(() => {
    const entityButtons = document.querySelector(".entity-buttons");
    const entityDataNodes = document.querySelectorAll(".entity-data");
    const displayValue = ViewManger.getActiveView() === "start" ? "none" : "";

    entityButtons.style.display = displayValue;
    entityDataNodes.forEach((node) => (node.style.display = displayValue));
  });

  startObserver.observe(document.querySelector("main"), {
    attributes: true,
    childList: true,
    subtree: true,
  });

  // handles all the buttons on all the pages
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("main-menu-button")) {
      ViewManger.setView("start");
    } else if (e.target.classList.contains("exit-button")) {
      window.close();
    } else if (e.target.classList.contains("start-normal-button")) {
      ViewManger.setView("battle-normal");
    } else if (e.target.classList.contains("start-hard-button")) {
      ViewManger.setView("battle-hard");
    }
  });
})();

export function createGameFactory(moves) {
  let alerts = new AlertManager();
  const playerEntity = new Entity("Player", moves);
  const tiedEntity = new Entity("Tied", moves);
  const computerEntity = new Entity("Computer", moves);
  const entityArray = [playerEntity, tiedEntity, computerEntity];

  function printPoints() {
    entityArray.forEach((entity) => {
      alerts.sendAlert(`${entity.name} Points: ${entity.points}`);
    });
  }

  function runRound() {
    alerts.sendAlert(`${playerEntity.name} did ${playerEntity.move.name}`);
    alerts.sendAlert(`${computerEntity.name} did ${computerEntity.move.name}`);

    let gameWinner = playerEntity.fight(computerEntity);
    gameWinner !== undefined ? gameWinner.onWin() : tiedEntity.onWin();
  }

  function inputPlayerMove(moveID) {
    playerEntity.setMove(moveID);
    computerEntity.setMove();
    runRound();
    printPoints();
  }

  return { inputPlayerMove };
}
