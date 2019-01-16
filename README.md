# Programming 18/19 Summative Assignment
<center> rtjm84 </center>

<b> Usability of Code </b><br>
Explanation of methods used:
<ul>
<li> <i> Setup(): </i> This is solely used to create the canvas </li>
<li> <i> Draw(): </i> Contains most of the javascript and is responsible for drawing onto the canvas. </li>
<li> <i> randomint(max): </i> Used to generate random numbers. </li>
<li> <i>  constructor(): </i> Within classes and used for the initial creation of particles, normally defines the particles colour, velocity, positions, etc. </li>
<li> <i> move(): </i> Updates the particle's velocities and position, as well as colour and size if necessary</li>
<li> <i> show(): </i> Responsible for displaying the particles on the screen</li>
</ul>
<li> <i> function(firstName) and function(surname): </i> This checks the validity of each part of the name  </li>
<li> <i>function resetsmoke(): </i> This is activated by an event listener for when a button is clicked to reset the smoke back to the original light grey colour.

<br>
<br>
My canvas requires the use of several global variables that are then used within several classes and functions. All classes use constructor functions and variables such as <i> this.velocity </i> for example.
<br>


<b> Development of Original </b> <br>
The original version of the code can be found in <i> original.js </i> or at <u> <a href="https://www.openprocessing.org/sketch/409404"> "Particles" by Airpan at OpenProcessing.org</a> </u> (Creative Commons License Attribution-ShareAlike 3.0), for full licensing details see LICENSE.md. <br> <br> The original code involved generating particles of random colours when the mouse was clicked, that would have varying velocities depending on the movement of the mouse. The particles would then bounce of the sides of the canvas until disappearing through the bottom. The developments I made to the original code are as follows:
<ul>
<li> When stars/particles were generated in the original code they would bounce off the sides of the canvas but were not limited by the top or the bottom. My first development was to make the particles bounce when they came into contact with the bottom of the canvas. The bounce would result in a decreased height on the rebound. I then made the particles stick to the bottom of the canvas when their velocity was slow enough, at this point they would expand to a random size within a pre-determined range. </li>
<li> The next development was to create smoke particles which would be created once the original particles began sticking to the bottom of the canvas. Initially I did this with a boolean variable that would create star particles that resembled smoke upon every other draw, I later changed this however so that smoke particles were created separately with their own constructor. These smoke particles were generated once star particles had begun sticking to the floor, they would have random x-position on the bottom of the canvas, and would then drift upwards with slowly decreasing y-velocity whilst enlarging to represent diffusion. I then later added form slider controls representing RGB colours that can be used to control the colour of the smoke, the default setting is a light grey.</li>
<li> As more smoke particles are generated the initially black background slowly fades into a lighter grey. Once the background is light enough, text inputted with the form controls slowly appears and solidifies through the smoke. This text is a name and inputted through a form for first name and surname, the <i> index.js </i> file detects if any unwanted characters are inputted indicating a false name and prints "[INVALID]" if necessary. This also results in a warning message showing, this disappears again when the text is changed to a valid input. The form also has a reset button to restart the canvas</li>
<li> Once the background colour is even lighter the smoke then enlarges rapidly to fill the screen and soon after no further objects are created. This was done to reduce the generation and activity of too many particles from effecting the performance of the site which the javascript is applied to. Once this happens the text of an already existing header changes to inform the user what has happened and suggests restarting.</li>
<li> I have also added particles that I have names ashes, once smoke starts generating, small ashes are created at the bottom of the canvas that float upwards for a short but random distance until disappearing.</li>
<li> A dynamic paragraph outputs the name that will eventually appear in the smoke, this paragraph's text changes with the user's inputs. </li>
<li> There is also a button that uses an event listener to rest the smoke colour back to the default light grey when pressed </li>
</ul>
<br>

<b> Explanation of Example </b> <br>
My example site involves my javascript canvas connected via getters and setters to several form controls on the website. There are inputs for a first name and surname, which will create the name outputted through the smoke, and if nothing is inputted then there is a default name in place ("Bruce Wayne"). Furthermore, there are RGB sliders to control the colour of the smoke generated, this can be changed whilst smoke is already being generated. There are also on screen instructions with a reset button below to re-setup the canvas once the particles have stopped generating. The site demonstrates how the javascript could be used with appropriate form controls to create a personalised animation.
<br>
