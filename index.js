//Initiating Global Variables
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

//Creating the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
}

//Drawing to the canvas
function draw() {

  //Retreiving text input values of first name and surname
  firstName = document.getElementById('firstName').value,
  surname = document.getElementById('surname').value,

  //Testing validity of Name and assigning properties
  fullName = {
    firstName : document.getElementById('firstName').value,
    surname : document.getElementById('surname').value,
    //Detecting numbers in the name input - indicating incorrect input
    verifyFirst : function (firstName) {
      var reg = new RegExp(/\d+/);
      if (reg.test(firstName)) {
        this.firstName = "[INVALID]";
        document.getElementById("warning").innerHTML = "Names cannot have numbers in";
      }
      else {
        this.firstName = firstName;
        return true
      }
    },
    //Detecting numbers in the name input - indicating incorrect input
    verifySecond : function (surname) {
      var reg = new RegExp(/\d+/);
      if (reg.test(surname)) {
        this.surname = "[INVALID]";
        document.getElementById("warning").innerHTML = "Names cannot have numbers in";
      }
      else {
        this.surname = surname;
      }
    },
  }

  //Hiding the error message when inputs are valid again
  if (fullName.verifyFirst(firstName)) {
    document.getElementById("warning").innerHTML = "";
  }
  fullName.verifySecond(surname);

  //Default name for if no text has been inputted
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

  //Retreiving data from rgb sliders
  rval = document.getElementById("rslide").value;
  gval = document.getElementById("gslide").value;
  bval = document.getElementById("bslide").value;

  //Setting Defaults
  if (fullName.firstName == "") {
    fullName.firstName = "Bruce"
    fullName.surname = "Wayne"
  }

  //Detecting a smoke filled screen and therefore the need to stop
  if (bgcol > 220) {
    //Changing the bold text to explain what has happened to the user
    document.getElementById("boldh2").innerHTML = "The Screen is filled! Hit restart to go again!";
    return;
  } else {
    document.getElementById("boldh2").innerHTML = "Change the colour of the smoke below!";
  }

  //Creating text to appear in the smoke when smokey enough
  if (bgcol > 50) {
    textSize(120);
    textAlign("center");
    fill(txtcol);

    text(fullName.firstName + " " + fullName.surname, (windowWidth / 2), 270);
    txtcol -= 0.1;
  }
  fill(bgcol, 10);
  rect(0, 0, windowWidth, windowHeight);

  //Updating and showing all particles required
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

  //Actions dependant on the user
  if (mouseIsPressed == true) {
    stars.push(new Star());
    stars[stars.length - 1].start();
  }

  //Generating smoke particles if star particles have stuck to the bottom of the canvas
  if (stuck == true) {
    smokes.push(new Smoke());
    smokes[smokes.length - 1].start();
  }
}

//Generation random integers
function randomint(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
