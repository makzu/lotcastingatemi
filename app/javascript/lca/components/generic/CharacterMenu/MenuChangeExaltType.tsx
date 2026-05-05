import { type ChangeEvent, useState } from 'react'
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
} from '@material-ui/core'
import { SwapHoriz } from '@material-ui/icons'

import ExaltTypeSelect from '@lca/components/characterEditor/exaltTraits/ExaltTypeSelect'
import { changeCharacterType } from '@lca/ducks/actions'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@lca/hooks'
import { canIEdit, getSpecificCharacter } from '@lca/selectors'
import type { ExaltType } from '@lca/types/character'
import { prettyCanonType } from '@lca/utils/calculated/pretty'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const MenuChangeCharacterType = ({ id, characterType }: Props) => {
  const dispatch = useAppDispatch()
  const canEdit = useAppSelector((state) => canIEdit(state, id, characterType))
  const currentType = useAppSelector((state) =>
    characterType === 'character'
      ? getSpecificCharacter(state, id).type
      : undefined,
  )
  const [isOpen, handleOpen, handleClose] = useDialogLogic()
  const [selectedType, setSelectedType] = useState(currentType)

  if (!canEdit || characterType !== 'character') {
    return null
  }

  const showCharacterDisclaimer =
    selectedType === 'Character' && currentType !== 'Character'

  const handleSubmit = () => {
    dispatch(changeCharacterType(id, selectedType))
    handleClose()
  }

  const actuallySet = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      return
    }

    setSelectedType(e.target.value as ExaltType)
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
            Current type: {prettyCanonType(currentType)}
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
