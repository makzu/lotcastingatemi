// @flow
import * as React from 'react'
const { Component, Fragment } = React
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import { addThingToChronicle } from 'ducks/actions.js'
import { getSpecificChronicle, getMyQcsWithoutChronicles } from 'selectors'
import type { fullQc } from 'utils/flow-types'

type Props = {
  qcs: Array<fullQc>,
  chronicleId: number,
  chronicleName: string,
  handleSubmit: Function,
}
type State = { open: boolean, qcId: number }
class QcAddPopup extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      qcId: 0,
    }
  }

  handleChange = e => {
    let { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    if (this.state.qcId == 0) return

    this.setState({ open: false })
    this.props.handleSubmit(this.props.chronicleId, this.state.qcId)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { chronicleName, qcs } = this.props

    const options: React.Node = [
      <MenuItem key={0} value={0} disabled>
        Select a Qc
      </MenuItem>,
      <Divider key="div" />,
      ...qcs.map(c => (
        <MenuItem key={c.id} value={c.id}>
          {c.name}
        </MenuItem>
      )),
    ]

    const currentQc = qcs.find(c => c.id == this.state.qcId)
    const hidden = currentQc && currentQc.hidden
    return (
      <Fragment>
        <Button onClick={handleOpen}>Add Qc</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Add a Qc to {chronicleName}</DialogTitle>
          <DialogContent>
            <TextField
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
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = state.session.id
  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)
  const qcs = getMyQcsWithoutChronicles(state)
  let chronicleName = ''
  let inviteCode = ''

  if (chronicle.name != undefined) {
    chronicleName = chronicle.name
    inviteCode = chronicle.invite_code
  }

  return {
    id,
    qcs,
    chronicleName,
    inviteCode,
  }
}

const mapDispatchToProps: Object = dispatch => ({
  handleSubmit: (id, qcId) => dispatch(addThingToChronicle(id, qcId, 'qc')),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QcAddPopup)
