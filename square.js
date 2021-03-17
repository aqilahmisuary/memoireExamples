function Square(x, y, w, h) {

    var options = {
        friction: 0,
        density: 0.04,
        frictionAir: 0.005,
        restitution: 0.8 //bouncyness
    }
    this.body = square = Bodies.rectangle(x - windowWidth/2, y - windowHeight/2, w, h, options);
    
    World.add(world, this.body);

    this.isOffScreen = function() {
        var pos = this.body.position;
        return (pos.y > windowHeight);
    }

    this.removeFromWorld = function() {
        World.remove(world, this.body);
    }

    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x,pos.y);
        rotateY(90);
        fill(255, 105, 180);
        box(w,h);
        pop();
    }
}