import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import ButtonBase from 'material-ui/ButtonBase'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import RatingField from './ratingField.jsx'
import ResourceDisplay from './ResourceDisplay.jsx'
import { spendWillpower } from '../../ducks/actions.js'
import { canIEditCharacter, canIEditQc } from '../../selectors'
import { clamp } from '../../utils/'

class WillpowerSpendWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false, toSpend: 0, commit: false, commitName: '' }

    this.max = this.max.bind(this)
    this.min = this.min.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  max() {
    return this.props.character.willpower_temporary
  }

  min() {
    return this.props.character.willpower_temporary - 10
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleAdd(motes) {
    this.setState({ toSpend: clamp(this.state.toSpend + motes, this.min(), this.max()) })
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit() {
    const { toSpend } = this.state
    const { character, qc } = this.props

    const characterType = qc ? 'qc' : 'character'

    this.props.spendWillpower(character.id, toSpend, characterType)

    this.setState({ open: false, toSpend: 0 })
  }

  render() {
    const { toSpend, open } = this.state
    const {
      min, max,
      handleOpen, handleClose, handleAdd, handleChange, handleSubmit,
    } = this
    const { character, canEdit, children } = this.props

    if (!canEdit) {
      return children
    }

    return <React.Fragment>
      <ButtonBase onClick={ handleOpen }>
        { children }
      </ButtonBase>
      <Dialog
        open={ open }
        onClose={ handleClose }
      >
        <DialogTitle>
          { toSpend >= 0 ? 'Spend' : 'Recover'} Willpower
        </DialogTitle>

        <DialogContent>
          <div style={{ textAlign: 'center' }}>
            <ResourceDisplay
              current={ character.willpower_temporary }
              total={ character.willpower_permanent }
              label="Current Willpower"
            />
          </div>

          <Button size="small" onClick={ () => handleAdd(-1) }>-1</Button>
          &nbsp;&nbsp;

          <RatingField trait="toSpend" value={ toSpend }
            label="Willpower" narrow margin="dense"
            max={ max() } min={ min() }
            onChange={ handleChange }
          />

          <Button size="small" onClick={ () => handleChange({ target: { name: 'toSpend', value: 0 }})}>
            0
          </Button>

          <Button size="small" onClick={ () => handleAdd(1) }>+1</Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={ handleClose }>
            Cancel
          </Button>
          <Button variant="raised" color="primary" onClick={ handleSubmit }>
            { toSpend >= 0 ? 'Spend' : 'Recover' }
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  }
}
WillpowerSpendWidget.propTypes = {
  children: PropTypes.node.isRequired,
  character: PropTypes.object.isRequired,
  qc: PropTypes.bool,
  canEdit: PropTypes.bool,
  spendWillpower: PropTypes.func,
}
function mapStateToProps(state, props) {
  return {
    canEdit: props.qc ? canIEditQc(state, props.character.id) : canIEditCharacter(state, props.character.id)
  }
}
function mapDispatchToProps(dispatch) {
  return {
    spendWillpower: (id, willpower, characterType) => dispatch(spendWillpower(id, willpower, characterType)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WillpowerSpendWidget)
