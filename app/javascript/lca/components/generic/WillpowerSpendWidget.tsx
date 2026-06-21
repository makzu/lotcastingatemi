import { type ReactNode, useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { spendWillpower } from '@lca/ducks/events/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useDialogLogic from '@lca/hooks/UseDialogLogic.ts'
import type { Battlegroup, Character, QC } from '@lca/types/index.ts'
import { clamp } from '@lca/utils/math.ts'
import RatingField from './RatingField.tsx'
import ResourceDisplay from './ResourceDisplay.tsx'

interface Props {
  children: ReactNode
  character: Character | QC | Battlegroup
  qc?: boolean
  bg?: boolean
}

type CharacterType = Parameters<typeof spendWillpower>[2]

const WillpowerSpendWidgetNew = (props: Props) => {
  const dispatch = useAppDispatch()
  const { character, children } = props
  const min = -Infinity
  const max = character.willpower_temporary
  const [isOpen, setOpen, setClosed] = useDialogLogic()
  const [toSpend, setToSpend] = useState(0)

  const handleUpdate = (w: number) => {
    setToSpend(clamp(w, min, max))
  }

  const handleClose = () => {
    setClosed()
    setToSpend(0)
  }

  const handleSubmit = () => {
    let characterType: CharacterType
    if (props.qc) characterType = 'qc'
    else if (props.bg) characterType = 'battlegroup'

    dispatch(spendWillpower(character.id, toSpend, characterType))
    handleClose()
  }
  return (
    <>
      <ButtonBase onClick={setOpen}>{children}</ButtonBase>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>
          {toSpend >= 0 ? 'Spend' : 'Recover'} Willpower
        </DialogTitle>

        <DialogContent>
          <div style={{ textAlign: 'center' }}>
            <ResourceDisplay
              current={character.willpower_temporary}
              total={character.willpower_permanent}
              label="Current Willpower"
            />
          </div>
          <Button size="small" onClick={() => handleUpdate(toSpend - 1)}>
            -1
          </Button>
          &nbsp;&nbsp;
          <RatingField
            trait="toSpend"
            value={toSpend}
            label="Willpower"
            narrow
            margin="dense"
            max={max}
            min={min}
            onChange={(e) => handleUpdate(e.currentTarget.value)}
          />
          <Button size="small" onClick={() => setToSpend(0)}>
            0
          </Button>
          <Button size="small" onClick={() => handleUpdate(toSpend + 1)}>
            +1
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {toSpend >= 0 ? 'Spend' : 'Recover'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default WillpowerSpendWidgetNew
