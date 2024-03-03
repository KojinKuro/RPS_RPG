// should be able to pass in it a dom selector it occurs on.
//

export class AlertManager {
  alerts = [];
  timerMilliseconds = 3000;

  constructor(domSelector) {
    this.parentElement = document.querySelector(domSelector);
    this.parentElement.style.position = "relative";

    this.parentElement.appendChild(this.createAlertsContainer());
    this.alertsContainer = document.querySelector(".alerts-container");
  }

  createAlertsContainer() {
    let alertsContainer = document.createElement("div");
    alertsContainer.classList.add("alerts-container");

    return alertsContainer;
  }

  sendAlert(text) {
    this.alerts.push(text);

    this.updateAlerts();
    setTimeout(() => {
      this.deleteOldestAlert();
      this.updateAlerts();
    }, this.timerMilliseconds);
  }

  updateAlerts() {
    this.alertsContainer.innerHTML = "";
    this.alerts.forEach((alertText) => {
      let alertBox = document.createElement("article");
      alertBox.classList.add("rpg-box");
      alertBox.innerText = alertText;

      this.alertsContainer.appendChild(alertBox);
    });
  }

  deleteOldestAlert() {
    this.alerts.shift();
  }

  setTimer(timerMilliseconds) {
    this.timerMilliseconds = timerMilliseconds;
  }
}
