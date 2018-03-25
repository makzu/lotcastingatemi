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
  committed: { ...theme.typography.caption,
    display: 'inline-block',
    marginLeft: '-1.3em',
    verticalAlign: 'bottom',
    paddingBottom: '0.25em',
  },
})

const ResourceDisplay = ({ current, total, committed, label, className, classes }) =>
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
      { committed != undefined && committed > 0 &&
        <span className={ classes.committed }>
          { committed }c
        </span>
      }
    </div>
  </div>
ResourceDisplay.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  committed: PropTypes.number,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object,
}

export default withStyles(styles)(ResourceDisplay)
