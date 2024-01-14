import { Component } from 'react'
import { connect } from 'react-redux'

import Delete from '@mui/icons-material/Delete'

import { destroyChronicle } from '@/ducks/actions'
import { getSpecificChronicle } from '@/selectors'
import type { Enhancer } from '@/utils/flow-types'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface ExposedProps {
  chronicleId: number
}
type Props = ExposedProps & {
  chronicleName: string
  destroyChronicle: $TSFixMeFunction
}
interface State {
  open: boolean
}

class ChronicleLeavePopup extends Component<Props, State> {
  state = {
    open: false,
  }
  handleOpen = () => {
    this.setState({
      open: true,
    })
  }
  handleClose = () => {
    this.setState({
      open: false,
    })
  }
  handleSubmit = () => {
    this.setState({
      open: false,
    })
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

  if (chronicle?.name != undefined) {
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
