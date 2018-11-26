// @flow
import React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'

import ExaltTypeSelect from 'components/characterEditor/exaltTraits/ExaltTypeSelect.jsx'

import { changeCharacterType } from 'ducks/actions'
import { canIEdit } from 'selectors'

type Props = {
  id: number,
  characterType: string,
  canIEdit: boolean,
  changeCharacterType: Function,
}
type State = { open: boolean, type: string }
class MenuchangeCharacterType extends React.PureComponent<Props, State> {
  state = { open: false, type: 'SolarCharacter' }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleChange = e => {
    this.setState({ type: e.target.value })
  }

  handleSubmit = () => {
    this.props.changeCharacterType(this.props.id, this.state.type)
    this.handleClose()
  }

  render() {
    if (!this.props.canIEdit || this.props.characterType !== 'character')
      return null

    return (
      <>
        <MenuItem button onClick={this.handleOpen}>
          <ListItemText primary="Change Exalt Type" />
        </MenuItem>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Change Exalt Type (experimental)</DialogTitle>
          <DialogContent>
            <ExaltTypeSelect
              value={this.state.type}
              onChange={this.handleChange}
            />

            {this.state.type === 'Character' && (
              <>
                <DialogContentText>
                  Switching your character type to Mortal will delete all Native
                  Charms, Martial Arts Charms, Evocations, and Spirit Charms
                  that this character may have. This cannot be undone!
                </DialogContentText>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button variant="raised" onClick={this.handleSubmit}>
              Change type
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
const mapStateToProps = (state, props) => ({
  canIEdit: canIEdit(state, props.id, props.characterType),
})

export default connect(
  mapStateToProps,
  { changeCharacterType }
)(MenuchangeCharacterType)
