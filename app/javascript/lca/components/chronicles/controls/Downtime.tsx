import { useState, type ChangeEvent } from 'react'

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material'

import { useAppDispatch, useDialogLogic } from '@/hooks'
import RatingField from '@/components/fields/RatingField'
import { downtime } from '@/ducks/events/chronicle'

const DowntimeDialog = ({ id }: { id: number }) => {
  const [isOpen, open, close] = useDialogLogic()
  const [time, setTime] = useState(1)
  const [parsedTime, setParsedTime] = useState(1)
  const [days, setDays] = useState(false)
  const [endScene, setEndScene] = useState(true)
  const dispatch = useAppDispatch()

  const submit = () => {
    dispatch(downtime(id, time, endScene))
    close()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (days) {
      setTime(Number(value) * 24)
      setParsedTime(Number(value))
    } else {
      setTime(Number(value))
      setParsedTime(Number(value))
    }
  }

  const handleSwitch = () => {
    if (days) {
      setTime(time * 24)
    } else {
      setTime(Math.ceil(time / 24))
    }
    setDays(!days)
  }

  const handleSetHours = (hours: number) => {
    setTime(hours)
    setParsedTime(hours)
    setDays(false)
  }

  const handleSetDays = (days: number) => {
    setTime(days * 24)
    setParsedTime(days)
    setDays(true)
  }

  return (
    <>
      <Button onClick={open}>Downtime...</Button>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Downtime</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Simulate a set period of time elapsing. All Characters and QCs in
            the Chronicle will recover motes, willpower, and health as
            appropriate, and their anima banners will drop to dim.
          </DialogContentText>
          <DialogContentText variant="caption" sx={{ mb: 1 }}>
            Note: This is not cumulative. For example, if a particular wound
            would need 2 days to heal, doing 2 one-day downtimes will not heal
            it.
          </DialogContentText>

          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RatingField
              name="time"
              label="Time"
              value={parsedTime}
              onChange={handleChange}
              debounceTime={0}
              min={0}
            />
            <Typography variant="caption">Days</Typography>
            <Switch checked={days} onChange={handleSwitch} />
            <Typography variant="caption">Hours</Typography>
          </Stack>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Button size="small" onClick={() => handleSetHours(1)}>
              1 hour
            </Button>
            <Button size="small" onClick={() => handleSetHours(4)}>
              4 hours
            </Button>
            <Button size="small" onClick={() => handleSetHours(8)}>
              Overnight
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
            <Button size="small" onClick={() => handleSetDays(1)}>
              1 Day
            </Button>
            <Button size="small" onClick={() => handleSetDays(7)}>
              1 Week
            </Button>
            <Button size="small" onClick={() => handleSetDays(30)}>
              1 Month
            </Button>
            <Button size="small" onClick={() => handleSetDays(90)}>
              1 Season
            </Button>
          </Box>

          <FormControlLabel
            label="End Scene-Longs"
            control={
              <Checkbox
                name="endScene"
                checked={endScene}
                onChange={() => setEndScene(!endScene)}
              />
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close}>Close</Button>
          <Button variant="contained" color="primary" onClick={submit}>
            Downtime
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DowntimeDialog
