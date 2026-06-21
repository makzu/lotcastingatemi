import { useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles, type Theme, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { updateBattlegroup as update } from '@lca/ducks/actions/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useAppSelector from '@lca/hooks/UseAppSelector.ts'
import useDialogLogic from '@lca/hooks/UseDialogLogic.ts'
import { canIEditBattlegroup } from '@lca/selectors/index.ts'
import sharedStyles from '@lca/styles/index.ts'
import type { Battlegroup } from '@lca/types/battlegroup.ts'
import { totalMagnitude } from '@lca/utils/calculated/index.ts'
import PoolDisplay from '../generic/PoolDisplay.tsx'
import RatingField from '../generic/RatingField.tsx'
import ResourceDisplay from '../generic/ResourceDisplay.tsx'

const useStyles = makeStyles((theme: Theme) => ({
  ...sharedStyles(theme),
  display: {
    marginRight: theme.spacing(),
  },
  rulesRef: {
    ...theme.typography.caption,
    marginTop: theme.spacing(),
  },
}))

interface Props {
  battlegroup: Battlegroup
  className?: string
  DisplayClassName?: string
}

const BattlegroupHealthDisplayNew = (props: Props) => {
  const { battlegroup, className, DisplayClassName } = props
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const canEdit = useAppSelector((state) =>
    canIEditBattlegroup(state, battlegroup.id),
  )
  const [size, setSize] = useState(battlegroup.size)
  const [magnitude, setMagnitude] = useState(battlegroup.magnitude)
  const [isOpen, setOpen, setClosed] = useDialogLogic()

  const handleClose = () => {
    setClosed()
    setMagnitude(battlegroup.magnitude)
    setSize(battlegroup.size)
  }

  const handleSubmit = () => {
    dispatch(update(battlegroup.id, { size, magnitude }))
    handleClose()
  }

  return (
    <>
      <ButtonBase
        disabled={!canEdit}
        onClick={setOpen}
        className={className}
        style={{ alignItems: 'inherit' }}
      >
        <ResourceDisplay
          current={battlegroup.magnitude}
          total={totalMagnitude(battlegroup)}
          label="Magnitude"
          className={DisplayClassName || classes.display}
        />
        <PoolDisplay
          battlegroup
          pool={{ total: battlegroup.size }}
          label="Size"
          classes={{ root: DisplayClassName }}
        />
      </ButtonBase>

      <Dialog open={isOpen} onClose={setClosed}>
        <DialogTitle>Battlegroup Health</DialogTitle>

        <DialogContent>
          <div className={classes.flexContainer}>
            <div style={{ flex: 1 }}>
              <ResourceDisplay
                current={battlegroup.magnitude}
                total={totalMagnitude(battlegroup)}
                label="Current Magnitude"
              />
            </div>

            <div style={{ flex: 1 }}>
              <PoolDisplay
                battlegroup
                staticRating
                pool={{ total: battlegroup.size }}
                label="Current Size"
              />
            </div>
          </div>

          <div className={classes.flexContainer}>
            <Typography component="div" style={{ flex: 1 }}>
              <RatingField
                label="Magnitude"
                trait="magnitude"
                value={magnitude}
                onChange={(e) => setMagnitude(e.target.value)}
              />
              {` / ${totalMagnitude({ ...battlegroup, size: size })}`}
            </Typography>

            <div style={{ flex: 1 }}>
              <RatingField
                label="Size"
                trait="size"
                max={5}
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
          </div>

          <DialogContentText className={classes.rulesRef}>
            BG Damage and Rout rules can be found in Core p.208-209
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BattlegroupHealthDisplayNew
