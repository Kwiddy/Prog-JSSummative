var stars = [];
var regen = false;
var sticked = false;
var bgcol = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  fill(bgcol,10);
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
	if (mouseIsPressed == false) {
		regen = true;
		stars.push(new star());
    stars[stars.length-1].start();
	}
}

function star() {
  this.start = function() {
		 if (regen == true) {
			 this.col = color(220,220,220);
   	   this.pos = new p5.Vector(randomint(windowWidth),windowHeight);
   		 this.velocity = new p5.Vector(0,5);
   		 this.size = random(2,10);
			 regen = false;
		 }
		 else {
     	 this.col = color(random(255),random(255),random(255));
   	   this.pos = new p5.Vector(mouseX,mouseY);
   		 this.velocity = new p5.Vector((mouseX-pmouseX)/5+random(-1,1),(mouseY-pmouseY)/5+random(-1,1));
   		 this.size = random(2,10);
			 regen = true;
			 stars.push(new star());
			 stars[stars.length-1].start();
		 }
	}

  this.update = function() {
    this.pos.x+=this.velocity.x;
    this.pos.y+=this.velocity.y;
		if (this.velocity.x != 0) {
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
					sticked = true;
				}
			}
		}
		else {
			if (sticked == true) {
				if (this.velocity.y != 0) {
					this.velocity.y = -3;
					bgcol += 0.0001;
				
					if (this.pos.y>windowHeight) {
						this.velocity.y = -2;
						this.pos.y = windowHeight;
						this.pos.x = randomint(windowWidth);
					}
				}
			}
		}
  }

  this.show = function() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x,this.pos.y,this.size,this.size);
  }
}

function randomint(max) {
		return Math.floor(Math.random() * Math.floor(max));
}
