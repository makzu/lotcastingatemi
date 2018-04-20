// @flow
import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Delete from '@material-ui/icons/Delete'

import { destroyChronicle } from 'ducks/actions.js'
import { getSpecificChronicle } from 'selectors'

type Props = {
  chronicleId: number,
  chronicleName: string,
  destroyChronicle: Function,
}
class ChronicleLeavePopup extends Component<Props, { open: boolean }> {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    this.setState({ open: false })
    this.props.destroyChronicle(this.props.chronicleId)
  }

  render() {
    const { handleOpen, handleClose, handleSubmit } = this
    const { chronicleName } = this.props

    return (
      <Fragment>
        <Button onClick={handleOpen}>
          Delete Chronicle &nbsp;<Delete />
        </Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Delete {chronicleName}?</DialogTitle>
          <DialogContent>
            <DialogContentText>This cannot be undone!</DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let chronicleName = ''

  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)
  if (chronicle != undefined && chronicle.name != undefined) {
    chronicleName = chronicle.name
  }

  return {
    chronicleName: chronicleName,
  }
}

export default connect(mapStateToProps, { destroyChronicle })(
  ChronicleLeavePopup
)
