import { availableMoves } from "./moves.js";
import { ViewManger } from "./views.js";

export class DialogBox {
  constructor(domSelector) {
    this.parentElement = document.querySelector(domSelector);
    this.parentElement.style.position = "relative";
    this.parentElement.innerHTML = "";

    this.dialogTitle = this.parentElement.querySelector(".dialog-title");
    if (!this.dialogTitle) this.dialogTitle = this.createDialogTitle();
    this.parentElement.appendChild(this.dialogTitle);

    this.dialogContent = this.parentElement.querySelector(".dialog-content");
    if (!this.dialogContent) this.dialogContent = this.createDialogContent();
    this.parentElement.appendChild(this.dialogContent);

    // adding event listener to track the move clicks
    this.parentElement.addEventListener("click", function (e) {
      let moveContainer = e.target.closest(".moves-container");
      if (moveContainer) game.inputPlayerMove(moveContainer.dataset.id);
      // remove this event listener if the view is start
      if (ViewManger.getActiveView() == "start")
        e.source.removeEventListener("click", arguments.callee);
    });
  }

  toggleDialogBox() {
    this.parentElement.classList.toggle("hidden");
  }

  toggleTitle() {
    this.dialogTitle.classList.toggle("hidden");
  }

  toggleContent() {
    this.dialogContent.classList.toggle("hidden");
  }

  displayTitle(text = "") {
    this.dialogTitle.innerHTML = "";
    this.dialogTitle.innerText = text;

    if (text === "") this.dialogTitle.classList.add("hidden");
    else this.dialogTitle.classList.remove("hidden");
  }

  displayContent(text) {
    this.dialogContent.innerHTML = "";
    this.dialogContent.innerText = text;

    if (text === "") this.dialogContent.classList.add("hidden");
    else this.dialogContent.classList.remove("hidden");
  }

  createDialogTitle() {
    let dialogTitle = document.createElement("div");
    dialogTitle.classList.add("dialog-title");
    dialogTitle.classList.add("rpg-box");
    dialogTitle.classList.add("hidden");
    return dialogTitle;
  }

  createDialogContent() {
    let dialogContent = document.createElement("div");
    dialogContent.classList.add("dialog-content");
    return dialogContent;
  }

  displayMoves() {
    let dialogContent = this.parentElement.querySelector(".dialog-content");
    if (!dialogContent) dialogContent = this.createDialogContent();
    dialogContent.innerHTML = "";
    availableMoves[global.gameDifficulty].forEach((move, index) => {
      dialogContent.appendChild(this.createMoveContainer(move, index));
    });
    this.dialogContent.classList.remove("hidden");
  }

  createMoveContainer(move, id = 0) {
    let movesContainer = document.createElement("div");
    movesContainer.classList.add("moves-container");
    movesContainer.dataset.id = id;
    movesContainer.innerHTML = `
    <img class="move rpg-box" src="${move.imageSource}" alt="${move.name}" />
    <div class="move-name">${move.name}</div>`;
    return movesContainer;
  }
}
