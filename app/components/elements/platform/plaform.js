const { BoxGeometry, MeshPhysicalMaterial, Mesh, DoubleSide } = require("three");


const geometry = new BoxGeometry(300, 500, 300);
const material = new MeshPhysicalMaterial({
  color: 0x222,
  clearcoat: 0.9,
  reflectivity: 0.1,
  clearcoatRoughness: 0,
  side: DoubleSide,
});
const platform = new Mesh(geometry, material);

platform.castShadow = true
platform.receiveShadow = true
platform.position.setY(-255)

export { platform }