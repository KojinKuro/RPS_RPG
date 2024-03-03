import "normalize.css";
import { AlertManager } from "./javascript/alert.js";
import Entity from "./javascript/entity.js";
import { HealthManager } from "./javascript/health.js";
import { availableMoves } from "./javascript/moves.js";
import { ViewManger } from "./javascript/views.js";
import "./style.scss";

global.ViewManager = ViewManger;
global.game = createGameFactory(availableMoves["normal"]);
global.rock = availableMoves.normal.rock;
global.paper = availableMoves.normal.paper;
global.scissors = availableMoves.normal.scissors;
global.availableMoves = availableMoves;

global.healthSystem = new HealthManager(".player-health");

const movesDisplay = (function () {
  // sends the moves to parentDOMSelector
  function display(domSelector, movesArray) {
    let parentNode = document.querySelector(domSelector);
    movesArray.forEach((move, index) => {
      parentNode.appendChild(createMovesContainer(move, index));
    });

    // takes input of the moves
    parentNode.addEventListener("click", function (e) {
      let moveContainer = e.target.closest(".moves-container");
      if (moveContainer) {
        game.inputPlayerMove(moveContainer.dataset.id);
      }
    });
  }

  function createMovesContainer(move, id) {
    let movesContainer = document.createElement("div");
    movesContainer.classList.add("moves-container");
    movesContainer.dataset.id = id;
    movesContainer.innerHTML = `
    <img class="move rpg-box" src="${move.imageSource}" alt="${move.name}" />
    <div class="move-name">${move.name}</div>`;

    return movesContainer;
  }

  return { display };
})();

// init function
(function () {
  const mainContentObserver = new MutationObserver(() => {
    const entityButtons = document.querySelector(".entity-buttons");
    const displayValue = ViewManger.getActiveView() === "start" ? "none" : "";
    entityButtons.style.display = displayValue;
  });
  mainContentObserver.observe(document.querySelector("main"), {
    attributes: true,
    childList: true,
    subtree: true,
  });

  // handles all the buttons on all the pages
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("main-menu-button")) {
      // button for going back to the start page
      ViewManger.setView("start");
    } else if (e.target.classList.contains("exit-button")) {
      // button for exiting game
      window.close();
    } else if (e.target.classList.contains("start-normal-button")) {
      // button for starting normal mode
      ViewManger.setView("battle");
      global.game = createGameFactory(availableMoves["normal"]);
      movesDisplay.display(".battle-box", availableMoves["normal"]);
    } else if (e.target.classList.contains("start-hard-button")) {
      // button for starting hard mode
      ViewManger.setView("battle");
      global.game = createGameFactory(availableMoves["hard"]);
      movesDisplay.display(".battle-box", availableMoves["hard"]);
    }
  });
})();

function createGameFactory(moves) {
  const movesArray = moves;
  let alerts = new AlertManager();

  const playerEntity = new Entity("Player", movesArray);
  const tiedEntity = new Entity("Tied", movesArray);
  const computerEntity = new Entity("Computer", movesArray);
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
