import { randomNumber } from "./random.js";
import { Round } from "./round.js";

export class Entity {
  constructor(name, movesList, healthManager) {
    this.name = name;
    this.movesList = movesList;
    this.points = 0;

    this.healthManager = healthManager;
    this.updateHealth();
  }

  addPoint(pointAdd = 1) {
    this.points += pointAdd;
  }

  updateHealth() {
    this.healthManager.setHealth(this.points, Round.getRound());
  }

  onWin() {
    global.dialogBox.displayContent(`${this.name} won!`);
    Round.increaseRound();
    this.addPoint();
  }

  setMove(moveIndex) {
    if (!arguments.length) moveIndex = randomNumber(this.movesList.length - 1);
    moveIndex = Math.abs(moveIndex) % this.movesList.length;
    this.move = this.movesList[moveIndex];
  }

  fight(opponent) {
    if (this.move.name == opponent.move.name) return;

    let loser = this;
    let winner = opponent;

    this.move.beats.forEach((move) => {
      if (move == opponent.move.name) {
        loser = opponent;
        winner = this;
      }
    });

    return winner;
  }
}
