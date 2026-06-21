import type React from 'react'
import { useState } from 'react'
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  type Theme,
} from '@material-ui/core'
import {
  createStyles,
  type WithStyles,
  withStyles,
} from '@material-ui/core/styles'

import PoolDisplay from '@lca/components/generic/PoolDisplay.tsx'
import RatingField from '@lca/components/generic/RatingField.tsx'
import { updateCharacter, updateQc } from '@lca/ducks/actions/index.ts'
import { useDialogLogic } from '@lca/hooks/index.ts'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch.ts'
import { useAppSelector } from '@lca/hooks/UseAppSelector.ts'
import { canIEdit, getPoolsAndRatingsGeneric } from '@lca/selectors/index.ts'
import type { Character, QC } from '@lca/types/index.ts'

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

export default withStyles(styles)(ShapeNecromancyWidget)
