var stars = [];
var ashes = [];

var regen = false;
var stuck = false;
var bgcol = 0;
var txtcol = 220;
var myText = "Your Text Here";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  myText = document.getElementById('myText').value;
  if (myText == "") {
    myText = "Your Text Here"
  }
  if (bgcol > 220) {
    return;
  }
  fill(bgcol,10);
  rect(0,0,windowWidth,windowHeight);
  for (var i = 0;i<stars.length;i++) {
    stars[i].update();
    stars[i].show();
    if (stars[i].pos.y>windowHeight) {
      stars.splice(i,1);
    }
  }
  for (var i = 0;i<ashes.length;i++) {
    ashes[i].update();
    ashes[i].show();
    if (ashes[i].pos.y>windowHeight) {
      ashes.splice(i,1);
    }
  }
  if (mouseIsPressed == true) {
    stars.push(new Star());
    stars[stars.length-1].start();
  }
	if (mouseIsPressed == false) {
		regen = true;
		stars.push(new Star());
    stars[stars.length-1].start();
	}
}

function Star() {
  this.start = function() {
		 if (regen == true) {
			 if (bgcol > 50) {
			 	textSize(120);
				textAlign("center");
			 	fill(txtcol);

			 	text(myText,(windowWidth/2),270);
				txtcol -= 0.1;
			 }

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
			 stars.push(new Star());
			 stars[stars.length-1].start();
		 }
	}

  this.update = function() {
    this.pos.x+=this.velocity.x;
    this.pos.y+=this.velocity.y;
		if (this.velocity.x == 0) {
			if (bgcol < 200 ){
			if (this.velocity.y == -2) {
				this.size -= 0.5;
			}
			}
			else {
				if (this.velocity.y == -2) {
					this.size -= 5;
				}
			}
		}
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
					this.size = random(20,25)
					stuck = true;
          ashes.push(new Ash());
          ashes[ashes.length-1].start();
				}
			}
		}
		else {
			if (stuck == true) {
				if (this.velocity.y != 0) {
					this.velocity.y = -2;
					if (bgcol < 220) {
						bgcol += 0.0002;
					}

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

function Ash() {
  var a = 254
  var b = 27
  var c = 7
  this.start = function() {
    /*ADD RANDOM BLACK OR RED ASH? */
    this.col = color(a,b,c);
    this.pos = new p5.Vector(random(0, windowWidth),windowHeight);
    this.size = 5;
  }
  this.update = function() {
    ranint = random(0,180)
    if (this.pos.y > (windowHeight - ranint)) {
      this.pos.y -= 2.7;
      a -= 1;
      b += 5;
      c += 5;
      this.col = color(a,b,c);
      this.size -= 0.25;
    }
  }
  this.show = function() {
    if (this.pos.y > (windowHeight - 100)) {
      noStroke();
      fill(this.col);
      ellipse(this.pos.x,this.pos.y,this.size,this.size);
  }
  }
}

function randomint(max) {
		return Math.floor(Math.random() * Math.floor(max));
}
