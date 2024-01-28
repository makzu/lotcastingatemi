import { useState } from 'react'

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from '@mui/material'

import RatingField from '@/components/fields/RatingField'
import { respireMotes } from '@/ducks/events'
import { useAppDispatch, useDialogLogic } from '@/hooks'

const MoteRespireDialog = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()
  const [motes, setMotes] = useState(0)
  const [qcs, setQcs] = useState(false)

  const handleSubmit = () => {
    dispatch(respireMotes(id, motes, qcs))
    close()
  }

  return (
    <>
      <Button onClick={open}>Respire Motes</Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Respire Motes</DialogTitle>

        <DialogContent>
          <DialogContentText>
            In combat, characters recover 5 motes per round. Out of combat,
            characters recover 5 motes per hour, or 10 while very relaxed.
          </DialogContentText>
          <DialogContentText>
            Peripheral pools are replenished before Personal.
          </DialogContentText>
          <DialogContentText variant="caption">(Core, p.174)</DialogContentText>

          <div>
            <Button size="small" onClick={() => setMotes(motes - 5)}>
              -5
            </Button>
            <Button size="small" onClick={() => setMotes(motes - 1)}>
              -1
            </Button>

            <RatingField
              name="toRecover"
              value={motes}
              label="Motes"
              margin="dense"
              min={0}
              debounceTime={0}
              sx={{ ml: 1, mr: 1 }}
              onChange={(e) => setMotes(Number(e.target.value))}
            />

            <Button size="small" onClick={() => setMotes(0)}>
              0
            </Button>
            <Button size="small" onClick={() => setMotes(motes + 1)}>
              +1
            </Button>
            <Button size="small" onClick={() => setMotes(motes + 5)}>
              +5
            </Button>
            <Button size="small" onClick={() => setMotes(motes + 10)}>
              +10
            </Button>
          </div>

          <FormControlLabel
            label="Include QCs"
            control={
              <Checkbox
                name="qcs"
                checked={qcs}
                onChange={() => setQcs(!qcs)}
              />
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Close</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Respire
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MoteRespireDialog
