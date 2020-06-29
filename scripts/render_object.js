//Scene every object is placed into
var scene = new THREE.Scene();

//Camera which defines how the object is viewed
var camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 10000);

//Establishes the renderer defined by three js, sets the width to 80% of the screen, and the height to 95% of the screen. It also changes the background color of the renderer window to light grey
var container = document.getElementById('container');

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.55, window.innerHeight * 0.55);
container.appendChild(renderer.domElement);

renderer.setClearColor("#efefef");

//Scalable window resizing
window.addEventListener('resize', function() {
  var width = window.innerWidth * 0.55;
  var height = window.innerHeight * 0.55;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

//Orbit control implmentation


//TransformControls
var transform = new THREE.TransformControls(camera, renderer.domElement);
transform.setRotationSnap(THREE.Math.degToRad(0.25));
transform.axis = 'Y';
transform.showX = false;
transform.showZ = false;
//Mesh to hold the rendered airplane
var mesh = null;

//MTLLoader
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath("../../assets/");
mtlLoader.load('privateJet.mtl', function(materials) {

  materials.preload();

  //OBJ Loader
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath("../../assets/");
  objLoader.load('privateJet.obj', function(object) {

    mesh = object;
    mesh.position.y = -30;
    scene.add(mesh);

    //Attaches transform controls to the rendererd shape, adds control handles to the scene, and sets the control mode to rotation
    transform.attach(mesh);
    scene.add(transform);
    transform.setMode("rotate");
  });

});

//Skybox
var materialArray = [];
var tex_ft = new THREE.TextureLoader().load('../../assets/skybox/clouds1_front.png');
var tex_bk = new THREE.TextureLoader().load('../../assets/skybox/clouds1_back.png');
var tex_up = new THREE.TextureLoader().load('../../assets/skybox/clouds1_up.png');
var tex_dn = new THREE.TextureLoader().load('../../assets/skybox/clouds1_down.png');
var tex_rt = new THREE.TextureLoader().load('../../assets/skybox/clouds1_right.png');
var tex_lf = new THREE.TextureLoader().load('../../assets/skybox/clouds1_left.png');



materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_ft
}));
materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_bk
}));
materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_up
}));
materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_dn
}));
materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_rt
}));
materialArray.push(new THREE.MeshBasicMaterial({
  map: tex_lf
}));

for (var i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;


var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
var skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);


var group = new THREE.Group();
//Grid Helper creator
var size = 850;
var divisions = 25;
var gridHelper = new THREE.GridHelper(size, divisions);

var geometry = new THREE.BoxGeometry (60, 1, 60);

var cube0Materials = [
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/0.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/0.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/0.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/0.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/0.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/0.png'), side: THREE.DoubleSide, transparent: true } ),
];

var cube90Materials = [
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/90.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/90.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/90.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/90.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/90.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/90.png'), side: THREE.DoubleSide, transparent: true } ),
];

var cube180Materials = [
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/180.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/180.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/180.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/180.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/180.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/180.png'), side: THREE.DoubleSide, transparent: true } ),
];

var cubeNegative90Materials = [
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/-90.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/-90.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/-90.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/-90.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/-90.png'), side: THREE.DoubleSide, transparent: true } ),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load('../../assets/-90.png'), side: THREE.DoubleSide, transparent: true } ),
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

cube0.position.x = 0;
cube0.position.z = -405;

cube90.position.x = -405;
cube90.position.z = 0;

cube180.position.x = 0;
cube180.position.z = 405;

cubeNegative90.position.x = 405;
cubeNegative90.position.z = 0;

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
var moveButton = document.getElementById('btn');
//Switch case statement variable
var moveCase = 1;

//Toggles orbit controls on and off
if (moveButton) {
  moveButton.addEventListener("click", function() {
    switch (moveCase) {
      case 1:
        transform.attach(group);
        moveButton.innerHTML = "Rotate Plane";
        moveCase = 2;
        break;
      case 2:
        transform.attach(mesh);
        moveButton.innerHTML = "Rotate Grid";
        moveCase = 1;
        break;
    }
  });
}

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

  document.getElementById("yAngle").innerHTML = "Y-Axis Rotation: " + y + "°";


  renderer.render(scene, camera);
};

animate();
