var stars = [];
var ashes = [];
var smokes = [];

var stuck = false;
var bgcol = 0;
var txtcol = 220;

var firstName = "Bruce";
var surname = "Wayne";
var fullName = "";

var ranint = random(50, 100);

var rval = 220;
var gval = 220;
var bval = 220;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  firstName = document.getElementById('firstName').value,
  surname = document.getElementById('surname').value,

  fullName = {
    firstName : document.getElementById('firstName').value,
    surname : document.getElementById('surname').value,
    verifyFirst : function (firstName) {
      var reg = new RegExp(/\d+/);
      if (reg.test(firstName)) {
        this.firstName = "Invalid";
        document.getElementById("warning").innerHTML = "Names cannot have numbers in";
      }
      else {
        this.firstName = firstName;
        return true
      }
    },
    verifySecond : function (surname) {
      var reg = new RegExp(/\d+/);
      if (reg.test(surname)) {
        this.surname = "Invalid";
        document.getElementById("warning").innerHTML = "Names cannot have numbers in";
      }
      else {
        this.surname = surname;
      }
    },
  }

  if (fullName.verifyFirst(firstName)) {
    document.getElementById("warning").innerHTML = "";
  }
  fullName.verifySecond(surname);

  var sendtxt = {
    message: "'Bruce Wayne'",
    set msg(value) {
      this.message = value;
    }
  };

  if (firstName != "") {
    sendtxt.msg = "'" + fullName.firstName + " " + fullName.surname + "'";
  }
  document.getElementById("settxt").innerHTML = "The name that will be displayed is: " + sendtxt.message;

  rval = document.getElementById("rslide").value;
  gval = document.getElementById("gslide").value;
  bval = document.getElementById("bslide").value;

  if (fullName.firstName == "") {
    fullName.firstName = "Bruce"
    fullName.surname = "Wayne"
  }
  if (bgcol > 220) {
    document.getElementById("boldh2").innerHTML = "The Screen is filled! Hit restart to go again!";
    return;
  } else {
    document.getElementById("boldh2").innerHTML = "Change the colour of the smoke below!";
  }
  if (bgcol > 50) {
    textSize(120);
    textAlign("center");
    fill(txtcol);

    text(fullName.firstName + " " + fullName.surname, (windowWidth / 2), 270);
    txtcol -= 0.1;
  }
  fill(bgcol, 10);
  rect(0, 0, windowWidth, windowHeight);

  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
    if (stars[i].pos.y > windowHeight) {
      stars.splice(i, 1);
    }
  }
  for (var i = 0; i < ashes.length; i++) {
    ashes[i].update();
    ashes[i].show();
    if (ashes[i].pos.y > windowHeight) {
      ashes.splice(i, 1);
    }
  }
  for (var i = 0; i < smokes.length; i++) {
    smokes[i].update();
    smokes[i].show();
    if (smokes[i].pos.y > windowHeight) {
      smokes.splice(i, 1);
    }
  }

  if (mouseIsPressed == true) {
    stars.push(new Star());
    stars[stars.length - 1].start();
  }
  if (stuck == true) {
    smokes.push(new Smoke());
    smokes[smokes.length - 1].start();
  }
}

function Star() {
  this.start = function() {
    this.col = color(random(255), random(255), random(255));
    this.pos = new p5.Vector(mouseX, mouseY);
    this.velocity = new p5.Vector((mouseX - pmouseX) / 5 + random(-1, 1), (mouseY - pmouseY) / 5 + random(-1, 1));
    this.size = random(2, 10);
  }

  this.update = function() {
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
          ashes.push(new Ash());
          ashes[ashes.length - 1].start();
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

  this.show = function() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}

function Ash() {
  var a = 254;
  var b = 27;
  var c = 7;
  this.start = function() {
    this.col = color(a, b, c);
    this.pos = new p5.Vector(random(0, windowWidth), windowHeight);
    this.size = 5;
  }
  this.update = function() {
    this.pos.y -= 2.7;
    a -= 1;
    b += 15;
    c += 15;
    this.col = color(a, b, c);
    this.size -= 0.25;
  }
  this.show = function() {
    ranint = random(50, 100);
    if (this.pos.y > (windowHeight - ranint)) {
      noStroke();
      fill(this.col);
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
  }
}

function Smoke() {
  this.start = function() {
    if (bgcol > 50) {
      textSize(120);
      textAlign("center");
      fill(txtcol);

      text(fullName.firstName + " " + fullName.surname, (windowWidth / 2), 270);
      txtcol -= 0.1;
    }
    this.col = color(rval, gval, bval);
    this.pos = new p5.Vector(randomint(windowWidth), windowHeight);
    this.velocity = new p5.Vector(0, 5);
    this.size = random(2, 10);
  }
  this.update = function() {
    this.pos.y -= 2.7;
    if (bgcol < 200) {
      this.size -= 0.5;
    } else {
      this.size -= 5;
    }
  }
  this.show = function() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}

function randomint(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
