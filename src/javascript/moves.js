class Move {
  constructor(name = "Empty Move Object", beats = []) {
    this.name = name;
    this.beats = beats;
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
