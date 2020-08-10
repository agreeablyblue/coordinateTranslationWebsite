//Scene to hold all 3D objects
var scene = new THREE.Scene();

//Camera to view the scene, field of view, size, and render distance are set in its constructor
var camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 10000);

//Container that holds all the objects which is an element of moving_From2D.html
var container = document.getElementById('container');

//Creats renderer which is what allows the scene of 3D objects to be displayed
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.55, window.innerHeight * 0.55);
container.appendChild(renderer.domElement);
renderer.setClearColor("#F5F5F5");

//Scalable window resizing
window.addEventListener('resize', function() {
  var width = window.innerWidth * 0.55;
  var height = window.innerHeight * 0.55;
  renderer.setSize(width, height);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.y = 1235/camera.aspect;
});

//Arrow Helpers which act as guide lines for the coordinate system
var dir1 = new THREE.Vector3(1, 0, 0);
var dir2 = new THREE.Vector3(0, 0, -400);
var dir3 = new THREE.Vector3(-200, 0, 200);

//Groups to hold arrow Helpers
var group1 = new THREE.Group();
var group2 = new THREE.Group();

var group3 = new THREE.Group();
var group4 = new THREE.Group();
//normalize the direction vector (convert to vector of length 1)
dir1.normalize();
dir2.normalize();
dir3.normalize();

//Defining variables for all three arrow helpers
var origin = new THREE.Vector3(0, 0, 0);
var length = 400;
var hex = 0x000000;
var headLength = 20;
var headWidth = 15;

//Creates the first set of arrow helpers based on the variables specified above
var arrowHelper1 = new THREE.ArrowHelper(dir1, origin, length, hex, headLength, headWidth);
var arrowHelper2 = new THREE.ArrowHelper(dir2, origin, length, hex, headLength, headWidth);
var arrowHelper3 = new THREE.ArrowHelper(dir3, origin, length, hex, headLength, headWidth);

//Creates the second set of arrow helpers based on the variables specified above
var arrowHelper4 = new THREE.ArrowHelper(dir1, origin, length, hex, headLength, headWidth);
var arrowHelper5 = new THREE.ArrowHelper(dir2, origin, length, hex, headLength, headWidth);
var arrowHelper6 = new THREE.ArrowHelper(dir3, origin, length, hex, headLength, headWidth);

//Adds the arrow helpers to the scene
group1.add(arrowHelper1);
group1.add(arrowHelper2);

group2.add(arrowHelper3);

group3.add(arrowHelper4);
group3.add(arrowHelper6);

group4.add(arrowHelper5);

scene.add(group1);
scene.add(group2);

scene.add(group3);
scene.add(group4);

group1.position.x = -500;
group2.position.x = -500;

group3.position.x = 350;
group4.position.x = 350;
//Focuses the camera on the rendered object
camera.position.y = 650;
camera.lookAt(0, 0, 0);
camera.rotation.y = 90 * Math.PI / 180;
camera.rotation.order = "YXZ";

//Function to implement orbit OrbitControls - used for testing, not part of the functionality of the program
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enabled = false;

//Pointer to the camera movement button
var aniButton = document.getElementById('btnStart');

//Switch case statement variable which keeps track of how many times the animation button has been clicked
var moveCase = 1;

//Div from moving_From_2D.html that holds information on the demonstration provided by the animation
var exampleText = document.getElementById('contentHolder');
var exampleText2 = document.getElementById('contentHolder2');

//Checks if the animation button has been located, if it has then an event listener checks for clicks by the user
if (aniButton) {
  aniButton.addEventListener("click", function() {
    //Switch statement controlling the affects of clicking the Play Animation button
    switch (moveCase) {
      case 1:
        //Update the text description of the demo and the animation button
        exampleText.innerHTML = '(b) After rotation by 30&#176; around <b>e</b><sup>3</sup> (red line)';
        arrowHelper3.setColor("#FF0000");
        exampleText2.innerHTML = '(b) After rotation by 40&#176; around <b>e</b><sup>2</sup> (red line)';
          arrowHelper5.setColor("#FF0000");
        aniButton.innerHTML = 'Next';


        //Call the function that animates the first rotation
        animateFirstRotation();

        //Update the move case which is used to keep track of how many times the button has been clicked
        moveCase = 2;

        break;

      case 2:
      aniButton.innerHTML = 'Reset';
      aniButton.style.background = '#ff0000';
      exampleText.innerHTML = '(c) After rotation by 40&#176; around <b>e</b><sup>2</sup>';
      arrowHelper3.setColor("#000000");
      arrowHelper2.setColor("#FF0000");
      exampleText2.innerHTML = '(c) After rotation by 30&#176; around <b>e</b><sup>3</sup>';
      arrowHelper5.setColor("#000000");
      arrowHelper6.setColor("#FF0000");
      animateSecondRotation();
      moveCase = 3;
      break;

      case 3:
      //Reloads the page
      location.reload();
      break;
    }

  });
}

//Main function that renders the scene. Called at the bottom of the document to do the initial render of the scene
var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

//Function that animates the first rotation of lines 1 and 2
var animateFirstRotation = function() {
  requestAnimationFrame(animateFirstRotation);
  firstRotation();
  renderer.render(scene, camera);
};

//Function that animates the second rotation of lines 1 and 2
var animateSecondRotation = function() {
  requestAnimationFrame(animateSecondRotation);
  secondRotation();
  renderer.render(scene, camera);
};

//Function that resets the rotation of lines 1 and 2
var animateRedraw = function() {
  requestAnimationFrame(animateRedraw);
  redrawScene();
  renderer.render(scene, camera);
};



//Rotates lines 1 and 2 30 degrees incrementally from their original location
var firstRotation = function() {
  if (group1.rotation.y < THREE.Math.degToRad(30)) {
    group1.rotation.y += THREE.Math.degToRad(0.3);
  }

  if (group3.rotation.y < THREE.Math.degToRad(40)) {
    group3.rotation.y += THREE.Math.degToRad(0.4);
  }
};

var secondRotation = function(){
group2.add(arrowHelper1);
group4.add(arrowHelper4);

arrowHelper1.rotation.y = THREE.Math.degToRad(30);
arrowHelper4.rotation.y = THREE.Math.degToRad(30);

  if (group2.rotation.y < THREE.Math.degToRad(40)) {
    group2.rotation.y += THREE.Math.degToRad(0.4);
  }
  if (group4.rotation.y < THREE.Math.degToRad(30)) {
    group4.rotation.y += THREE.Math.degToRad(0.3);
  }

}

//Function call to render the scene
animate();