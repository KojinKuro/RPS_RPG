import { randomNumber } from "./random.js";

export default class Entity {
  constructor(name, movesList, maxHealth = 10) {
    this.name = name;
    this.movesList = movesList;
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

  setMove(moveIndex) {
    if (!arguments.length) moveIndex = randomNumber(this.movesList.length - 1);
    moveIndex = Math.abs(moveIndex) % this.movesList.length;

    this.move = this.movesList[moveIndex];
  }

  fight(opponent) {
    if (this.move.name == opponent.move.name) return;
    for (let i = 0; i < this.move.beats.length; ++i)
      if (this.move.beats[i] == opponent.move.name) return this;
    return opponent;
  }
}
