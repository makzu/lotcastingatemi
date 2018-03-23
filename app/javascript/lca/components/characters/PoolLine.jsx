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
  },
  excellency: { ...theme.typography.caption,
  },
})

const PoolLine = ({ label, pool, classes }) =>
  <div className={ classes.root }>
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
    { pool.meritBonus > 0 &&
      <div className={ classes.specialty }>
        &nbsp;+{ pool.meritBonus } { pool.meritName }
      </div>
    }
    { pool.specialties.length > 0 &&
      <div className={ classes.specialty }>
        &nbsp;+1 { pool.specialties.join(', ') }
      </div>
    }
  </div>
PoolLine.propTypes = {
  label: PropTypes.string,
  pool: PropTypes.object,
  classes: PropTypes.object,
}

export default withStyles(styles)(PoolLine)
