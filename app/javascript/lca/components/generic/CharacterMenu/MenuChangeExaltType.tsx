import * as React from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@material-ui/core'
import { SwapHoriz } from '@material-ui/icons'

import ExaltTypeSelect, {
  prettyType
} from 'components/characterEditor/exaltTraits/ExaltTypeSelect.jsx'
import { State } from 'ducks'
import { changeCharacterType } from 'ducks/actions'
import { useDialogLogic } from 'hooks'
import { canIEdit, getSpecificCharacter } from 'selectors'
import { MenuItemProps as Props } from './CharacterMenuItem'

interface StateProps {
  canEdit: boolean
  currentType: string
}

interface DispatchProps {
  action: typeof changeCharacterType
}

interface InnerProps extends StateProps, DispatchProps, Props {}

const MenuChangeCharacterType = ({
  id,
  canEdit,
  characterType,
  currentType,
  action,
}: InnerProps) => {
  const [isOpen, handleOpen, handleClose] = useDialogLogic()
  const [selectedType, setSelectedType] = React.useState(currentType)

  if (!canEdit || characterType !== 'character') {
    return null
  }

  const showCharacterDisclaimer =
    selectedType === 'Character' && currentType !== 'Character'

  const handleSubmit = () => {
    action(id, selectedType)
    handleClose()
  }

  return (
    <>
      <Divider />

      <MenuItem button onClick={handleOpen}>
        <ListItemIcon>
          <SwapHoriz />
        </ListItemIcon>
        <ListItemText primary="Change Exalt Type" />
      </MenuItem>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Change Exalt Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Current type: {prettyType(currentType)}
          </DialogContentText>

          <ExaltTypeSelect value={selectedType} onChange={setSelectedType} />

          {showCharacterDisclaimer && (
            <DialogContentText>
              Switching your character type to Mortal will delete all Native
              Charms, Martial Arts Charms, Evocations, and Spirit Charms that
              this character may have. This cannot be undone!
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={selectedType === currentType}
          >
            Change type
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapState = (state: State, { id, characterType }: Props): StateProps => ({
  canEdit: canIEdit(state, id, characterType),
  currentType:
    characterType === 'character'
      ? getSpecificCharacter(state, id).type
      : undefined,
})

export default connect<StateProps, DispatchProps, Props>(
  mapState,
  { action: changeCharacterType }
)(MenuChangeCharacterType)
