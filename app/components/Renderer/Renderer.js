const { WebGLRenderer, Raycaster } = require('three');
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js'


import { scene, dynoMeshPromise } from '../Scene/Scene.js';
import { camera } from '../Camera/Camera.js';
import { Runner } from '../physics/Runner.js';
import { platform } from '../elements/platform/plaform.js'
import { cube } from '../elements/Cube/Cube.js'

import { Jumper } from '../physics/Jumper.js'
import { subscriber } from '../helpers/AnimationSubscriber.js'
import { dyno } from '../elements/dyno/dyno.js';

let fault = false

const renderer = new WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMapEnabled = true

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()
// controls.autoRotate = true
// controls.autoRotateSpeed = 2
let raycaster = null
let runnerDyno = null
dynoMeshPromise.then(mesh => {
  const jumperDyno = new Jumper(mesh)

  runnerDyno = new Runner(jumperDyno)

  const onKeyPress = (e) => {
    if (e.keyCode === 32) {
      jumperDyno.jump()
    }
    if (e.keyCode === 27) {
      fault && runnerDyno.reset()
      fault = false
    }
  }


  document.addEventListener('keydown', onKeyPress, false);

  raycaster = new Raycaster()
  subscriber.addListener(runnerDyno)
})


const animate = () => {
  if(runnerDyno && runnerDyno.touched) {
    fault = true
  }
  requestAnimationFrame(animate)

  !fault && subscriber.animateAll()
  controls.update();

  renderer.render(scene, camera)

}

animate()


export {
  renderer,
  camera
}
