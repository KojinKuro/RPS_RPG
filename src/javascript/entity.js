import { randomNumber } from "./random.js";

export default class Entity {
  constructor(name, movesList, maxHealth = 10) {
    this.name = name;
    this.movesList = movesList;

    this.maxHealth = maxHealth;
    this.currentHealth = this.maxHealth;
  }

  damage(damage = 1) {
    if (this.currentHealth === 0) return;

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

  onWin() {
    console.log(`${this.name} won!`);
  }

  setMove(moveIndex) {
    if (!arguments.length) moveIndex = randomNumber(this.movesList.length - 1);
    moveIndex = Math.abs(moveIndex) % this.movesList.length;

    this.move = this.movesList[moveIndex];
  }

  fight(opponent) {
    if (this.move.name == opponent.move.name) return;
    for (let i = 0; i < this.move.beats.length; ++i) {
      if (this.move.beats[i] == opponent.move.name) {
        opponent.damage();
        return this;
      }
    }

    this.damage();
    return opponent;
  }
}
