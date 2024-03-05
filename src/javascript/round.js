export const Round = (function () {
  let round = 0;

  function getRound() {
    return round;
  }

  function increaseRound() {
    round += 1;
  }

  function reset() {
    round = 0;
  }

  return { getRound, increaseRound, reset };
})();
