const { Vector3, Raycaster, Box3, Box3Helper, BoxGeometry } = require('three')

import { Subscriber } from '../helpers/Subscriber.model.js'
import { Jumper } from '../physics/Jumper.js'
import { cube } from '../elements/Cube/Cube.js'
import { platform } from '../elements/platform/plaform.js'

class Runner extends Subscriber {

  object = null
  mesh = {}
  dir = true
  touchecd = false
  helper = null

  constructor(object) {
    super()
    if (object instanceof Jumper) {
      this.mesh = object.mesh
      this.object = object
    } else {
      this.mesh = object
    }
    this.calculateCollisionBox()
  }

  calculateCollisionBox = () => {
    const collisionBox = new Box3(new Vector3(), new Vector3())
    collisionBox.setFromObject(this.mesh)
    this.helper = new Box3Helper(collisionBox, 0xffff00)
    return collisionBox
  }

  checkCube() {
    const collisionBox = this.calculateCollisionBox()
    if(collisionBox.intersectsBox(cube.intersectBox)) {
      this.touched = true;
      return true
    }
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

  calculate = (dt) => {
    if (this.object) {
      this.object.animate(dt)
    }
    this.mesh.runAnimation && this.mesh.runAnimation()
    if (this.mesh.position.x > 200 && this.dir) {
      this.mesh.rotateY(Math.PI)
      this.helper.rotateY(Math.PI)
      this.dir = false
    }
    if (this.mesh.position.x < -200 && !this.dir) {
      this.mesh.rotateY(-Math.PI)
      this.helper.rotateY(-Math.PI)
      this.dir = true
    }
    this.mesh.translateX(dt * 100)
    this.helper.translateX(dt * 100)
    this.checkCube()
  }
}

export { Runner }
