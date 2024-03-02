import "../views.scss";

export class View {
  static main = document.querySelector(".main-view");

  constructor(id, innerHTML) {
    console.log(id);
    this.id = id;
    console.log(this.id);
    this.innerHTML = innerHTML;
  }

  activateView() {
    View.main.id = this.id;
    View.main.innerHTML = this.innerHTML;
  }
}

export const ViewManger = (function () {
  // start, battle, dialog, win, lose
  let startView = new View(
    "start",
    `<div>
      <h1>Rock Paper Scissors RPG</h1>
      <h2>The game that no one asked for</h2>
    </div>
    <section class="button-container rpg-box">
      <button>Start</button>
      <button>Continue</button>
      <button>Settings</button>
      <button onclick="window.close()">Exit</button>
    </section>`
  );

  let battleView = new View(
    "battle",
    `<div class="rpg-box">Opponent</div>
    <div></div>
    <div class="moves-container rpg-box">
      <img class="move rpg-box" src="./images/rock.svg" alt="Rock" />
      <img class="move rpg-box" src="./images/paper.svg" alt="Paper" />
      <img class="move rpg-box" src="./images/scissors.svg" alt="Scissors" />
    </div>`
  );

  let viewChart = {
    start: startView,
    battle: battleView,
  };

  function start() {
    viewChart["start"].activateView();
  }

  function addView(view) {
    viewChart[view.id] = view;
  }

  function setView(viewID) {
    viewChart[viewID].activateView();
  }

  return { start, addView, setView };
})();

// var startButton = document.querySelector(".start-button");
// var battleButton = document.querySelector(".battle-button");
// var dialogButton = document.querySelector(".dialog-button");
// var winButton = document.querySelector(".win-button");
// var loseButton = document.querySelector(".lose-button");

// startButton.addEventListener("click", () => ViewManger.setView("start"));
// battleButton.addEventListener("click", () => ViewManger.setView("battle"));
