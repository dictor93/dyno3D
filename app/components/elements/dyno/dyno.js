
import { GLTFLoader } from '../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
const { MeshPhysicalMaterial } = require('three')

const loader = new GLTFLoader()
const material = new MeshPhysicalMaterial({
  color: 0x00ff00,
  clearcoat: 0.9,
  reflectivity: 0.1,
  clearcoatRoughness: 0,
});
material.needsUpdate = true


const runAnimation = (obj) => {
  let prevFrameTime = 0
  let rotation = 0
  const rootBone = obj.skeleton.bones[0]
  const leftFoot = obj.skeleton.bones.find(bone => bone.name === 'FootL')
  const rightFoot = obj.skeleton.bones.find(bone => bone.name === 'footR')
  console.log(leftFoot)
  const xFromPol = (fi, r) => {
    return Math.cos(fi) * r
  }

  const zFromPol = (fi, r) => {
    return Math.sin(fi) * r
  }

  return function animate() {
    rightFoot.position.y += 0.01
    // console.log(leftFoot.rotation)
  }

}

const dyno = new Promise((resolve) => {
  loader.load(
    __dirname + "/components/elements/dyno/dyno.glb",
    function (gltf) {
      let obj = gltf.scene.children[0]
      obj = obj.children.find((child) => child.material)
      obj.material = material
      obj.add( obj.skeleton.bones[0] );
      obj.bind( obj.skeleton );
      obj.runAnimation = runAnimation(obj)
      console.log(obj)
      resolve(obj)
    },
  )
})


export { dyno } 