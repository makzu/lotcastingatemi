import { useState, type ChangeEvent } from 'react'
import { connect } from 'react-redux'

import { SwapHoriz } from '@mui/icons-material'
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
  MenuItem,
} from '@mui/material'

import ExaltTypeSelect, {
  prettyType,
} from '@/components/characterEditor/exaltTraits/ExaltTypeSelect'
import type { State } from '@/ducks'
import { changeCharacterType } from '@/ducks/actions'
import { useDialogLogic } from '@/hooks'
import { canIEdit } from '@/selectors'
import { getSpecificCharacter } from '@/ducks/entities/character'

import type { MenuItemProps as Props } from './CharacterMenuItem'

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
  const [selectedType, setSelectedType] = useState(currentType)

  if (!canEdit || characterType !== 'character') {
    return null
  }

  const showCharacterDisclaimer =
    selectedType === 'Character' && currentType !== 'Character'

  const handleSubmit = () => {
    action(id, selectedType)
    handleClose()
  }

  const actuallySet = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      return
    }

    setSelectedType(e.target.value)
  }

  return (
    <>
      <Divider />

      <MenuItem onClick={handleOpen}>
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

          <ExaltTypeSelect value={selectedType} onChange={actuallySet} />

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

export default connect<StateProps, DispatchProps, Props>(mapState, {
  action: changeCharacterType,
})(MenuChangeCharacterType)
