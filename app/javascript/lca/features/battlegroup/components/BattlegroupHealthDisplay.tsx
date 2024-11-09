import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'

import ResourceDisplay from '@/components/displays/ResourceDisplay'
import BattlegroupPoolDisplay from '@/components/displays/pools/BattlegroupPoolDisplay'
import RatingField from '@/components/fields/RatingField'
import PoolStack from '@/components/shared/PoolStack'
import { useDialogLogic } from '@/hooks'
import { totalMagnitude } from '@/utils/calculated'
import type { Battlegroup } from '../types'

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
      <ButtonBase onClick={setOpen}>
        <PoolStack>
          <ResourceDisplay
            label="Magnitude"
            current={battlegroup.magnitude}
            total={totalMagnitude(battlegroup)}
          />
          <BattlegroupPoolDisplay
            sx={{ textAlign: 'left' }}
            label="Size"
            value={props.battlegroup.size}
          />
        </PoolStack>
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
                id={`magnitude-${battlegroup.id}`}
                name="magnitude"
                value={magnitude}
                onChange={(e) => setMagnitude(Number(e.target.value))}
              />
              <span>
                {` / ${totalMagnitude({ ...battlegroup, size: size })}`}
              </span>
            </div>

            <div className="flex">
              <RatingField
                label="Size"
                id={`size-${battlegroup.id}`}
                name="size"
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
          <Button variant="contained" color="primary" onClick={setClosed}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BattlegroupHealthDisplay
