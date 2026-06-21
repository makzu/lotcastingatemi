import { type ReactNode, useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { spendMotes } from '@lca/ducks/events/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useDialogLogic from '@lca/hooks/UseDialogLogic.ts'
import type { Character, QC } from '@lca/types/index.ts'
import type { WithSharedStats } from '@lca/types/shared.ts'
import {
  committedPeripheralMotes,
  committedPersonalMotes,
  prettyAnimaLevel,
} from '@lca/utils/calculated/index.ts'
import { clamp } from '@lca/utils/math.ts'
import MoteCommitmentPopup from './MoteCommitmentPopup.tsx'
import RatingField from './RatingField.tsx'
import ResourceDisplay from './ResourceDisplay.tsx'

type wraProps = {
  current: number
  spending: number
  mute: boolean
}
const WillRaiseAnima = ({ current, spending, mute }: wraProps) => {
  if (spending < 5 || current === 3)
    return (
      <Typography>
        No change to anima
        {current === 3 && ' (already at Bonfire)'}
      </Typography>
    )
  if (mute) return <Typography>Will not change anima (mute)</Typography>

  const newLevel = Math.min(current + Math.floor(spending / 5), 3)
  return (
    <Typography>
      Will raise anima from {prettyAnimaLevel(current)} to{' '}
      {prettyAnimaLevel(newLevel)}
    </Typography>
  )
}

interface ExposedProps {
  children: ReactNode
  character: Character | QC
  peripheral?: boolean
  qc?: boolean
}

const MoteSpendWidgetNew = (props: ExposedProps) => {
  const dispatch = useAppDispatch()
  const { children, character, peripheral, qc } = props
  const [isOpen, setOpen, setClosed] = useDialogLogic()
  const [toSpend, setToSpend] = useState(0)
  const [commit, setCommit] = useState(false)
  const [commitName, setCommitName] = useState('')
  const [mute, setMute] = useState(false)
  const [scenelong, setScenelong] = useState(false)

  const max = peripheral
    ? character.motes_peripheral_current
    : character.motes_personal_current

  const min = peripheral
    ? character.motes_peripheral_current -
      (character.motes_peripheral_total - committedPeripheralMotes(character))
    : character.motes_personal_current -
      (character.motes_personal_total - committedPersonalMotes(character))

  const handleAdd = (motes: number) => {
    const newCommit = toSpend + motes <= 0 ? false : commit
    setCommit(newCommit)
    setToSpend(clamp(toSpend + motes, min, max))
  }

  const handleSubmit = () => {
    const pool = peripheral ? 'peripheral' : 'personal'
    const characterType = qc ? 'qc' : 'character'
    let commitments: WithSharedStats['motes_committed'] = []
    if (commit) {
      commitments = [
        ...character.motes_committed,
        {
          pool: pool,
          label: commitName,
          motes: toSpend,
          scenelong: scenelong,
        },
      ]
    }

    dispatch(
      spendMotes(character.id, toSpend, pool, characterType, commitments, mute),
    )
    handleClose()
  }

  const handleClose = () => {
    setClosed()
    setToSpend(0)
    setCommit(false)
    setCommitName('')
    setMute(false)
    setScenelong(false)
  }

  return (
    <>
      <ButtonBase onClick={setOpen}>{children}</ButtonBase>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>
          {toSpend >= 0 ? 'Spend' : 'Recover'}{' '}
          {peripheral ? 'Peripheral' : 'Personal'} Motes
        </DialogTitle>

        <DialogContent>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ResourceDisplay
              current={
                peripheral
                  ? character.motes_peripheral_current
                  : character.motes_personal_current
              }
              total={
                peripheral
                  ? character.motes_peripheral_total
                  : character.motes_personal_total
              }
              committed={
                peripheral
                  ? committedPeripheralMotes(character)
                  : committedPersonalMotes(character)
              }
              label="Current Pool"
            />
          </div>
          <div>
            <Button size="small" onClick={() => handleAdd(-5)}>
              -5
            </Button>
            <Button size="small" onClick={() => handleAdd(-1)}>
              -1
            </Button>
            &nbsp;&nbsp;
            <RatingField
              trait="toSpend"
              value={toSpend}
              label="Motes"
              narrow
              margin="dense"
              max={max}
              min={min}
              onChange={(e) => setToSpend(e.target.value)}
            />
            <Button size="small" onClick={() => setToSpend(0)}>
              0
            </Button>
            <Button size="small" onClick={() => handleAdd(+1)}>
              +1
            </Button>
            <Button size="small" onClick={() => handleAdd(+5)}>
              +5
            </Button>
            <Button size="small" onClick={() => handleAdd(+10)}>
              +10
            </Button>
          </div>

          <div>
            <FormControlLabel
              label="Commit motes?"
              style={{ marginTop: '1em' }}
              control={
                <Checkbox
                  name="commit"
                  checked={commit}
                  onChange={() => setCommit(!commit)}
                  disabled={toSpend < 0}
                />
              }
            />
            {commit && (
              <>
                <TextField
                  name="commitName"
                  value={commitName}
                  label="Commit label"
                  margin="dense"
                  onChange={(e) => setCommitName(e.target.value)}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  label="Scenelong"
                  control={
                    <Checkbox
                      name="scenelong"
                      checked={scenelong}
                      onChange={() => setScenelong(!scenelong)}
                    />
                  }
                />
              </>
            )}
          </div>

          {peripheral && (
            <>
              <div>
                <FormControlLabel
                  label="Mute"
                  control={
                    <Checkbox
                      name="mute"
                      checked={mute}
                      onChange={() => setMute(!mute)}
                    />
                  }
                />
              </div>
              <WillRaiseAnima
                current={character.anima_level}
                spending={toSpend}
                mute={mute}
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <span style={{ flex: 1 }}>
            <MoteCommitmentPopup character={character} qc={props.qc} />
          </span>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {toSpend >= 0 ? 'Spend' : 'Recover'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MoteSpendWidgetNew
