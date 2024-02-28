import "normalize.css";
import {} from "./basic.js";
import "./style.scss";

console.log("test");

function isButton(node) {
  return node.tagName.toLowerCase() === "button";
}

var mainView = document.querySelector(".main-view");
mainView.addEventListener("click", function (event) {
  if (isButton(event.target)) console.log(event.target.innerText);
});

window.createGame = function () {
  let moves = ["Rock", "Paper", "Scissors"];

  class Entity {
    constructor(name) {
      this.name = name;
    }
  }

  function inputPlayerMove(move) {
    checkWinner(move);
  }

  function inputComputerMove() {}

  function randomNumber(number) {
    let randomNumber = Math.floor(Math.random() * (number + 1));
    return randomNumber;
  }

  return { randomNumber };
};
