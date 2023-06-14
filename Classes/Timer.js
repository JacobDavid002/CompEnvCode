class Timer {
  constructor() {
    this.paused = true;
    this.started = false;
    this.time;
    this.timeLoop;
  }
  start() {
    // Makes sure that timer is only started once, as it's started from
    // the draw loop without this i would keep starting over and over
    if (!this.started) {
      this.started = true;
      this.time = 0;
      this.paused = false;
      console.log('Timer started');
      // setInterval will run a function every x amount of milliseconds
      // I've saved the setInterval into a variable to allow it to be
      // stopped at the end of the game, saving compute
      this.timeLoop = setInterval(() => {
        if (!this.paused) {
          this.time += 0.01;
        }
        // 10 here is the number of milliseconds before it runs again
      }, 10);
    }
  }

  restart() {
    this.started = false;
    this.start();
  }

  paused() {
    this.paused = true;
  }

  play() {
    this.paused = false;
  }

  stop() {
    this.paused = true;
    clearInterval(this.timeLoop);
  }

  get() {
    return this.time;
  }

  // This function draws the timer to the canvas so if you want to style it
  // do it here
  draw() {
    // push();
    // strokeWeight(1);
    // textSize(50);
    // fill(255);
    // text(this.time.toFixed(2), 100, 100);
    // pop();
  }
}
