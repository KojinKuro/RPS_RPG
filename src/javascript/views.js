import "../views.scss";

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
      `<div>
        <h1>Rock Paper Scissors RPG</h1>
        <h2>The game that no one asked for</h2>
      </div>
      <section class="button-container rpg-box">
        <button class="start-normal-button">Normal Mode</button>
        <button class="start-hard-button">Hard Mode</button>
        <button class="exit-button">Exit</button>
      </section>`
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

let battleView = new View(
  "battle",
  `<div class="something"></div>
  <div class="battle-box rpg-box">
    <div class="battle-header rpg-box">Some text</div>
  </div>`
);

ViewManger.addView(battleView);

// var startButton = document.querySelector(".start-button");
// var battleButton = document.querySelector(".battle-button");
// var dialogButton = document.querySelector(".dialog-button");
// var winButton = document.querySelector(".win-button");
// var loseButton = document.querySelector(".lose-button");

// startButton.addEventListener("click", () => ViewManger.setView("start"));
// battleButton.addEventListener("click", () => ViewManger.setView("battle"));
