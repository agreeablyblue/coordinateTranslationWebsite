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

//Line 1 creation
var material = new THREE.LineBasicMaterial({color: 0x00000, linewidth: 10});
var points = [];
points.push(new THREE.Vector3(400, 0, 0));
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(0, 0, 0));

var geometry = new THREE.BufferGeometry().setFromPoints(points);

var line = new THREE.Line(geometry, material);

//Line 2 creation
var material2 = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 10});
var points2 = [];
points2.push(new THREE.Vector3(0, 0, -400));
points2.push(new THREE.Vector3(0, 0, 0));
points2.push(new THREE.Vector3(0, 0, 0));

var geometry2 = new THREE.BufferGeometry().setFromPoints(points2);

var line2 = new THREE.Line(geometry2, material2);

scene.add(line);
scene.add(line2);

//TransformControls
var transform = new THREE.TransformControls(camera, renderer.domElement);
transform.setRotationSnap(THREE.Math.degToRad(0.25));
transform.axis = 'Y';
transform.showX = false;
transform.showZ = false;

transform.setMode("rotate");
transform.setRotationSnap(THREE.Math.degToRad(30));
transform.attach(line2);
scene.add(transform);
/*
//Grid Helper
var size = 850;
var divisions = 25;
var gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);
*/

//Focuses the camera on the rendered object
camera.position.y = 650;
camera.lookAt(0, 0, 0);
camera.rotation.y = 90 * Math.PI / 180;
camera.rotation.order = "YXZ";



//Ambient light generator
var pointLight = new THREE.PointLight(0xFFFFFF, 20, 1000);
pointLight.position.set(0, 500, 0);
scene.add(pointLight);

//Function to implement orbit OrbitControls
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enabled = false;



//Pointer to the scene reset button
var resetButton = document.getElementById('btnReset');

if(resetButton){
  resetButton.addEventListener("click", function(){
    location.reload();

  });
}

//Function animate which calls the renderer to render the scene
var defaultRotation = new THREE.Quaternion();
var defaultCameraRotation = new THREE.Quaternion();

var animate = function() {
  requestAnimationFrame(animate);



  renderer.render(scene, camera);
};

animate();
