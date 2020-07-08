
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 10000);

var container = document.getElementById('container');

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.55, window.innerHeight * 0.55);
container.appendChild(renderer.domElement);

renderer.setClearColor("#F5F5F5");

//Scalable window resizing
window.addEventListener('resize', function() {
  var width = window.innerWidth * 0.55;
  var height = window.innerHeight * 0.55;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

//Line 1 creation (e1 at 0 y +x)
var material = new THREE.LineBasicMaterial({color: 0x00000, linewidth: 10});
var points = [];
points.push(new THREE.Vector3(400, 0, 0));
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(0, 0, 0));

var geometry = new THREE.BufferGeometry().setFromPoints(points);

var line = new THREE.Line(geometry, material);

//Line 2 creation (e2 oriented straight up)
var material2 = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 10});
var points2 = [];
points2.push(new THREE.Vector3(0, 0, -400));
points2.push(new THREE.Vector3(0, 0, 0));
points2.push(new THREE.Vector3(0, 0, 0));

var geometry2 = new THREE.BufferGeometry().setFromPoints(points2);

var line2 = new THREE.Line(geometry2, material2);


//Line 3 creation (e3 oriented -y -x)
var material3 = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 10});
var points3 = [];
points3.push(new THREE.Vector3(-200, 0, 200));
points3.push(new THREE.Vector3(0, 0, 0));
points3.push(new THREE.Vector3(0, 0, 0));

var geometry3 = new THREE.BufferGeometry().setFromPoints(points3);

var line3 = new THREE.Line(geometry3, material3);

//Line 4 creation
var material4 = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 10});
var points4 = [];
points4.push(new THREE.Vector3(0, 0, -400));
points4.push(new THREE.Vector3(0, 0, 0));
points4.push(new THREE.Vector3(0, 0, 0));

var geometry4 = new THREE.BufferGeometry().setFromPoints(points4);

var line4 = new THREE.Line(geometry4, material4);

//Line 5 creation
var material5 = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 10});
var points5 = [];
points5.push(new THREE.Vector3(400, 0, 0));
points5.push(new THREE.Vector3(0, 0, 0));
points5.push(new THREE.Vector3(0, 0, 0));

var geometry5 = new THREE.BufferGeometry().setFromPoints(points5);

var line5 = new THREE.Line(geometry5, material5);

//Add lines to the scene
scene.add(line);
scene.add(line2);
scene.add(line3);
scene.add(line4);
scene.add(line5);

var line4Rotation = line4.rotation.y;
var line5Rotation = line5.rotation.y;

//Focuses the camera on the rendered object
camera.position.y = 650;
camera.lookAt(0, 0, 0);
camera.rotation.y = 90 * Math.PI / 180;
camera.rotation.order = "YXZ";

//Function to implement orbit OrbitControls
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enabled = false;

//Pointer to the camera movement button
var aniButton = document.getElementById('btnStart');
//Switch case statement variable
var moveCase = 1;
var exampleText = document.getElementById('exampleText');

if (aniButton) {
  aniButton.addEventListener("click", function() {
    switch(moveCase){
      case 1:
      exampleText.innerHTML = 'Right-handed rotation about <b>e</b><sub>3</sub>';
      aniButton.innerHTML = 'Next &rarr;';
      animateFirstRotation();
      moveCase = 2;
      break;
      case 2:
      animateRedraw();
      animateSecondRotation();
      aniButton.innerHTML = 'Reset';
      exampleText.innerHTML = 'Left-handed rotation about <b>e</b><sub>3</sub>';
      moveCase = 3;
      break;
      case 3:
      location.reload();
      break;
    }

  });
}

var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

var animateFirstRotation = function(){
  requestAnimationFrame(animateFirstRotation);
  firstRotation();
  renderer.render(scene, camera);
};

var animateSecondRotation = function(){
  requestAnimationFrame(animateSecondRotation);
  secondRotation();
  renderer.render(scene, camera);
};

var animateRedraw = function(){
  requestAnimationFrame(animateRedraw);
  redrawScene();
  renderer.render(scene, camera);
};

var redrawScene = function(){
line4.rotation.y = line4Rotation;
line5.rotation.y= line5Rotation;
};

var firstRotation = function( )
{
  if(line4.rotation.y < THREE.Math.degToRad(30))
  {
    line4.rotation.y += THREE.Math.degToRad(0.3);
  }
  if(line5.rotation.y < THREE.Math.degToRad(30))
  {
    line5.rotation.y += THREE.Math.degToRad(0.3);
  }

};



var secondRotation = function( )
{

  while(line4.rotation.y > THREE.Math.degToRad(-30))
  {
    line4.rotation.y += THREE.Math.degToRad(-0.3);
  }
  while(line5.rotation.y > THREE.Math.degToRad(-30))
  {
    line5.rotation.y += THREE.Math.degToRad(-0.3);
  }

};
animate();
