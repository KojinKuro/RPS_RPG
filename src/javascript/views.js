import cursorImage from "../images/cursor.webp";
import { createGameFactory } from "../main.js";
import "../views.scss";
import { AlertManager } from "./alert.js";
import { DialogBox } from "./dialog.js";
import { appendStrategy } from "./moves.js";
import { Round } from "./round.js";

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
        Round.reset();
        document.querySelectorAll(".entity-view").forEach((view) => {
          view.classList.remove("rpg-box");
        });
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
  <div class="dialog-box rpg-box"></div>`,
  () => {
    global.gameDifficulty = "normal";
    global.game = createGameFactory();
    global.dialogBox = new DialogBox(".dialog-box");
    dialogBox.displayContent(
      "You are going to begin playing Rock, Paper, Scissors.\nTry your best and see how many points you can rack up!\nThe game will begin soon."
    );
    setTimeout(() => {
      dialogBox.displayTitle("Chose a move");
      dialogBox.displayMoves();
    }, 5000);

    appendStrategy(".strategy-container");
    AlertManager.attach();

    document.querySelectorAll(".entity-view").forEach((view) => {
      view.classList.add("rpg-box");
    });
  }
);

let battleHardView = new View("battle-hard", battleNormalView.innerHTML, () => {
  global.gameDifficulty = "hard";
  global.game = createGameFactory();
  global.dialogBox = new DialogBox(".dialog-box");
  dialogBox.displayContent(
    "You are going to begin playing Rock, Paper, Scissors, Lizard, Spock.\nTry your best and see how many points you can rack up!\nThe game will begin soon."
  );
  setTimeout(() => {
    dialogBox.displayTitle("Chose a move");
    dialogBox.displayMoves();
  }, 5000);

  appendStrategy(".strategy-container");
  AlertManager.attach();

  document.querySelectorAll(".entity-view").forEach((view) => {
    view.classList.add("rpg-box");
  });
});

ViewManger.addView(battleNormalView);
ViewManger.addView(battleHardView);
