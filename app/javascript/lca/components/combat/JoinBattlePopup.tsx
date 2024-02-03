import { useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material'

import RatingField from '@/components/fields/RatingField'
import PoolDisplay from '@/components/generic/PoolDisplay'
import { updateBattlegroup, updateCharacter, updateQc } from '@/ducks/actions'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@/hooks'
import { getPoolsAndRatingsGeneric } from '@/selectors'
import type { Battlegroup, Character, QC } from '@/types'

interface ExposedProps {
  character: Character | QC | Battlegroup
}

const JoinBattleDialog = ({ character }: ExposedProps) => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()
  const [initiative, setInitiative] = useState(0)
  const pools = useAppSelector((state) =>
    getPoolsAndRatingsGeneric(state, character.id, character.type),
  )

  if (pools == null) return null

  const handleSubmit = () => {
    let action

    switch (character.type) {
      case 'qc':
        action = updateQc
        break

      case 'battlegroup':
        action = updateBattlegroup
        break

      default:
        action = updateCharacter
    }
    dispatch(
      action(character.id, { in_combat: true, initiative: 3 + initiative }),
    )
  }

  return (
    <>
      <Button onClick={open}>Roll Join Battle</Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Join Battle</DialogTitle>

        <DialogContent>
          <Stack direction="row" spacing={1} useFlexGap alignItems="flex-end">
            <Box sx={{ flex: 1 }}>
              <PoolDisplay
                qc={character.type === 'qc' || character.type === 'battlegroup'}
                pool={pools.joinBattle}
                label="Join Battle Pool"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <RatingField
                name="initiative"
                label="Result"
                value={initiative}
                onChange={(e) => setInitiative(Number(e.target.value))}
                debounceTime={0}
              />
            </Box>
          </Stack>

          <DialogContentText>
            {character.name} will join combat with {initiative + 3} initiative.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Join Battle
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default JoinBattleDialog
