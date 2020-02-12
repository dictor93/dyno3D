const { Vector3, Raycaster } = require('three')

import { Subscriber } from '../helpers/Subscriber.model.js'
import { Jumper } from '../physics/Jumper.js'
import { cube } from '../elements/Cube/Cube.js'
import { platform } from '../elements/platform/plaform.js'

class Runner extends Subscriber {

  object = null
  mesh = {}
  dir = true
  touchecd = false

  constructor(object) {
    super()
    if (object instanceof Jumper) {
      this.mesh = object.mesh
      this.object = object
    } else {
      this.mesh = object
    }
    this.raycaster = new Raycaster()
  }

  checkCube() {
    const rays = [
      new Vector3(this.dir ? 1 : -1, 0, 0),
      new Vector3(this.dir ? -1 : 1, 0, 0),
      new Vector3(this.dir ? 1 : -1, -1, 0),
      new Vector3(this.dir ? -1 : 1, -1, 0),
      new Vector3(0, -1, 0),
    ]
    rays.find((ray, i) => {
      this.raycaster.set(this.mesh.position, ray);
      const collisions = this.raycaster.intersectObjects([cube, platform]);
      if (collisions.find(col => col.object === cube && col.distance < 10)) {
        this.touched = true;
        console.log(i)
        return true
      }
      if((i === 0 || i === 1) && collisions.find(col => col.object === platform && col.distance < 10)) {
        this.touched = true;
        console.log(i)
        return true
      }
    })
  }

  reset() {
    if (!this.dir) this.mesh.rotateY(-Math.PI)
    this.dir = true
    this.touched = false
    this.mesh.position.x = 0
    this.mesh.position.y = 0
    this.mesh.position.x = 0
    this.prevFrameTime = Date.now()
  }

  calculate = () => {
    if (this.object) {
      this.object.animate()
    }
    const now = Date.now()
    const dt = (now - (this.prevFrameTime || now)) / 1000
    this.prevFrameTime = now
    this.mesh.runAnimation && this.mesh.runAnimation()
    if (this.mesh.position.x > 200 && this.dir) {
      this.mesh.rotateY(Math.PI)
      this.dir = false
    }
    if (this.mesh.position.x < -200 && !this.dir) {
      this.mesh.rotateY(-Math.PI)
      this.dir = true
    }
    this.mesh.translateX(dt * 100)
    this.checkCube()
  }

  animate = () => {
    this.calculate()
  }
}

export { Runner }
