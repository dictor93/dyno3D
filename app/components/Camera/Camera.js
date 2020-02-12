const { PerspectiveCamera } = require('three');

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.setY(300)
camera.position.setX(300)

export { camera }