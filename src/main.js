import "normalize.css";
import { AlertManager } from "./javascript/alert.js";
import { Entity } from "./javascript/entity.js";
import { HealthManager } from "./javascript/health.js";
import { ViewManger } from "./javascript/views.js";
import "./style.scss";

// init function with private variables
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

export function createGameFactory(moves, level) {
  const playerHealth = new HealthManager(".player-health");
  const computerHealth = new HealthManager(".computer-health");
  const player = new Entity("Player", moves, level, playerHealth);
  const computer = new Entity("Computer", moves, level, computerHealth);

  function nextRound() {
    player.levelUp();
    computer.levelUp();
  }

  function runTurn() {
    AlertManager.sendAlert(`${player.name} did ${player.move.name}`);
    AlertManager.sendAlert(`${computer.name} did ${computer.move.name}`);

    let gameWinner = player.fight(computer);
    if (gameWinner) gameWinner.onWin();
  }

  function inputPlayerMove(moveID) {
    player.setMove(moveID);
    computer.setMove();
    runTurn();
  }

  return { inputPlayerMove };
}
