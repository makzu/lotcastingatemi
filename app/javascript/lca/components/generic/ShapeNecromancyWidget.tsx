import { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material'

import PoolDisplay from '@/components/generic/PoolDisplay.jsx'
import { updateCharacter, updateQc } from '@/ducks/actions.js'
import { useAppSelector, useDialogLogic } from '@/hooks'
import {
  canIEdit,
  getPoolsAndRatingsGeneric,
  type getPoolsAndRatings,
  type getPoolsAndRatingsForQc,
} from '@/selectors'
import type { Character, QC } from '@/types'
import RatingField from '../fields/RatingField'

interface Props {
  character: Character | QC
  children: React.ReactNode
}

const ShapeNecromancyWidget = ({ character, children }: Props) => {
  const [isOpen, open, close] = useDialogLogic()
  const [motes, setMotes] = useState(0)
  const [total, setTotal] = useState(character.necromantic_motes)
  const dispatch = useDispatch()
  const updateAction = character.type === 'qc' ? updateQc : updateCharacter

  const shapeSorceryPool = useAppSelector(
    (state) =>
      (
        getPoolsAndRatingsGeneric(
          state,
          character.id,
          character.type,
        ) as ReturnType<
          typeof getPoolsAndRatings | typeof getPoolsAndRatingsForQc
        >
      )?.shapeSorcery,
  )

  const canEdit = useAppSelector((state) =>
    canIEdit(state, character.id, character.type === 'qc' ? 'qc' : 'character'),
  )

  const updateRoll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotes(parseInt(e.target.value))
    setTotal(parseInt(e.target.value) + character.necromantic_motes)
  }

  const updateTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotes(parseInt(e.target.value) - character.necromantic_motes)
    setTotal(parseInt(e.target.value))
  }

  const submit = () => {
    close()
    dispatch(updateAction(character.id, { necromantic_motes: total }))
  }

  if (!canEdit) {
    return children
  }

  return (
    <>
      <ButtonBase onClick={open}>{children}</ButtonBase>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Shape Sorcery</DialogTitle>

        <DialogContent sx={{ minWidth: '15em' }}>
          <div className="flexContainerWrap">
            <div className="flex">
              <PoolDisplay
                qc={character.type === 'qc'}
                pool={shapeSorceryPool}
                label="Pool"
              />
            </div>
            <div className="flex">
              <RatingField
                name="roll"
                label="Roll"
                value={motes}
                onChange={updateRoll}
                min={-Infinity}
                debounceTime={0}
              />
            </div>
          </div>

          <Divider sx={{ my: 2 }} />

          <RatingField
            name="total"
            label="Total"
            value={total}
            onChange={updateTotal}
            debounceTime={0}
            sx={{ mx: 'auto' }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={submit} variant="contained" color="primary">
            Shape
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ShapeNecromancyWidget
