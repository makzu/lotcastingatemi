import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import { addThingToChronicle } from '../../ducks/actions.js'
import { getMyQcsWithoutChronicles } from '../../selectors/'

class QcAddPopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      qcId: 0,
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleSubmit() {
    if (this.state.qcId == 0)
      return

    this.setState({ open: false })
    this.props.handleSubmit(this.props.chronicleId, this.state.qcId)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { chronicleName, qcs } = this.props

    const options = qcs.map((c) =>
      <MenuItem key={ c.id } value={ c.id }>
        { c.name }
      </MenuItem>
    )

    const currentQc = qcs.find((c) => c.id == this.state.qcId)

    return <Fragment>
      <Button onClick={ handleOpen }>
        Add Qc
      </Button>

      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Add a Qc to { chronicleName }</DialogTitle>
        <DialogContent>
          <TextField select value={ this.state.qcId }
            name="qcId"
            onChange={ handleChange }
            fullWidth margin="dense"
          >
            <MenuItem value={ 0 }>Select a Qc</MenuItem>
            <Divider />
            { options }
          </TextField>
          { currentQc && currentQc.hidden &&
            <DialogContentText>
              This Qc is hidden.  It will only be visible to you and the
              storyteller.
            </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <Button onClick={ handleSubmit } variant="raised" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  }
}
QcAddPopup.propTypes = {
  qcs: PropTypes.arrayOf(PropTypes.object),
  chronicleId: PropTypes.number.isRequired,
  chronicleName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const id = state.session.id
  const chronicle = state.entities.chronicles[ownProps.chronicleId]
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

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (id, qcId) => dispatch(addThingToChronicle(id, qcId, 'qc'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QcAddPopup)
