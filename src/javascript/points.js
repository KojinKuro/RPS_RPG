export const PointTracker = (function () {
  let highScore = 0;

  function setHighScore(score) {
    if (score > highScore) highScore = score;
  }

  function getHighScore() {
    return highScore;
  }

  return { setHighScore, getHighScore };
})();
