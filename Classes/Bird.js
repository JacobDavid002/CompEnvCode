class Bird{
    constructor(x, y, r){
        this.body = Bodies.circle(x, y, r);
        World.add(world, this.body);
        this.r = r;

        this.velocity = createVector(0, 0); // Add a property to store the velocity
  
    }
    show(){
        const pos = this.body.position;
        const angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        noStroke();
        fill("#e35dda");
        rectMode(CENTER);
        circle(0, 0, this.r);
        pop();
    }

  update() {
    // Measure the velocity
    this.velocity.x = this.body.velocity.x;
    this.velocity.y = this.body.velocity.y;
  }
}
