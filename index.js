var stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
} 

function draw() {
  fill(0,10);
  rect(0,0,windowWidth,windowHeight);
  for (var i = 0;i<stars.length;i++) {
    stars[i].update();
    stars[i].show();
    if (stars[i].pos.y>windowHeight) {
      stars.splice(i,1);
    }
  }
  if (mouseIsPressed == true) {
    stars.push(new star());
    stars[stars.length-1].start();
  }
}

function star() {
  this.start = function() {
     this.col = color(random(255),random(255),random(255));
   	 this.pos = new p5.Vector(mouseX,mouseY);
   	 this.velocity = new p5.Vector((mouseX-pmouseX)/5+random(-1,1),(mouseY-pmouseY)/5+random(-1,1));
   	 this.size = random(2,10);
	}
  
  this.update = function() {
    this.pos.x+=this.velocity.x;
    this.pos.y+=this.velocity.y;
    this.velocity.y+=0.05;
    if (this.pos.x<0) {
      this.pos.x = 0;
      this.velocity.x=this.velocity.x*-1;
    }
    if (this.pos.x>windowWidth) {
      this.pos.x = windowWidth;
      this.velocity.x=this.velocity.x*-1;
    }
		if (this.pos.y>windowHeight) {
			if (this.velocity.y > 2) {
				this.pos.y = height;
				this.velocity.y = this.velocity.y * -0.5;
			}
		else {
			this.velocity.y = 0;
			this.velocity.x = 0;
			this.pos.y = height;
			this.size = 25;
		}
		}
  }
  
  this.show = function() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x,this.pos.y,this.size,this.size);
  }
}
