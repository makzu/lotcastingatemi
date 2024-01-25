import { useState } from 'react'

import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import ResourceDisplay from '@/components/displays/ResourceDisplay'
import RatingField from '@/components/fields/RatingField'
import { useDialogLogic } from '@/hooks'
import { totalMagnitude } from '@/utils/calculated'
import type { Battlegroup } from '../types'
import BattlegroupPoolDisplay from './BattlegroupPoolDisplay'

interface BattlegroupHealthDisplayProps {
  battlegroup: Battlegroup
}

const BattlegroupHealthDisplay = (props: BattlegroupHealthDisplayProps) => {
  const { battlegroup } = props
  const [isOpen, setOpen, setClosed] = useDialogLogic()
  const [magnitude, setMagnitude] = useState(battlegroup.magnitude)
  const [size, setSize] = useState(battlegroup.size)

  return (
    <>
      <ButtonBase onClick={setOpen} sx={{ alignItems: 'inherit' }}>
        <Box sx={{ mr: 1, minWidth: '4.5rem' }}>
          <ResourceDisplay
            label="Magnitude"
            current={battlegroup.magnitude}
            total={totalMagnitude(battlegroup)}
          />
        </Box>
        <Box sx={{ mr: 1, minWidth: '4.5rem' }}>
          <BattlegroupPoolDisplay label="Size" value={props.battlegroup.size} />
        </Box>
      </ButtonBase>

      <Dialog open={isOpen} onClose={setClosed}>
        <DialogTitle>Battlegroup Health</DialogTitle>

        <DialogContent>
          <div className="flexContainer">
            <div className="flex">
              <ResourceDisplay
                label="Current Magnitude"
                current={battlegroup.magnitude}
                total={totalMagnitude(battlegroup)}
              />
            </div>

            <div className="flex align">
              <BattlegroupPoolDisplay
                label="Current Size"
                value={battlegroup.size}
              />
            </div>
          </div>

          <div className="flexContainer">
            <div className="flex align">
              <RatingField
                label="Magnitude"
                value={magnitude}
                onChange={(e) => setMagnitude(Number(e.target.value))}
              />
              <span>
                {' / ' + totalMagnitude({ ...battlegroup, size: size })}
              </span>
            </div>

            <div className="flex">
              <RatingField
                label="Size"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </div>
          </div>

          <DialogContentText variant="caption" sx={{ mt: 1 }}>
            BG Damage and Rout rules can be found in Core p.208-209
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={setClosed}>Close</Button>
          <Button onClick={setClosed} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BattlegroupHealthDisplay
