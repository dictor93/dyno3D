const { PointLight } = require('three')

const light = new PointLight(0xffffff, 30, 1000)

light.position.set(-100, 300, 70)
light.castShadow = true;
light.shadowCameraVisible = true;

export { light }