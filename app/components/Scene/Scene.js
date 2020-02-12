const { Scene, Color } = require('three')


import { cube } from '../elements/Cube/Cube.js'
import { platform } from '../elements/platform/plaform.js'
import { light } from '../elements/lights/dotLight.js'
import { dyno } from '../elements/dyno/dyno.js'


const scene = new Scene()

scene.background = new Color( 'skyblue' );
scene.castShadow = true

scene.add(cube)
scene.add(platform)
scene.add(light)

console.log(scene.children)
const dynoMeshPromise = new Promise((resolve) => {
  dyno.then(dynoMesh => {
    scene.add(dynoMesh)
    // const skeletonHelper = new SkeletonHelper(dynoMesh.skeleton.bones[0])
    // skeletonHelper.visible = true
    // scene.add(skeletonHelper)

    // var boneContainer = new Group();
    // boneContainer.add( dynoMesh.skeleton.bones[ 0 ] );
		// scene.add( boneContainer );
    
    // console.log(skeletonHelper)
    // dynoMesh.visible = true
    resolve(dynoMesh)
  })
}) 
export { scene, dynoMeshPromise }