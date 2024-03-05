export class HealthManager {
  constructor(domSelector) {
    this.parentElement = document.querySelector(domSelector);
  }

  setHealth(currentHealth, maxHealth) {
    this.parentElement.innerHTML = "";

    let healthName = document.createElement("div");
    healthName.innerText = "Points";

    let healthBarContainer = document.createElement("div");
    healthBarContainer.classList.add("health-bar-container");
    healthBarContainer.innerHTML = `
      <div style="width:${
        (currentHealth / maxHealth) * 100
      }%" class="health-bar"></div>
      <div class="health-number">${currentHealth}/${maxHealth}</div>`;

    this.parentElement.append(healthName);
    this.parentElement.append(healthBarContainer);
  }
}
