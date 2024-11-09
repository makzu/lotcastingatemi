import {
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material'

import PoolDisplayLabel from '@/components/displays/pools/DisplayLabel'
import PoolDisplayNumericValue from '@/components/displays/pools/PoolDisplayNumericValue'
import PoolDisplayStringValue from '@/components/displays/pools/PoolDisplayStringValue'
import { useDialogLogic } from '@/hooks'
import type { QC } from '../types'
import { qcWoundPenalty } from '../utils'

interface Props {
  qc: QC
  label: string
  value: number | string
  ignoreWoundPenalty?: boolean
  defense?: boolean
}

const QcPoolDisplay = (props: Props) => {
  const [isOpen, open, close] = useDialogLogic()

  const { qc } = props
  let penalties = 0
  const woundPenalty = qcWoundPenalty(qc)
  if (!props.ignoreWoundPenalty) penalties += woundPenalty
  if (props.defense) penalties += qc.onslaught

  const isString = typeof props.value === 'string'
  let value = props.value
  if (typeof value === 'number') {
    value = Math.max(0, value - penalties)
  }
  const ValueDisplay = isString
    ? PoolDisplayStringValue
    : PoolDisplayNumericValue

  return (
    <>
      <ButtonBase onClick={open}>
        <Box sx={{ textAlign: 'left', minWidth: '4rem' }}>
          <PoolDisplayLabel>{props.label}</PoolDisplayLabel>
          <ValueDisplay>{value}</ValueDisplay>
        </Box>
      </ButtonBase>

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>{props.label} Summary</DialogTitle>
        <DialogContent>
          <DialogContentText>Total: {value}</DialogContentText>

          {penalties === 0 ? (
            <DialogContentText>No penalties</DialogContentText>
          ) : (
            <>
              <Divider sx={{ my: 1 }} />
              <DialogContentText>Base: {props.value}</DialogContentText>

              {!props.ignoreWoundPenalty && woundPenalty > 0 && (
                <DialogContentText>
                  -{qcWoundPenalty(qc)} Wound Penalty
                </DialogContentText>
              )}

              {props.defense && qc.onslaught > 0 && (
                <DialogContentText>
                  -{qc.onslaught} Onslaught Penalty
                </DialogContentText>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default QcPoolDisplay
