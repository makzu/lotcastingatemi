import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  label: { ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
  },
  current: { ...theme.typography.display1,
    display: 'inline-block',
    verticalAlign: 'top',
  },
  total: { ...theme.typography.body1,
    display: 'inline-block',
    verticalAlign: 'top',
    marginTop: '0.25em',
  },
})

const ResourceDisplay = ({ current, total, label, className, classes }) =>
  <div className={ className }>
    <div className={ classes.label }>
      { label }
    </div>
    <div>
      <span className={classes.current }>
        { current }
      </span>
      <span className={ classes.total }>
        /{ total }
      </span>
    </div>
  </div>
ResourceDisplay.propTypes = {
  current: PropTypes.integer,
  total: PropTypes.integer,
  label: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.object,
}

export default withStyles(styles)(ResourceDisplay)
