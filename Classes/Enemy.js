let ease = 0.01;
class Enemy {
  constructor(x, y, w, h, xoff, Ransway, Armjoint, Armjoint2, Ranimage, ArmjointSpawn) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // this.body = Bodies.circle(x, y, r);
    // World.add(world, this.body);
    this.xoff = xoff;

    this.Ransway = Ransway;

    this.Armjoint = Armjoint;
    this.Armjoint2 = Armjoint2;

    this.Ranimage = Ranimage;

    this.ArmjointSpawn = ArmjointSpawn;
  }
  show() {
    // const pos = this.body.position;
    // const angle = this.body.angle;

    this.Ransway = (noise(this.xoff) * width) / 10;
    this.xoff = this.xoff + 0.01;
    // console.log(this.Ransway)

    
    push();
    strokeWeight(7);
    stroke(26, 26, 26);
    this.Armjoint = lerp(this.Armjoint, this.x + this.Ransway, ease);
    this.Armjoint2 = lerp(this.Armjoint2, this.Armjoint, ease);
    setLineDash([5, 5]);
    console.log();
     line(this.Armjoint, this.y/2, this.Ransway + this.x, this.y);
     line(this.Armjoint2 , this.ArmjointSpawn , this.Armjoint, this.y/2);
     pop();

     push();
     noStroke();
     fill(26, 26, 26);
     ellipse(this.Armjoint,  this.y/2, 20, 20);

     translate(0, 0);
     ellipse(this.Ransway+ this.x,  this.y, 20, 20);
     pop();
     
    push();
     translate(this.x, this.y+23);
    // rotate(angle);
    fill('#eb4034');
    // rectMode(CENTER);
    // rect(this.Ransway, 0, this.w, this.h);
    imageMode(CENTER);
    image(this.Ranimage, this.Ransway, 0, this.w, this.h);
    pop();
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}
