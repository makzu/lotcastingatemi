// @flow
// TODO: replace this with redux-cablecar or something?
const UpdatesCable = {
  subscribe(getState: Function, received: Object) {
    this.unsubscribe()

    window.App.ChronicleCable = window.App.cable.subscriptions.create(
      {
        channel: 'ChronicleChannel',
        id: getState().session.id,
      },
      {
        received: received,
      }
    )
  },

  unsubscribe() {
    if (window.ChronicleCable === undefined) {
      return false
    }

    window.App.cable.subscriptions.remove(window.App.ChronicleCable)
    delete window.App.ChronicleCable
  },
}

export default UpdatesCable
