// @flow
import { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Delete from '@mui/icons-material/Delete'

import { destroyChronicle } from 'ducks/actions.js'
import { getSpecificChronicle } from 'selectors'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  chronicleId: number,
}
type Props = ExposedProps & {
  chronicleName: string,
  destroyChronicle: Function,
}
type State = {
  open: boolean,
}

class ChronicleLeavePopup extends Component<Props, State> {
  state = {
    open: false,
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
      <>
        <Button onClick={handleOpen}>
          Delete Chronicle &nbsp;
          <Delete />
        </Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Delete {chronicleName}?</DialogTitle>
          <DialogContent>
            <DialogContentText>This cannot be undone!</DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  let chronicleName = ''

  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)
  if (chronicle != undefined && chronicle.name != undefined) {
    chronicleName = chronicle.name
  }

  return {
    chronicleName: chronicleName,
  }
}

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps, {
  destroyChronicle,
})

export default enhance(ChronicleLeavePopup)
