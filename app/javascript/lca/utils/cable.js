// @flow

import { createConsumer } from '@rails/actioncable'
const cable = createConsumer()

const UpdatesCable = {
  subscribe(getState: Function, received: Object) {
    this.unsubscribe()

    window.ChronicleCable = cable.subscriptions.create(
      {
        channel: 'ChronicleChannel',
        id: getState().session.id,
      },
      {
        received: received,
      },
    )
  },

  unsubscribe() {
    if (window.ChronicleCable === undefined) {
      return false
    }

    cable.subscriptions.remove(window.ChronicleCable)
    delete window.ChronicleCable
  },
}

export default UpdatesCable
