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
  normal: [
    createMove("Rock", ["Scissors"], ImageRock),
    createMove("Paper", ["Rock"], ImagePaper),
    createMove("Scissors", ["Paper"], ImageScissors),
  ],
  hard: [
    createMove("Paper", ["Rock", "Spock"], ImagePaper),
    createMove("Rock", ["Scissors", "Lizard"], ImageRock),
    createMove("Scissors", ["Paper", "Lizard"], ImageScissors),
    createMove("Spock", ["Rock", "Scissors"], ImageSpock),
    createMove("Lizard", ["Paper", "Spock"], ImageLizard),
  ],
};
