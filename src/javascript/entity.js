import { availableMoves } from "./moves.js";
import { randomNumber } from "./random.js";

export default class Entity {
  static MOVE_LIST = [
    availableMoves.normal.rock,
    availableMoves.normal.paper,
    availableMoves.normal.scissors,
  ];

  constructor(name, maxHealth = 10) {
    this.name = name;
    this.points = 0;

    this.maxHealth = maxHealth;
    this.currentHealth = this.maxHealth;
  }

  dealDamage(damage = 1) {
    if (this.currentHealth >= 0) return;

    this.currentHealth -= damage;
    if (this.currentHealth < 0) this.currentHealth = 0;
    return this.currentHealth;
  }

  heal(addHealth = 1) {
    if (this.currentHealth + addHealth > this.maxHealth) {
      this.currentHealth = this.maxHealth;
      return;
    }

    this.currentHealth += addHealth;
  }

  resetDamage() {}

  onWin() {
    console.log(`${this.name} won!`);
    this.addPoint();
  }

  addPoint() {
    this.points += 1;
  }

  setMove(move) {
    //TODO: add checking to see if it is a valid move or not. if not make it a random move.

    if (!arguments.length)
      this.move = Entity.MOVE_LIST[randomNumber(Entity.MOVE_LIST.length - 1)];
    else this.move = move;
  }

  fight(opponent) {
    if (this.move.name == opponent.move.name) return;
    for (let i = 0; i < this.move.beats.length; ++i)
      if (this.move.beats[i] == opponent.move.name) return this;
    return opponent;
  }
}
