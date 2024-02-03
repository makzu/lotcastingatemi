import { Component } from 'react'

import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'
import { type SxProps } from '@mui/material/styles'

import type { Pool } from '@/utils/flow-types'
import AttackTagsDisplay from './AttackTagsDisplay'

const poolSx: SxProps = {
  typography: 'body2',
  fontSize: '1.25rem',
  lineHeight: 'inherit',
}

const labelSx: SxProps = {
  typography: 'body1',
  fontSize: '0.75rem',
  fontWeight: 500,
  opacity: 0.7,
}

const specialtySx: SxProps = {
  typography: 'caption',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}

interface Props {
  label: string
  pool: Pool
  noSummary?: boolean
  qc?: boolean
  battlegroup?: boolean
  className?: string
  sx?: SxProps
}

class PoolDisplay extends Component<Props, { open: boolean }> {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: false,
    }
    this.setOpen = this.setOpen.bind(this)
    this.setClosed = this.setClosed.bind(this)
  }

  setOpen = () => {
    if (
      this.props.noSummary ||
      (this.props.qc ?? this.props.battlegroup) ||
      this.props.pool.noSummary
    )
      return
    this.setState({
      open: true,
    })
  }
  setClosed = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const { label, pool } = this.props
    const { open } = this.state
    const { setOpen, setClosed } = this
    const mb = pool.bonus || []
    const pen = pool.penalties || []
    const sp = pool.specialties || []

    const merits = mb.map((m) => (
      <Box key={m.label} sx={specialtySx}>
        {m.situational && (
          <span>
            {m.bonus != null && m.bonus > 0 && '+'}
            {m.bonus}{' '}
          </span>
        )}
        {m.label}
      </Box>
    ))
    const fullMerits = mb
      .filter((m) => !m.noFull)
      .map((m) => (
        <div key={m.label}>
          {m.situational && (
            <Typography variant="caption" component="span">
              (conditional){' '}
            </Typography>
          )}
          {m.bonus != null && m.bonus > 0 && '+'}
          {m.bonus !== 0 && m.bonus} {m.label}
        </div>
      ))
    const fullPen = pen.map((p) =>
      p.penalty !== 0 ? (
        <div key={p.label}>
          -{p.penalty} {p.label}
        </div>
      ) : (
        <span key={p.label} />
      ),
    )
    const showSpecialties =
      sp.length > 0 && ((pool.rating && pool.specialtyMatters) || !pool.rating)
    const hideCursor =
      this.props.noSummary ||
      this.props.qc ||
      this.props.battlegroup ||
      this.props.pool.noSummary
    return (
      <>
        {
          // TODO: add ButtonBase here
        }
        <Box
          sx={{ width: '5.5rem', maxHeight: '5rem', ...this.props.sx }}
          className={this.props.className}
          onClick={setOpen}
        >
          <Box sx={hideCursor ? {} : { cursor: 'pointer' }}>
            <Box sx={labelSx}>{label}</Box>
            <div>
              <Box component="span" sx={poolSx}>
                {pool.total}
              </Box>
              {(pool.excellency ?? 0) > 0 && (
                <Typography variant="caption" component="span">
                  &nbsp;+
                  {pool.excellency}/{pool.excellencyCost}m
                </Typography>
              )}
              {(pool.minimum ?? 0) > 0 && (
                <Typography variant="caption" component="span">
                  &nbsp;min {pool.minimum}
                </Typography>
              )}
            </div>
            {(pool.excellencyStunt ?? 0) > 0 && (
              <Typography variant="caption">
                stunt +{pool.excellencyStunt}/{pool.excellencyStuntCost}m
              </Typography>
            )}
            {merits}
            {showSpecialties && <Box sx={specialtySx}>+1 specialty</Box>}
          </Box>
        </Box>

        <Dialog open={open} onClose={setClosed}>
          <DialogTitle>{pool.name} Summary</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Total:{' '}
              <Box component="span" sx={poolSx}>
                {pool.total}
              </Box>
              {(pool.excellency ?? 0) > 0 && (
                <span>
                  &nbsp;&nbsp;&nbsp; Can add up to {pool.excellency}
                  &nbsp;
                  {!pool.rating && (
                    <span>
                      di
                      {pool.excellency === 1 ? 'e ' : 'ce '}
                    </span>
                  )}
                  for {pool.excellencyCost}m
                  {(pool.excellencyStunt ?? 0) > 0 && (
                    <span>
                      &nbsp;(
                      {pool.excellencyStunt} for {pool.excellencyStuntCost}m on
                      stunt)
                    </span>
                  )}
                </span>
              )}
            </DialogContentText>

            {pool.attribute && (
              <DialogContentText
                style={{
                  textTransform: 'capitalize',
                }}
              >
                {pool.ability && '('}
                {pool.attribute} {pool.attributeRating}
                {pool.ability && (
                  <span>
                    {' '}
                    + {pool.ability} {pool.abilityRating})
                  </span>
                )}
                {pool.attack === 'withering' && (
                  <span> + {pool.accuracy} weapon accuracy</span>
                )}
                {(pool.weaponDamage ?? 0) > 0 && (
                  <span> + {pool.weaponDamage} weapon damage</span>
                )}
                {pool.rating && ' /2'}
                {pool.parry && <span> + {pool.defense} weapon defense</span>}
                {(pool.raw ?? 0) > 0 && <span> = {pool.raw}</span>}
              </DialogContentText>
            )}

            {pool.damageType && (
              <DialogContentText>
                Attacks will deal {pool.damageType} damage
              </DialogContentText>
            )}

            {pool.soak && (
              <DialogContentText>
                {pool.natural} Natural
                {(pool.armored ?? 0) > 0 && (
                  <span> + {pool.armored} from Armor</span>
                )}
              </DialogContentText>
            )}

            {(pool.totalPenalty ?? 0) !== 0 && (
              <DialogContentText>
                -{pool.totalPenalty} Penalties
              </DialogContentText>
            )}

            <AttackTagsDisplay pool={pool} />

            {fullMerits.length + fullPen.length > 0 && (
              <DialogContentText
                component="div"
                sx={{ textTransform: 'capitalize', marginTop: '0.5em' }}
              >
                <div>Bonuses / Penalties:</div>
                {fullMerits}
                {fullPen}
              </DialogContentText>
            )}

            {sp.length > 0 && (
              <DialogContentText component="div" style={{ marginTop: '0.5em' }}>
                Specialties:&nbsp;
                <span className="capitalize">{sp.join(', ')}</span>
                {pool.rating && (
                  <>
                    {pool.specialtyMatters && (
                      <div>
                        Specialt
                        {sp.length === 1 ? 'y ' : 'ies '}
                        <strong>will</strong> increase rating by 1
                      </div>
                    )}
                    {!pool.specialtyMatters && (
                      <div>
                        Specialt
                        {sp.length === 1 ? 'y ' : 'ies '}
                        <strong>will not</strong> affect rating
                      </div>
                    )}
                  </>
                )}
              </DialogContentText>
            )}

            {pool.minimum != null && (
              <DialogContentText component="div">
                <div>
                  Add Threshhold Successes from the attack roll to get Raw
                  Damage
                </div>
                <div>
                  Subtract enemy soak from Raw Damage to get your total damage
                  pool
                </div>
                Minimum pool
                <Box component="span" sx={poolSx}>
                  {' '}
                  {pool.minimum}
                </Box>
              </DialogContentText>
            )}
          </DialogContent>
        </Dialog>
      </>
    )
  }
}

export default PoolDisplay
