import ImageLizard from "../images/lizard.svg";
import ImagePaper from "../images/paper.svg";
import ImageRock from "../images/rock.svg";
import ImageScissors from "../images/scissors.svg";
import ImageSpock from "../images/spock.svg";
import ImageUnknown from "../images/unknown.svg";

export const availableMoves = {
  normal: [
    createMove("Rock", ["Scissors"], ImageRock),
    createMove("Paper", ["Rock"], ImagePaper),
    createMove("Scissors", ["Paper"], ImageScissors),
  ],
  hard: [
    createMove("Paper", ["Rock", "Spock"], ImagePaper),
    createMove("Rock", ["Scissors", "Lizard"], ImageRock),
    createMove("Scissors", ["Paper", "Lizard"], ImageScissors),
    createMove("Spock", ["Rock", "Scissors"], ImageSpock),
    createMove("Lizard", ["Paper", "Spock"], ImageLizard),
  ],
};

function createMove(name = "Empty", beats = [], imageSource = ImageUnknown) {
  return { name, beats, imageSource };
}

// === CODE TO PUT MOVES INTO DOM ===
// probably move this somewhere else
export function appendMoves(domSelector, movesArray) {
  let parentNode = document.querySelector(domSelector);
  movesArray.forEach((move, index) => {
    parentNode.appendChild(createMovesContainer(move, index));
  });

  parentNode.addEventListener("click", function (e) {
    let moveContainer = e.target.closest(".moves-container");
    if (moveContainer) game.inputPlayerMove(moveContainer.dataset.id);
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

export function appendStrategy(domSelector, moves) {
  let parentNode = document.querySelector(domSelector);
  parentNode.innerHTML = "";
  moves.forEach((move) => parentNode.appendChild(createStrategyDiv(move)));
}

function createStrategyDiv(move) {
  let strategyDiv = document.createElement("div");
  strategyDiv.classList.add("strategy");
  strategyDiv.innerHTML = `
  <h1>${move.name}</h1>
  <p>Beats: ${move.beats}</p>`;

  return strategyDiv;
}
