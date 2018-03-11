import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import ModeEdit from 'material-ui-icons/ModeEdit'

import DeleteButton from '../generic/deleteButton.jsx'
import HideButton from '../generic/hideButton.jsx'
import PinButton from '../generic/pinButton.jsx'
import { prettyDrillRating } from '../../utils/calculated'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  bgName: {
    textDecoration: 'none',
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
})

function BattlegroupListItem(props) {
  const { battlegroup, classes } = props

  return <div>
    <Paper className={ classes.root }>
      <Typography variant="title" className={ classes.bgName }
        component={ Link } to={ `/battlegroups/${battlegroup.id}` }
      >
        { battlegroup.name }
        <Launch className={ classes.icon } />
      </Typography>

      <Typography paragraph>
        Size { battlegroup.size },{' '}
        { prettyDrillRating(battlegroup) } Drill
        { battlegroup.might > 0 &&
          <span>, Might { battlegroup.might }</span>
        }
        { battlegroup.perfect_morale &&
          <span>, Perfect Morale</span>
        }
      </Typography>

      <Button component={ Link } to={ `/battlegroups/${battlegroup.id}/edit` }>
        Edit
        <ModeEdit />
      </Button>

      <HideButton characterType="battlegroups" id={ battlegroup.id } />
      <PinButton characterType="battlegroups" id={ battlegroup.id } />
      <DeleteButton characterType="battlegroups" id={ battlegroup.id } />
    </Paper>
  </div>
}

BattlegroupListItem.propTypes = {
  battlegroup: PropTypes.object,
  classes: PropTypes.object
}

export default withStyles(styles)(BattlegroupListItem)
