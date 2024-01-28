import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  MenuItem,
  TextField,
} from '@mui/material'

import {
  addThingToChronicle,
  getMyBattlegroupsWithoutChronicles,
  getMyCharactersWithoutChronicles,
  getMyQcsWithoutChronicles,
} from '@/ducks/entities'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@/hooks'
import { getSpecificChronicle } from '@/selectors/chronicle'
import type { CharacterType } from '@/types'
import { capitalize } from '@/utils'

interface Props {
  chronicleId: number
  thingType: CharacterType
}

export const BattlegroupAddDialog = ({ chronicleId, thingType }: Props) => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()
  const [thingId, setThingId] = useState(0)
  const chronicle = useAppSelector((state) =>
    getSpecificChronicle(state, chronicleId),
  )
  const entities = useAppSelector((state) => {
    switch (thingType) {
      case 'character':
        return getMyCharactersWithoutChronicles(state)
      case 'qc':
        return getMyQcsWithoutChronicles(state)
      case 'battlegroup':
        return getMyBattlegroupsWithoutChronicles(state)
    }
  })

  if (chronicle === undefined) return null

  const currentBattlegroup = entities.find((c) => c.id === thingId)

  const handleSubmit = () => {
    if (thingId === 0) return
    close()
    dispatch(addThingToChronicle(chronicleId, thingId, thingType))
  }

  const thingName = capitalize(thingType)

  return (
    <>
      <Button onClick={open}>Add {thingName}</Button>

      <Dialog open={isOpen}>
        <DialogTitle>
          Add {thingName} to {chronicle.name}
        </DialogTitle>

        <DialogContent>
          <TextField
            select
            value={thingId}
            name="battlegroupId"
            onChange={(e) => setThingId(Number(e.target.value))}
            fullWidth
            margin="dense"
          >
            <MenuItem key={0} value={0} disabled>
              Select a {thingName}
            </MenuItem>
            <Divider key="div" />
            {entities.map((bg) => (
              <MenuItem key={bg.id} value={bg.id}>
                {bg.name}
              </MenuItem>
            ))}
          </TextField>

          {currentBattlegroup?.hidden && (
            <DialogContentText>
              This {thingName} is hidden. It will only be visible to you and the
              storyteller.
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BattlegroupAddDialog
