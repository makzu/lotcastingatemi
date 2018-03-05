import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import HideButton from '../generic/hideButton'
import PinButton from '../generic/pinButton.jsx'
import { prettyDrillRating } from '../../utils/calculated'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  })
})

function BattlegroupListItem(props) {
  const { battlegroup, classes } = props

  return <div>
    <Paper className={ classes.root }>
      <Typography variant="title">
        { battlegroup.name }

        <HideButton characterType="battlegroups" id={ battlegroup.id } />
        <PinButton characterType="battlegroups" id={ battlegroup.id } />
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
