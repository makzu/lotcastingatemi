import { useState, type ChangeEvent } from 'react'

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
import { changeCharacterType } from '@/ducks/actions'
import { getSpecificCharacter } from '@/ducks/entities/character'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@/hooks'
import { canIEdit } from '@/selectors'
import { Character } from '@/types'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const MenuChangeCharacterType = ({ id, characterType }: Props) => {
  const dispatch = useAppDispatch()
  const [isOpen, handleOpen, handleClose] = useDialogLogic()
  const canEdit = useAppSelector((state) => canIEdit(state, id, characterType))
  const character = useAppSelector((state) => getSpecificCharacter(state, id))
  const currentType = character?.type
  const [selectedType, setSelectedType] = useState(currentType)

  if (
    !canEdit ||
    characterType !== 'character' ||
    !currentType ||
    !character ||
    !selectedType
  ) {
    return null
  }

  const showCharacterDisclaimer =
    selectedType === 'Character' && currentType !== 'Character'

  const handleSubmit = () => {
    if (!selectedType) return
    dispatch(changeCharacterType(id, selectedType))
    handleClose()
  }

  const actuallySet = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      return
    }

    setSelectedType(e.target.value as Character['type'])
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

export default MenuChangeCharacterType
