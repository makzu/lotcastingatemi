import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import ModeEdit from 'material-ui-icons/ModeEdit'

import ContentPageCardMenu from '../generic/CharacterCardMenu'
import { prettyDrillRating } from '../../utils/calculated'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  nameRow: {
    display: 'flex',
  },
  bgName: {
    flex: 1,
    textDecoration: 'none',
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
  controlGroup: {
    display: 'inline-block',
  },
})

function BattlegroupListItem(props) {
  const { battlegroup, classes } = props

  return <Paper className={ classes.root }>
    <div className={ classes.nameRow }>
      <Typography variant="title" className={ classes.bgName }
        component={ Link } to={ `/battlegroups/${battlegroup.id}` }
      >
        { battlegroup.name }
        <Launch className={ classes.icon } />
      </Typography>

      <ContentPageCardMenu characterType="battlegroups" id={ battlegroup.id } />
    </div>

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

    <div className={ classes.controlGroup }>
      <Button component={ Link } to={ `/battlegroups/${battlegroup.id}/edit` }>
        Edit
        <ModeEdit />
      </Button>
    </div>
  </Paper>
}

BattlegroupListItem.propTypes = {
  battlegroup: PropTypes.object,
  classes: PropTypes.object
}

export default withStyles(styles)(BattlegroupListItem)
