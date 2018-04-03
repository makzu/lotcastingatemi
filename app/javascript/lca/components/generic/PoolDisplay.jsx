import React from 'react'
import PropTypes from 'prop-types'

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

const PoolDisplay = ({ label, pool, staticRating, qc, battlegroup, classes }) => {
  const mb = pool.meritBonus || []
  const merits = mb.map((m) =>
    <div key={ m.label } className={ classes.specialty }>
      { m.situational &&
        <span>+{ m.bonus } </span>
      }{ m.label }
    </div>
  )
  const sp = pool.specialties || []
  /*
  const specialties = sp.map((s) =>
    <div key={ s } className={ classes.specialty }>
      +1 { s }
    </div>
  )
  // */
  return <div className={ classes.root }>
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
    { sp.length > 0  && (staticRating ? pool.specialtyMatters : true) &&
      <div className={ classes.specialty }>
        +1 specialty
      </div>
    }
  </div>
}
PoolDisplay.propTypes = {
  label: PropTypes.string,
  pool: PropTypes.object.isRequired,
  qc: PropTypes.bool,
  battlegroup: PropTypes.bool,
  staticRating: PropTypes.bool,
  classes: PropTypes.object,
}

export default withStyles(styles)(PoolDisplay)
