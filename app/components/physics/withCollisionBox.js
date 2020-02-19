const { Box3, Box3Helper, Vector3 } = require('three')

const withCollisionBox = (mesh) => {
  const meshTranslateX = mesh.translateX.bind(mesh)
  const meshTranslateY = mesh.translateY.bind(mesh)
  const meshTranslateZ = mesh.translateZ.bind(mesh)
  const 

  mesh.collisionBox = new Box3()
  mesh.collisionBox.setFromObject(mesh)
  mesh.collisionBoxHelper = new Box3Helper(mesh.collisionBox, 0xffff00)

  const translateX = (x) => {
    meshTranslateX(x)
    mesh.collisionBox.translate(new Vector3(x, 0, 0))
  }
  const translateY = (y) => {
    meshTranslateY(y)
    mesh.collisionBox.translate(new Vector3(0, y, 0))
  }
  const translateZ = (z) => {
    meshTranslateZ(z)
    mesh.collisionBox.translate(new Vector3(0, 0, z))
  }

  mesh.translateX = translateX
  mesh.translateY = translateY
  mesh.translateZ = translateZ
  return mesh
}

export { withCollisionBox }