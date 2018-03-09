const UpdatesCable = {
  subscribe(getState, received) {
    this.unsubscribe()

    window.App.ChronicleCable = window.App.cable.subscriptions.create({
      channel: 'ChronicleChannel',
      id: getState().session.id,
    }, {
      received: received
    })
  },

  unsubscribe() {
    if (window.ChronicleCable === undefined) {
      return false
    }

    window.App.cable.subscriptions.remove(window.App.ChronicleCable)
    delete window.App.ChronicleCable
  }
}

export default UpdatesCable
