import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  ButtonBase,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core'

import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import { useDialogLogic } from 'hooks'
import { Character, QC } from 'types'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import { getPoolsAndRatingsGeneric, canIEdit } from 'selectors'

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
  const dispatch = useDispatch()
  const updateAction = character.type === 'qc' ? updateQc : updateCharacter

  const shapeSorceryPool = useSelector(
    (state) =>
      getPoolsAndRatingsGeneric(state, character.id, character.type)
        .shapeSorcery,
  )

  const canEdit = useSelector((state) =>
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
