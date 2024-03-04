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
  }

  toggleDialogBox() {
    this.parentElement.classList.toggle("hidden");
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

  displayMoves(movesArray) {
    let dialogContent = this.parentElement.querySelector(".dialog-content");
    if (!dialogContent) dialogContent = this.createDialogContent();
    dialogContent.innerHTML = "";
    movesArray.forEach((move, index) => {
      dialogContent.appendChild(this.createMoveContainer(move, index));
    });

    // adding event listener to track the move clicks
    this.parentElement.addEventListener("click", function (e) {
      let moveContainer = e.target.closest(".moves-container");
      if (moveContainer) game.inputPlayerMove(moveContainer.dataset.id);
    });
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
