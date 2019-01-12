//Generating smoke particles
class Smoke {
  //Creation of particles
  constructor() {
    //Displaying text over the smoke if smokey enough
    if (bgcol > 50) {
      textSize(120);
      textAlign("center");
      fill(txtcol);

      text(fullName.firstName + " " + fullName.surname, (windowWidth / 2), 270);
      txtcol -= 0.1;
    }
    //creating particles based off slider inputs
    this.col = color(rval, gval, bval);
    this.pos = new p5.Vector(randomint(windowWidth), windowHeight);
    this.velocity = new p5.Vector(0, 5);
    this.size = random(2, 10);
  }
  //Updating the position and size of the particles
  move() {
    this.pos.y -= 2.7;
    if (bgcol < 200) {
      this.size -= 0.5;
    } else {
      this.size -= 5;
    }
  }
  //Displaying the particles
  show() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
