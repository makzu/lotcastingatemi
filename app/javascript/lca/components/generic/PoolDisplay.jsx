// @flow
import React, { Component, Fragment } from 'react'

import Dialog, { DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {

  },
  label: { ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
  },
  labelSpan: {

  },
  pool: { ...theme.typography.body2,
    fontSize: '1.25rem',
    lineHeight: 'inherit',
  },
  specialty: { ...theme.typography.caption,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'noWrap',
  },
  excellency: { ...theme.typography.caption,
  },
})

export type Props = {
  label: string,
  pool: Object,
  noSummary?: boolean,
  qc?: boolean,
  battlegroup?: boolean,
  classes: Object,
}

class PoolDisplay extends Component<Props, { open: boolean }> {
  constructor(props: Props) {
    super (props)
    this.state = { open: false }
    this.setOpen = this.setOpen.bind(this)
    this.setClosed = this.setClosed.bind(this)
  }

  props: Props

  setOpen = () => {
    if (this.props.noSummary || this.props.qc || this.props.battlegroup || this.props.pool.noSummary)
      return

    this.setState({ open: true })
  }

  setClosed = () => {
    this.setState({ open: false })
  }

  render() {
    const { label, pool, classes } = this.props
    const { open, } = this.state
    const { setOpen, setClosed } = this
    const mb = pool.bonus || []
    const pen = pool.penalties || []
    const sp = pool.specialties || []

    const merits = mb.map((m) =>
      <div key={ m.label } className={ classes.specialty }>
        { m.situational &&
          <span>{ m.bonus > 0 && '+' }{ m.bonus } </span>
        }{ m.label }
      </div>
    )
    const fullMerits = mb.map((m) =>
      <div key={ m.label }>
        { m.situational && '(conditional) '}{ m.bonus > 0 && '+' }{ m.bonus } { m.label }
      </div>
    )
    const fullPen = pen.map((p) =>
      p.penalty > 0 ?
        <div key={ p.label }>
          -{ p.penalty } { p.label }
        </div> :
        <span key={ p.label } />
    )

    return <Fragment>
      <div className={ classes.root } onClick={ setOpen }>
        <div className={ classes.label }>
          <span className={ classes.labelSpan }>{ label }</span>
        </div>
        <div>
          <span className={ classes.pool }>
            { pool.total }
          </span>
          { pool.excellency > 0 &&
            <span className={ classes.excellency }>
              &nbsp;+{ pool.excellency }/{ pool.excellencyCost }m
            </span>
          }
          { pool.minimum &&
            <span className={ classes.excellency }>
              &nbsp;min { pool.minimum }
            </span>
          }
        </div>
        { pool.excellencyStunt > 0 &&
          <div className={ classes.excellency }>
            stunt +{ pool.excellencyStunt }/{ pool.excellencyStuntCost }m
          </div>
        }
        { merits }
        { sp.length > 0  && (pool.rating ? pool.specialtyMatters : true) &&
          <div className={ classes.specialty }>
            +1 specialty
          </div>
        }
      </div>
      <Dialog
        open={ open }
        onClose={ setClosed }
      >
        <DialogTitle>
          { pool.name } Summary
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Total: <strong>{ pool.total }</strong>
          </DialogContentText>
          { pool.attribute &&
            <DialogContentText style={{ textTransform: 'capitalize' }}>
              (
              { pool.attribute } { pool.attributeRating }
              { pool.ability &&
                <span> + { pool.ability } { pool.abilityRating }</span>
              }
              )
              { pool.name.endsWith('Withering Attack') &&
                <span> + { pool.accuracy } from weapon</span>
              }
              { pool.witheringDamage &&
                <span> + { pool.weaponDamage } from weapon</span>
              }
              { pool.rating && ' /2'}
              { pool.parry &&
                <span> + { pool.defense } from weapon</span>
              }
              { pool.raw &&
                <span> = { pool.raw }</span>
              }
            </DialogContentText>
          }

          { pool.witheringDamage &&
            <DialogContentText>
              + Threshhold Successes<br />
              - Enemy Soak<br />
              Minimum { pool.minimum }
            </DialogContentText>
          }

          { pool.soak &&
            <DialogContentText>
              { pool.natural } Natural
              { pool.armored > 0 &&
                <span> + { pool.armored } from Armor</span>
              }
            </DialogContentText>
          }

          { pool.excellency > 0 &&
            <DialogContentText component="div" style={{ marginTop: '0.5em' }}>
              Can add up to { pool.excellency }{ !pool.rating && ' dice'} for { pool.excellencyCost }m
              { pool.excellencyStunt > 0 &&
                `( ${pool.excellencyStunt} for ${pool.excellencyStuntCost}m on stunt)`
              }
            </DialogContentText>
          }
          { fullMerits.length > 0 &&
            <DialogContentText component="div" style={{ textTransform: 'capitalize', marginTop: '0.5em' }}>
              <div>Bonuses:</div>
              { fullMerits }
            </DialogContentText>
          }

          { sp.length > 0 &&
            <DialogContentText component="div" style={{ marginTop: '0.5em' }}>
              Specialties:&nbsp;
              <span style={{ textTransform: 'capitalize' }}>
                { pool.specialties.join(', ') }
              </span>
              { pool.rating && pool.specialtyMatters &&
                <div>
                  Specialt{ pool.specialties.length === 1 ? 'y ' : 'ies ' }
                  <strong>will</strong> increase rating by 1
                </div>
              }

              { pool.rating && !pool.specialtyMatters &&
                <div>
                  Specialt{ pool.specialties.length === 1 ? 'y ' : 'ies ' }
                  <strong>will not</strong> affect rating
                </div>
              }
            </DialogContentText>
          }
          { pen.length > 0 &&
            <DialogContentText style={{ textTransform: 'capitalize', marginTop: '0.5em' }}>
              Penalties:<br />
              { fullPen }
            </DialogContentText>
          }

        </DialogContent>
      </Dialog>
    </Fragment>
  }
}

export default withStyles(styles)(PoolDisplay)
