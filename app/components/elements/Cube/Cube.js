const { BoxGeometry, MeshPhysicalMaterial, Mesh } = require("three");


var geometry = new BoxGeometry(10, 30, 10);
var material = new MeshPhysicalMaterial({
  color: 0x00ff00,
  clearcoat: 0.9,
  reflectivity: 0.1,
  clearcoatRoughness: 0,
});
var cube = new Mesh(geometry, material);
cube.position.y = 15
cube.position.x = - 15
cube.castShadow = true
cube.receiveShadow = true

export { cube }