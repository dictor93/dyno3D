const { BoxGeometry, MeshPhysicalMaterial, Mesh, Box3, Vector3 } = require("three");


var geometry = new BoxGeometry(10, 30, 10);
var material = new MeshPhysicalMaterial({
  color: 0x00ff00,
  clearcoat: 0.9,
  reflectivity: 0.1,
  clearcoatRoughness: 0,
});
var cube = new Mesh(geometry, material);
cube.position.y = 15
cube.position.x = - 30
cube.castShadow = true
cube.receiveShadow = true

const intersectBox = new Box3(new Vector3, new Vector3)
intersectBox.setFromObject(cube)
cube.intersectBox = intersectBox

export { cube }