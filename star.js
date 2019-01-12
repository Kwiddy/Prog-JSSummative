//Generating star particles
class Star {
  //Creating the particles
  constructor() {
    this.col = color(random(255), random(255), random(255));
    this.pos = new p5.Vector(mouseX, mouseY);
    this.velocity = new p5.Vector((mouseX - pmouseX) / 5 + random(-1, 1), (mouseY - pmouseY) / 5 + random(-1, 1));
    this.size = random(2, 10);
  }

  //Updating the particles position
  move() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    if (this.velocity.x != 0) {
      this.velocity.y += 0.05;
      if (this.pos.x < 0) {
        this.pos.x = 0;
        this.velocity.x = this.velocity.x * -1;
      }
      if (this.pos.x > windowWidth) {
        this.pos.x = windowWidth;
        this.velocity.x = this.velocity.x * -1;
      }
      if (this.pos.y > windowHeight) {
        if (this.velocity.y > 2) {
          this.pos.y = height;
          this.velocity.y = this.velocity.y * -0.5;
        } else {
          this.velocity.y = 0;
          this.velocity.x = 0;
          this.pos.y = height;
          this.size = random(20, 25)
          stuck = true;
          if (bgcol < 220) {
            bgcol += 0.2;
          }
        }
      }
    } else {
      if (stuck == true) {
        if (this.velocity.y != 0) {
          this.velocity.y = -2;
          if (bgcol < 220) {
            bgcol += 0.02;
          }

          if (this.pos.y > windowHeight) {
            this.velocity.y = -2;
            this.pos.y = windowHeight;
            this.pos.x = randomint(windowWidth);
          }
        }
      }
    }
  }

  //Displaying the particles on the canvas
  show() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
