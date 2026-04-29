import type React from 'react'
import { useState } from 'react'

import {
  Button,
  ButtonBase,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  type Theme,
  type WithStyles,
  withStyles,
} from '@material-ui/core'

import { useAppDispatch } from '@lca/hooks/UseAppDispatch'
import { useAppSelector } from '@lca/hooks/UseAppSelector'
import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import { updateCharacter, updateQc } from 'ducks/actions'
import { useDialogLogic } from 'hooks'
import { canIEdit, getPoolsAndRatingsGeneric } from 'selectors'
import type { Character, QC } from 'types'

const styles = (theme: Theme) =>
  createStyles({
    wrap: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    col: {
      flex: 1,
    },
    divider: {
      marginBottom: theme.spacing(),
      marginTop: theme.spacing(),
    },
    content: {
      minWidth: '15em',
    },
  })

interface Props extends WithStyles<typeof styles> {
  character: Character | QC
  children: React.ReactNode
}

const ShapeNecromancyWidget = ({ character, children, classes }: Props) => {
  const [isOpen, open, close] = useDialogLogic()
  const [motes, setMotes] = useState(0)
  const [total, setTotal] = useState(character.necromantic_motes)
  const dispatch = useAppDispatch()
  const updateAction = character.type === 'qc' ? updateQc : updateCharacter

  const shapeSorceryPool = useAppSelector(
    (state) =>
      getPoolsAndRatingsGeneric(state, character.id, character.type)
        .shapeSorcery,
  )

  const canEdit = useAppSelector((state) =>
    canIEdit(state, character.id, character.type === 'qc' ? 'qc' : 'character'),
  )

  const updateRoll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotes(parseInt(e.target.value, 10))
    setTotal(parseInt(e.target.value, 10) + character.necromantic_motes)
  }

  const updateTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotes(parseInt(e.target.value, 10) - character.necromantic_motes)
    setTotal(parseInt(e.target.value, 10))
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

        <DialogContent className={classes.content}>
          <div className={classes.wrap}>
            <div className={classes.col}>
              <PoolDisplay
                qc={character.type === 'qc'}
                pool={shapeSorceryPool}
                label="Pool"
              />
            </div>
            <div className={classes.col}>
              <RatingField
                trait="roll"
                label="Roll"
                value={motes}
                onChange={updateRoll}
                min={-Infinity}
              />
            </div>
          </div>

          <Divider className={classes.divider} />

          <center>
            <RatingField
              trait="total"
              label="Total"
              value={total}
              onChange={updateTotal}
            />
          </center>
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

// @ts-expect-error MUI v5 migration will fix this
export default withStyles(styles)(ShapeNecromancyWidget)
