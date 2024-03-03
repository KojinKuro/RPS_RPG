import ImageLizard from "../images/lizard.svg";
import ImagePaper from "../images/paper.svg";
import ImageRock from "../images/rock.svg";
import ImageScissors from "../images/scissors.svg";
import ImageSpock from "../images/spock.svg";
import ImageUnknown from "../images/unknown.svg";

function createMove(name = "Empty", beats = [], imageSource = ImageUnknown) {
  return { name, beats, imageSource };
}

export const availableMoves = {
  normal: {
    rock: createMove("Rock", ["Scissors"], ImageRock),
    paper: createMove("Paper", ["Rock"], ImagePaper),
    scissors: createMove("Scissors", ["Paper"], ImageScissors),
  },
  hard: {
    paper: createMove("Paper", ["Rock", "Spock"], ImagePaper),
    rock: createMove("Rock", ["Scissors", "Lizard"], ImageRock),
    scissors: createMove("Scissors", ["Paper", "Lizard"], ImageScissors),
    spock: createMove("Spock", ["Rock", "Scissors"], ImageSpock),
    lizard: createMove("Lizard", ["Paper", "Spock"], ImageLizard),
  },
};
