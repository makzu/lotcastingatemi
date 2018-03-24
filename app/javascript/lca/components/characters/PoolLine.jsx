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

const PoolLine = ({ label, pool, classes }) => {
  const mb = pool.meritBonus || []
  const merits = mb.map((m) =>
    <div key={ m.label } className={ classes.specialty }>
      { m.situational &&
        <span>+{ m.bonus } </span>
      }{ m.label }
    </div>
  )
  const sp = pool.specialties || []
  const specialties = sp.map((s) =>
    <div key={ s } className={ classes.specialty }>
      +1 { s }
    </div>
  )
  return <div className={ classes.root }>
    <div className={ classes.label }>
      { label }
    </div>
    <div>
      <span className={ classes.pool }>
        { pool.total }
      </span>
      { pool.excellency > 0 &&
        <span className={ classes.excellency }>
          &nbsp;+{ pool.excellency }/{ pool.excellency }m
        </span>
      }
    </div>
    { merits }
    { specialties }
  </div>
}
PoolLine.propTypes = {
  label: PropTypes.string,
  pool: PropTypes.object,
  classes: PropTypes.object,
}

export default withStyles(styles)(PoolLine)
