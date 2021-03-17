function Ball(x, y, z, size) {

    var options = {
        friction: 0,
        density: 0.04,
        frictionAir: 0.005,
        restitution: 0.8 //bouncyness
    }
    this.body = ball = Bodies.circle(x - windowWidth/2, y - windowHeight/2, size, options);
    this.z = z;
    this.size = size;
    
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
        translate(pos.x,pos.y, z);
        rotateY(90);
        //texture(img);
        fill(0, 255, 255);
        sphere(size);
        pop();
    }
}