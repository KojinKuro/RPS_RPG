import { AlertManager } from "./alert.js";
import { randomNumber } from "./random.js";

export default class Entity {
  constructor(name, movesList, level, healthManager) {
    this.name = name;
    this.movesList = movesList;

    this.level = level;
    this.maxHealth = this.level;
    this.currentHealth = this.maxHealth;
    this.healthManager = healthManager;
    this.updateHealth();
  }

  setLevel(level) {
    this.level = level;
    this.maxHealth = this.level;
    this.heal(this.maxHealth);
    this.updateHealth();
  }

  damage(damage = 1) {
    this.currentHealth -= damage;
    if (this.currentHealth < 0) this.currentHealth = 0;
    this.updateHealth();
  }

  updateHealth() {
    this.healthManager.setHealth(this.currentHealth, this.maxHealth);
  }

  heal(addHealth = 1) {
    if (this.currentHealth + addHealth > this.maxHealth)
      this.currentHealth = this.maxHealth;
    else this.currentHealth += addHealth;
    this.updateHealth();
  }

  onWin() {
    AlertManager.sendAlert(`${this.name} won!`);
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
