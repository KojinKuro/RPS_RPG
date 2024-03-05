import cursorImage from "../images/cursor.webp";
import { createGameFactory } from "../main.js";
import "../views.scss";
import { AlertManager } from "./alert.js";
import { DialogBox } from "./dialog.js";
import { appendStrategy } from "./moves.js";
import { PointTracker } from "./points.js";

class View {
  static main = document.querySelector(".main-view");

  constructor(id, innerHTML, callback = () => {}) {
    this.id = id;
    this.innerHTML = innerHTML;
    this.callback = callback;
  }

  activateView() {
    View.main.id = this.id;
    View.main.innerHTML = this.innerHTML;
    this.callback();
  }
}

export const ViewManger = (function () {
  let viewChart = {
    start: new View(
      "start",
      `<section class='title'>
        <h1>Rock Paper Scissors RPG</h1>
        <h2>The game that no one asked for</h2>
      </section>
      <section class="button-container rpg-box">
        <div class="cursor-container start-normal-button">
          <img class="cursor" src="${cursorImage}" alt="Cursor" />
          Normal Mode
        </div>
        <div class="cursor-container start-hard-button">
          <img class="cursor" src="${cursorImage}" alt="Cursor" />
          Hard Mode
        </div>
        <div class="cursor-container exit-button">
          <img class="cursor" src="${cursorImage}" alt="Cursor" />
          Exit
        </div>
      </section>`,
      () => {
        document.querySelector(".strategy-container").innerHTML = "";

        var title = document.querySelector(".title");
        var scoreDiv = document.createElement("div");
        scoreDiv.innerText = `High Score: Round ${PointTracker.getHighScore()}`;
        if (PointTracker.getHighScore()) title.appendChild(scoreDiv);
      }
    ),
  };

  viewChart["start"].activateView();
  let activeView = viewChart["start"].id;

  const getActiveView = () => activeView;

  function addView(view) {
    viewChart[view.id] = view;
  }

  function setView(viewID = "start") {
    viewChart[viewID].activateView();
    activeView = viewChart[viewID].id;
  }

  return { addView, setView, getActiveView };
})();

let battleNormalView = new View(
  "battle-normal",
  `<div class="battle-main"></div>
  <div class="dialog-box rpg-box">
    <div class="dialog-title rpg-box">Chose a move</div>
  </div>`,
  () => {
    global.gameDifficulty = "normal";
    global.game = createGameFactory();

    global.dialogBox = new DialogBox(".dialog-box");
    dialogBox.displayMoves();
    appendStrategy(".strategy-container");
    AlertManager.attach();
  }
);

let battleHardView = new View("battle-hard", battleNormalView.innerHTML, () => {
  global.gameDifficulty = "hard";
  global.game = createGameFactory();

  global.dialogBox = new DialogBox(".dialog-box");
  dialogBox.displayMoves();
  appendStrategy(".strategy-container");
  AlertManager.attach();
});

ViewManger.addView(battleNormalView);
ViewManger.addView(battleHardView);
