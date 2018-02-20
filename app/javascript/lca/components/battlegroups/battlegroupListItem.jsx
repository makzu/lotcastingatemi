import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import { prettyDrillRating } from '../../utils/calculated'

//import { fullBattlegroup } from '../../utils/propTypes'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
})

function BattlegroupListItem(props) {
  const { battlegroup, classes } = props

  return <div>
    <Paper className={ classes.root }>
      <Typography variant="title">
        { battlegroup.name }
      </Typography>

      <Typography paragraph>
        Size { battlegroup.size },{' '}
        { prettyDrillRating(battlegroup) } Drill
        { battlegroup.might > 0 &&
          <span>, Might { battlegroup.might }</span>
        }
      </Typography>

      <Button component={ Link } to={ `/battlegroups/${battlegroup.id}` }>
        Full Sheet
      </Button>
      <Button component={ Link } to={ `/battlegroups/${battlegroup.id}/edit` }>
        Edit
      </Button>
    </Paper>
  </div>
}

BattlegroupListItem.propTypes = {
  battlegroup: PropTypes.object,
  classes: PropTypes.object
}

export default withStyles(styles)(BattlegroupListItem)
