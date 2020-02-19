const { Clock } = require('three')

class AnimationSubscriber {
  clock = null
  constructor() {
    this.clock = new Clock(true)
  }

  listeners = [];

  addListener = (listener) => {
    this.listeners = [...this.listeners, listener]
  }

  animateAll = () => {
    const dt = this.clock.getDelta()
    this.listeners.forEach((listener) => {
      listener.animate(dt)
    })
  }

}

const subscriber = new AnimationSubscriber()

export { subscriber } 

