const { Vector3, Raycaster } = require('three')

import { Subscriber } from '../helpers/Subscriber.model.js'
import { platform } from '../elements/platform/plaform.js'

class Jumper extends Subscriber {
  constructor(mesh) {
    super()
    this.mesh = mesh
    this.raycaster = new Raycaster()
  }

  inJump = false
  isDoubleJump = false
  acceleration = -980
  speed = 0
  prevFrameTime;
  defaultPunchSpeed = 400


  checkFloor() {
    const rays = [
      new Vector3(0, -1, 0),
      new Vector3(0, 1, 0),
    ]
    const onFloor = rays.find((ray, i) => {
      this.raycaster.set(this.mesh.position, ray);
      // Test if we intersect with any obstacle mesh
      const collisions = this.raycaster.intersectObjects([platform]);
      // const target = collisions.find(collision => {

      // })
      if(i === 1 && collisions.find(collision => collision.faceIndex === 4)) return true
      console.log({collisions}, {i})
      if (i === 0 && collisions.find(collision => (collision.faceIndex === 5 && collision.distance < 4.5))) return true
    })
    return !!onFloor

  }

  jump() {
    if (this.isDoubleJump) return
    if (this.inJump) this.isDoubleJump = true
    this.prevFrameTime = Date.now();
    this.inJump = true
    this.speed = this.defaultPunchSpeed
  }

  finishJump = () => {
    this.speed = 0
    this.mesh.position.setY(0)
    this.inJump = false
    this.isDoubleJump = false
  }

  onTouchFloor = () => {
    this.finishJump()
  }

  calculate = () => {
    if (this.inJump) {
      const now = Date.now()
      const dt = (now - (this.prevFrameTime || now)) / 1000
      this.prevFrameTime = now

      const dv = dt * this.acceleration
      this.speed += dv

      const ds = this.speed * dt
      const currentY = this.mesh.position.y
      this.mesh.translateY(ds)
      if (this.checkFloor()) {
        this.onTouchFloor()
      }
    }
  }
}

export { Jumper }
