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
import { recoverWillpower } from '@/ducks/events'
import { useAppDispatch, useDialogLogic } from '@/hooks'

const WillpowerRecoverDialog = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch()
  const [isOpen, open, close] = useDialogLogic()
  const [willpower, setWillpower] = useState(0)
  const [exceed, setExceed] = useState(false)
  const [alsoQCs, setAlsoQCs] = useState(false)

  const handleSubmit = () => {
    dispatch(recoverWillpower(id, willpower, exceed, alsoQCs))
    close()
  }

  return (
    <>
      <Button onClick={open}>Recover Willpower</Button>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Recover Willpower</DialogTitle>

        <DialogContent>
          <DialogContentText>
            A good night&apos;s sleep restores one point. Willpower is fully
            restored at the end of each story. Achieving a major character or
            story goal restores 1-3 points, which can exceed the
            character&apos;s permanent rating.
          </DialogContentText>
          <DialogContentText variant="caption">
            (Core p.169-170)
          </DialogContentText>

          <div>
            <Button size="small" onClick={() => setWillpower(willpower - 1)}>
              -1
            </Button>

            <RatingField
              name="willpower"
              value={willpower}
              label="Willpower"
              margin="dense"
              min={0}
              max={10}
              sx={{ ml: 1, mr: 1 }}
              debounceTime={0}
              onChange={(e) => setWillpower(Number(e.target.value))}
            />

            <Button size="small" onClick={() => setWillpower(0)}>
              0
            </Button>
            <Button size="small" onClick={() => setWillpower(willpower + 1)}>
              +1
            </Button>
            <Button size="small" onClick={() => setWillpower(willpower + 5)}>
              +5
            </Button>
          </div>

          <FormControlLabel
            label="Exceed permanent ratings (max 10)"
            control={
              <Checkbox
                name="exceed"
                checked={exceed}
                onChange={() => setExceed(!exceed)}
              />
            }
          />

          <br />

          <FormControlLabel
            label="Include QCs"
            control={
              <Checkbox
                name="qcs"
                checked={alsoQCs}
                onChange={() => setAlsoQCs(!alsoQCs)}
              />
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Recover
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default WillpowerRecoverDialog
