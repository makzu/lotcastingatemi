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

import ExaltTypeSelect, {
  prettyType,
} from 'components/characterEditor/exaltTraits/ExaltTypeSelect.jsx'

import { changeCharacterType } from 'ducks/actions'
import { canIEdit, getSpecificCharacter } from 'selectors'
import type { CharacterType } from './index.jsx'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  id: number,
  characterType: CharacterType,
}
type Props = ExposedProps & {
  canIEdit: boolean,
  currentType: string,
  changeCharacterType: Function,
}
type State = {
  open: boolean,
  type: string,
}

class MenuchangeCharacterType extends React.PureComponent<Props, State> {
  state = { open: false, type: this.props.currentType }

  handleOpen = () => {
    this.setState({ open: true, type: this.props.currentType })
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

    const showCharacterDisclaimer =
      this.state.type === 'Character' && this.props.currentType !== 'Character'

    return (
      <>
        <MenuItem button onClick={this.handleOpen}>
          <ListItemText primary="Change Exalt Type" />
        </MenuItem>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Change Exalt Type (experimental)</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Current type: {prettyType(this.props.currentType)}
            </DialogContentText>

            <ExaltTypeSelect
              value={this.state.type}
              onChange={this.handleChange}
            />

            {showCharacterDisclaimer && (
              <DialogContentText>
                Switching your character type to Mortal will delete all Native
                Charms, Martial Arts Charms, Evocations, and Spirit Charms that
                this character may have. This cannot be undone!
              </DialogContentText>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button
              variant="raised"
              onClick={this.handleSubmit}
              disabled={this.state.type === this.props.characterType}
            >
              Change type
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

const mapStateToProps = (state, props: ExposedProps) => ({
  canIEdit: canIEdit(state, props.id, props.characterType),
  currentType:
    props.characterType === 'character'
      ? getSpecificCharacter(state, props.id).type
      : undefined,
})

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  { changeCharacterType }
)

export default enhance(MenuchangeCharacterType)
