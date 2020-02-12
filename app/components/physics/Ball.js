import { Jumper } from './Jumper.js'

class Ball extends Jumper {
  constructor(mesh) {
    super()
    this.mesh = mesh
  }

  inJump = false
  isDoubleJump = false
  acceleration = -980
  speed = 0
  prevFrameTime;
  elasticity = 0.6
  defaultPunchSpeed = 400

  stopSpeed = this.defaultPunchSpeed / 10

  onTouchFloor = () => {
    this.mesh.position.y = 0
    if (this.speed < 0) {
      if (Math.abs(this.speed) > this.stopSpeed) {
        this.speed = (-this.speed) * this.elasticity
        if(Math.abs(this.speed) < this.stopSpeed) this.finishJump()
      } else {
        this.finishJump()
      }
    }
  }
}

export { Ball }
