class Move {
  constructor(name = "Empty Move Object", beats = []) {
    this.name = name;
    this.beats = beats;
  }

  tryToBeat(moveObject) {
    if (moveObject.name == this.name) return;

    let result = false;
    this.beats.forEach((loserName) => {
      if (moveObject.name == loserName) result = true;
    });
    return result;
  }
}

export class Rock extends Move {
  constructor() {
    super("Rock", ["Scissors"]);
  }
}

export class Paper extends Move {
  constructor() {
    super("Paper", ["Rock"]);
  }
}

export class Scissors extends Move {
  constructor() {
    super("Scissors", ["Paper"]);
  }
}
