import "normalize.css";
import { AlertManager } from "./javascript/alert.js";
import { Entity } from "./javascript/entity.js";
import { HealthManager } from "./javascript/health.js";
import { availableMoves, createVersus } from "./javascript/moves.js";
import { PointTracker } from "./javascript/points.js";
import { ViewManger } from "./javascript/views.js";
import "./style.scss";

// init function with private variables
(function () {
  const startObserver = new MutationObserver(() => {
    const entityButtons = document.querySelector(".entity-buttons");
    const entityDataNodes = document.querySelectorAll(".entity-data");
    const strategyContainer = document.querySelector(".strategy-container");
    const displayValue = ViewManger.getActiveView() === "start" ? "none" : "";

    entityButtons.style.display = displayValue;
    strategyContainer.style.display = displayValue;
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

export function createGameFactory() {
  const playerHealth = new HealthManager(".player-health");
  const computerHealth = new HealthManager(".computer-health");
  const player = new Entity(
    "Player",
    availableMoves[global.gameDifficulty],
    playerHealth
  );
  const computer = new Entity(
    "Computer",
    availableMoves[global.gameDifficulty],
    computerHealth
  );

  function runTurn() {
    createVersus(".battle-main", player, computer);
    global.dialogBox.toggleTitle();
    global.dialogBox.toggleContent();

    let winner = player.fight(computer);
    winner ? winner.onWin() : global.dialogBox.displayContent("Tied!");
    player.updateHealth();
    computer.updateHealth();

    setTimeout(() => {
      if (ViewManger.getActiveView() === "start") return;
      global.dialogBox.toggleTitle();
      global.dialogBox.displayMoves();
      document.querySelector(".battle-main").innerHTML = "";
    }, 1500);
  }

  function inputPlayerMove(moveID) {
    player.setMove(moveID);
    computer.setMove();
    runTurn();
  }

  return { inputPlayerMove };
}
