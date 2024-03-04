import { createGameFactory } from "../main.js";
import "../views.scss";
import { appendMoves, appendStrategy, availableMoves } from "./moves.js";

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
      `<section>
        <h1>Rock Paper Scissors RPG</h1>
        <h2>The game that no one asked for</h2>
      </section>
      <section class="button-container rpg-box">
        <button class="start-normal-button">Normal Mode</button>
        <button class="start-hard-button">Hard Mode</button>
        <button class="exit-button">Exit</button>
      </section>`,
      () => {
        document.querySelector(".strategy-container").innerHTML = "";
      }
    ),
  };

  viewChart["start"].activateView();
  let activeView = viewChart["start"].id;

  const getActiveView = () => activeView;

  function addView(view) {
    viewChart[view.id] = view;

    console.log(view.id);
    console.log(viewChart);
    console.log(view);
  }

  function setView(viewID) {
    viewChart[viewID].activateView();
    activeView = viewChart[viewID].id;
  }

  return { start, addView, setView, getActiveView };
})();

let battleNormalView = new View(
  "battle-normal",
  `<div class="something"></div>
  <div class="battle-box rpg-box">
    <div class="battle-header rpg-box">Chose a move</div>
  </div>`,
  () => {
    global.game = createGameFactory(availableMoves.normal);
    appendMoves(".battle-box", availableMoves.normal);
    appendStrategy(".strategy-container", availableMoves.normal);
  }
);

let battleHardView = new View("battle-hard", battleNormalView.innerHTML, () => {
  global.game = createGameFactory(availableMoves.hard);
  appendMoves(".battle-box", availableMoves.hard);
  appendStrategy(".strategy-container", availableMoves.hard);
});

ViewManger.addView(battleNormalView);
ViewManger.addView(battleHardView);
