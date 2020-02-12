class AnimationSubscriber {
  listeners = [];

  addListener = (listener) => {
    this.listeners = [...this.listeners, listener]
  }

  animateAll = () => {
    this.listeners.forEach((listener) => {
      listener.animate()
    })
  }

}

const subscriber = new AnimationSubscriber()

export { subscriber } 

