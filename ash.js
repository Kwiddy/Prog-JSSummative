//Generating Ash Particles
class Ash {

  //Creating the particles
  constructor() {
    this.col = color(a, b, c);
    this.pos = new p5.Vector(random(0, windowWidth), windowHeight);
    this.size = 5;
  }

  //Updating the position of the particles
  move() {
    this.pos.y -= 2.7;
    //Updating the colour of the particles
    a -= 1;
    b += 15;
    c += 15;
    this.col = color(a, b, c);
    this.size -= 0.25;
  }

  //Displaying the particles on the canvas
  show() {
    //Allowing particles to travel to random and not uniform heights on the canvas
    ranint = random(50, 100);
    if (this.pos.y > (windowHeight - ranint)) {
      noStroke();
      fill(this.col);
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
  }
}
