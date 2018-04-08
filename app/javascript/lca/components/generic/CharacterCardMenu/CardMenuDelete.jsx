import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import { ListItemIcon, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'
import Delete from '@material-ui/icons/Delete'

import { destroyCharacter, destroyQc, destroyBattlegroup } from '../../../ducks/actions.js'
import { canIDelete } from '../../../selectors'

class CardMenuDelete extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    if (!this.props.canDelete)
      return <span />

    let action
    switch(this.props.characterType) {
    case 'qc':
      action = this.props.destroyQc
      break
    case 'battlegroup':
      action = this.props.destroyBattlegroup
      break
    case 'character':
    default:
      action = this.props.destroyCharacter
    }

    return <Fragment>
      <Divider />

      <MenuItem button onClick={ this.handleOpen }>
        <ListItemIcon><Delete /></ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>

      <Dialog
        open={ this.state.open }
      >
        <DialogTitle>
          Delete { this.props.name }?
        </DialogTitle>

        <DialogContent>
          <Typography>
            This cannot be undone!
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={ this.handleClose }>Cancel</Button>
          <Button onClick={ () => action(this.props.id) } color="primary" variant="raised">Delete</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  }
}
CardMenuDelete.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  canDelete: PropTypes.bool,
  characterType: PropTypes.string.isRequired,
  destroyCharacter: PropTypes.func,
  destroyQc: PropTypes.func,
  destroyBattlegroup: PropTypes.func,
}
function mapStateToProps(state, ownProps) {
  return {
    canDelete: canIDelete(state, ownProps.id, ownProps.characterType),
    name: state.entities[ownProps.characterType + 's'][ownProps.id].name,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    destroyCharacter:   (id) => dispatch(destroyCharacter(id)),
    destroyQc:          (id) => dispatch(destroyQc(id)),
    destroyBattlegroup: (id) => dispatch(destroyBattlegroup(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardMenuDelete)
