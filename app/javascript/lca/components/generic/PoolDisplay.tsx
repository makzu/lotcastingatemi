import React, { Component, Fragment } from 'react'
import type { Pool } from 'utils/flow-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { withStyles } from '@material-ui/core/styles'
import AttackTagsDisplay from './AttackTagsDisplay'

const styles = (theme) => ({
  root: {},
  clickable: {
    cursor: 'pointer',
  },
  label: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
  },
  labelSpan: {},
  pool: {
    ...theme.typography.body2,
    fontSize: '1.25rem',
    lineHeight: 'inherit',
  },
  specialty: {
    ...theme.typography.caption,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'noWrap',
  },
  excellency: { ...theme.typography.caption },
})

interface Props {
  label: string
  pool: Pool
  noSummary?: boolean
  qc?: boolean
  battlegroup?: boolean
  classes: Record<string, $TSFixMe>
}

class PoolDisplay extends Component<
  Props,
  {
    open: boolean
  }
> {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: false,
    }
    this.setOpen = this.setOpen.bind(this)
    this.setClosed = this.setClosed.bind(this)
  }

  props: Props
  setOpen = () => {
    if (
      this.props.noSummary ||
      this.props.qc ||
      this.props.battlegroup ||
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
    const { label, pool, classes } = this.props
    const { open } = this.state
    const { setOpen, setClosed } = this
    const mb = pool.bonus || []
    const pen = pool.penalties || []
    const sp = pool.specialties || []
    const merits = mb.map((m) => (
      <div key={m.label} className={classes.specialty}>
        {m.situational && (
          <span>
            {m.bonus != null && m.bonus > 0 && '+'}
            {m.bonus}{' '}
          </span>
        )}
        {m.label}
      </div>
    ))
    const fullMerits = mb
      .filter((m) => !m.noFull)
      .map((m) => (
        <div key={m.label}>
          {m.situational && (
            <span className={classes.excellency}>(conditional) </span>
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
      <Fragment>
        {
          // TODO: add ButtonBase here
        }
        <div className={classes.root} onClick={setOpen}>
          <div className={hideCursor ? undefined : classes.clickable}>
            <div className={classes.label}>
              <span className={classes.labelSpan}>{label}</span>
            </div>
            <div>
              <span className={classes.pool}>{pool.total}</span>
              {(pool.excellency || 0) > 0 && (
                <span className={classes.excellency}>
                  &nbsp;+
                  {pool.excellency}/{pool.excellencyCost}m
                </span>
              )}
              {(pool.minimum || 0) > 0 && (
                <span className={classes.excellency}>
                  &nbsp;min {pool.minimum}
                </span>
              )}
            </div>
            {(pool.excellencyStunt || 0) > 0 && (
              <div className={classes.excellency}>
                stunt +{pool.excellencyStunt}/{pool.excellencyStuntCost}m
              </div>
            )}
            {merits}
            {showSpecialties && (
              <div className={classes.specialty}>+1 specialty</div>
            )}
          </div>
        </div>

        <Dialog open={open} onClose={setClosed}>
          <DialogTitle>{pool.name} Summary</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Total: <span className={classes.pool}>{pool.total}</span>
              {(pool.excellency || 0) > 0 && (
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
                  {(pool.excellencyStunt || 0) > 0 && (
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
                {(pool.weaponDamage || 0) > 0 && (
                  <span> + {pool.weaponDamage} weapon damage</span>
                )}
                {pool.rating && ' /2'}
                {pool.parry && <span> + {pool.defense} weapon defense</span>}
                {(pool.raw || 0) > 0 && <span> = {pool.raw}</span>}
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
                {(pool.armored || 0) > 0 && (
                  <span> + {pool.armored} from Armor</span>
                )}
              </DialogContentText>
            )}

            {(pool.totalPenalty || 0) !== 0 && (
              <DialogContentText>
                -{pool.totalPenalty} Penalties
              </DialogContentText>
            )}

            <AttackTagsDisplay pool={pool} />

            {fullMerits.length + fullPen.length > 0 && (
              <DialogContentText
                component="div"
                style={{
                  textTransform: 'capitalize',
                  marginTop: '0.5em',
                }}
              >
                <div>Bonuses / Penalties:</div>
                {fullMerits}
                {fullPen}
              </DialogContentText>
            )}

            {sp.length > 0 && (
              <DialogContentText
                component="div"
                style={{
                  marginTop: '0.5em',
                }}
              >
                Specialties:&nbsp;
                <span
                  style={{
                    textTransform: 'capitalize',
                  }}
                >
                  {sp.join(', ')}
                </span>
                {pool.rating && (
                  <Fragment>
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
                  </Fragment>
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
                <span className={classes.pool}> {pool.minimum}</span>
              </DialogContentText>
            )}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

export default withStyles(styles)(PoolDisplay)
