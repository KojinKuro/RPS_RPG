import { AlertManager } from "./alert.js";
import { randomNumber } from "./random.js";

export class Entity {
  constructor(name, movesList, level, healthManager) {
    this.name = name;
    this.movesList = movesList;
    this.points = 0;

    this.level = level;
    this.maxHealth = this.level;
    this.currentHealth = this.maxHealth;
    this.healthManager = healthManager;
    this.updateHealth();
  }

  setLevel(level) {
    this.level = level;
    this.maxHealth = this.level;
  }

  addPoint(pointAdd = 1) {
    this.points += pointAdd;
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

    let damageAmount = 1;
    loser.damage(damageAmount);
    AlertManager.sendAlert(
      `${winner.name} deals ${damageAmount} damage to ${loser.name}`
    );
    if (!loser.currentHealth) return winner;
  }
}
