export const AlertManager = (function () {
  const alerts = [];
  let timerMilliseconds = 3000;
  let alertsContainer = createAlertsContainer();

  function attach(domSelector = ".main-view") {
    let parentElement = document.querySelector(domSelector);
    parentElement.style.position = "relative";
    parentElement.append(alertsContainer);
  }

  function createAlertsContainer() {
    let alertsContainer = document.createElement("div");
    alertsContainer.classList.add("alerts-container");
    return alertsContainer;
  }

  function sendAlert(text) {
    alerts.push(text);

    updateAlerts();
    setTimeout(() => {
      deleteOldestAlert();
      updateAlerts();
    }, timerMilliseconds);
  }

  function updateAlerts() {
    alertsContainer.innerHTML = "";
    alerts.forEach((alertText) => {
      let alertBox = document.createElement("article");
      alertBox.classList.add("rpg-box");
      alertBox.innerText = alertText;
      alertsContainer.appendChild(alertBox);
    });
  }

  function deleteOldestAlert() {
    alerts.shift();
  }

  function setTimer(newTimerMilliseconds) {
    timerMilliseconds = newTimerMilliseconds;
  }

  return { setTimer, sendAlert, attach };
})();
