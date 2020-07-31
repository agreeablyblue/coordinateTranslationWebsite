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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.y = 1235/camera.aspect;;
});

//Orbit control implmentation

//TransformControls
var transform = new THREE.TransformControls(camera, renderer.domElement);
transform.setRotationSnap(THREE.Math.degToRad(0.25));
transform.axis = 'Y';
transform.showX = false;
transform.showZ = false;
//Mesh to hold the rendered airplane


//MTLLoader

  //OBJ Creator
  var geometry = new THREE.SphereGeometry( 25, 25, 25 );
  var material = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe: false } );
  var mesh = new THREE.Mesh( geometry, material );


  mesh.position.z = -325;
  scene.add(mesh);

  //transform.attach(mesh);
  scene.add(transform);
  transform.setMode("rotate");




var group = new THREE.Group();
//Grid Helper creator
var size = 850;
var divisions = 25;
var gridHelper = new THREE.GridHelper(size, divisions);

var geometry = new THREE.BoxGeometry (60, 1, 60);

var cube0Materials = [
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveX.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveX.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveX.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveX.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveX.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveX.png'), side: THREE.DoubleSide, transparent: true } ),
];

var cube90Materials = [
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveY.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveY.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveY.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveY.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveY.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/positiveY.png'), side: THREE.DoubleSide, transparent: true } ),
];

var cube180Materials = [
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusX.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusX.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusX.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusX.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusX.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusX.png'), side: THREE.DoubleSide, transparent: true } ),
];

var cubeNegative90Materials = [
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusY.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusY.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusY.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusY.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusY.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/xyLabels/minusY.png'), side: THREE.DoubleSide, transparent: true } ),
];



var material0 = new THREE.MeshFaceMaterial(cube0Materials);
var cube0 = new THREE.Mesh( geometry, material0 );

var material90 = new THREE.MeshFaceMaterial(cube90Materials);
var cube90 = new THREE.Mesh( geometry, material90 );

var material180 = new THREE.MeshFaceMaterial(cube180Materials);
var cube180 = new THREE.Mesh( geometry, material180 );

var materialNegative90 = new THREE.MeshFaceMaterial(cubeNegative90Materials);
var cubeNegative90 = new THREE.Mesh( geometry, materialNegative90 );

group.add(cube0);
group.add(cube90);
group.add(cube180);
group.add(cubeNegative90);

cube0.position.x = 405;
cube0.position.z = 0;

cube90.position.x = 0;
cube90.position.z = -405;

cube180.position.x = -405;
cube180.position.z = 0;

cubeNegative90.position.x = 0;
cubeNegative90.position.z = 405;

group.add(gridHelper);
scene.add(group);




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


//Pointer to the camera movement button

//Switch case statement variable
transform.attach(group);



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

  //Get Object Y Rotation Angle

  var angleOfY = defaultRotation.angleTo(mesh.quaternion);
  var y = THREE.Math.radToDeg(angleOfY).toFixed(2);

  //Check if rotation is positive or negative
  var yValue = mesh.rotation.y;
  //If negative then multiply by -1 to reflect that in the output
  if (yValue < 0) {
    y = y * -1;
  }




  renderer.render(scene, camera);
};

animate();
