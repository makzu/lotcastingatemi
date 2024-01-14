import { Component, type Node } from 'react'
import { connect } from 'react-redux'

import { addThingToChronicle } from '@/ducks/actions'
import { getSpecificChronicle, getMyQcsWithoutChronicles } from '@/selectors'
import type { fullQc, Enhancer } from '@/utils/flow-types'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  MenuItem,
  TextField,
} from '@mui/material'

interface ExposedProps {
  chronicleId: number
}
type Props = ExposedProps & {
  qcs: fullQc[]
  chronicleName: string
  handleSubmit: $TSFixMeFunction
}
interface State {
  open: boolean
  qcId: number
}

class QcAddPopup extends Component<Props, State> {
  state = {
    open: false,
    qcId: 0,
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
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
    if (this.state.qcId == 0) return
    this.setState({
      open: false,
    })
    this.props.handleSubmit(this.props.chronicleId, this.state.qcId)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { chronicleName, qcs } = this.props

    const options = [
      <MenuItem key={0} value={0} disabled>
        Select a Qc
      </MenuItem>,
      <Divider key="div" />,
      ...qcs.map((c) => (
        <MenuItem key={c.id} value={c.id}>
          {c.name}
        </MenuItem>
      )),
    ]
    const currentQc = qcs.find((c) => c.id == this.state.qcId)
    const hidden = currentQc && currentQc.hidden
    return (
      <>
        <Button onClick={handleOpen}>Add Qc</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Add a Qc to {chronicleName}</DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              select
              value={this.state.qcId}
              name="qcId"
              onChange={handleChange}
              fullWidth
              margin="dense"
            >
              {options}
            </TextField>
            {hidden && (
              <DialogContentText>
                This Qc is hidden. It will only be visible to you and the
                storyteller.
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)
  const qcs = getMyQcsWithoutChronicles(state)
  let chronicleName = ''

  if (chronicle.name != undefined) {
    chronicleName = chronicle.name
  }

  return {
    qcs,
    chronicleName,
  }
}

const mapDispatchToProps: Object = (dispatch) => ({
  handleSubmit: (id, qcId) => dispatch(addThingToChronicle(id, qcId, 'qc')),
})

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default enhance(QcAddPopup)
