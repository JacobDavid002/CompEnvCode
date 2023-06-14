class Grab{
    constructor(x, y, body){
        const options = {
            pointA: {
                x: x,
                y: y
            },
            bodyB:body,
            stiffness: 0.2,
            length: 5
        }
        this.grab = Constraint.create(options);
        World.add(world,this.grab);
    }

    fly(){
        // console.log("release!");
        this.grab.bodyB = null;
    }

    show(){
        if (this.grab.bodyB){
       stroke(255);
       strokeWeight(3);
       const posA = this.grab.pointA;
       const posB = this.grab.bodyB.position;
       line(posA.x, posA.y, posB.x, posB.y);
        }
     }
     attach(body){
        this.grab.bodyB = body;
     }
}