class Score {
  constructor() {
    this.score = 0;
  }

  add(val) {
    this.score += val;
  }

  remove(val) {
    this.score -= val;
  }

  reset() {
    this.score = 0;
  }

  set(val) {
    this.score = val;
  }

  get() {
    return this.score;
  }

  // This function draws the score to the canvas so if you want to style it
  // do it here
  draw() {
    // push();
    // strokeWeight(1);
    // textSize(20);
    // fill(255, 255, 255);
    // text(this.score, width - 140, 47);
    // // text(countdown, 260, 47);
    // pop();

  }
}
