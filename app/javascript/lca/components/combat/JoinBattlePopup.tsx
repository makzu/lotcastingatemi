import { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'

import PoolDisplay from '@lca/components/generic/PoolDisplay.tsx'
import RatingField from '@lca/components/generic/RatingField.tsx'
import {
  updateBattlegroup,
  updateCharacter,
  updateQc,
} from '@lca/ducks/actions/index.ts'
import useDialogLogic from '@lca/hooks/UseDialogLogic.ts'
import { canIEdit, getPoolsAndRatingsGeneric } from '@lca/selectors/index.ts'
import type { RootState } from '@lca/store.ts'
import type { Battlegroup, Character, QC } from '@lca/types/index.ts'

const styles = (theme) => ({
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(),
  },
  col: {
    flex: 1,
  },
})

type ExposedProps = {
  character: Character | QC | Battlegroup
}
type Props = ExposedProps & {
  canEdit: boolean
  update: Function
  pools: Object
  classes: Object
}

const JoinBattlePopup = (props: Props) => {
  const { character, update, pools, classes } = props
  const [isOpen, setOpen, setClosed] = useDialogLogic()
  const [init, setInit] = useState(0)

  const handleClose = () => {
    setClosed()
    setInit(0)
  }

  const handleSubmit = () => {
    update(character.id, init)
    handleClose()
  }

  return (
    <>
      <Button onClick={setOpen}>Roll Join Battle</Button>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Join Battle</DialogTitle>
        <DialogContent>
          <div className={classes.wrap}>
            <div className={classes.col}>
              <PoolDisplay
                qc={character.type === 'qc' || character.type === 'battlegroup'}
                pool={pools.joinBattle}
                label="Join Battle Pool"
              />
            </div>
            <div className={classes.col}>
              <RatingField
                trait="initiative"
                label="Result"
                value={init}
                onChange={(e) => setInit(e.target.value)}
              />
            </div>
          </div>
          <DialogContentText>
            {character.name} will join combat with {init + 3} initiative.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Join Battle
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

function mapStateToProps(state: RootState, props: ExposedProps) {
  let type
  if (props.character.type === 'qc') type = 'qc'
  else if (props.character.type === 'battlegroup') type = 'battlegroup'
  else type = 'character'

  return {
    canEdit: canIEdit(state, props.character.id, type),
    pools: getPoolsAndRatingsGeneric(state, props.character.id, type),
  }
}

function mapDispatchToProps(dispatch: Function, props: ExposedProps) {
  let action
  switch (props.character.type) {
    case 'qc':
      action = updateQc
      break
    case 'battlegroup':
      action = updateBattlegroup
      break
    case 'character':
    default:
      action = updateCharacter
  }

  return {
    update: (id, value) =>
      dispatch(action(id, { in_combat: true, initiative: 3 + value })),
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(JoinBattlePopup),
)
