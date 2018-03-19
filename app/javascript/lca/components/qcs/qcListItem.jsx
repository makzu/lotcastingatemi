import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import ModeEdit from 'material-ui-icons/ModeEdit'

import DeleteButton from '../generic/deleteButton'
import HideButton from '../generic/hideButton'
import PinButton from '../generic/pinButton.jsx'
import { fullQc } from '../../utils/propTypes'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  qcName: {
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

function QcListItem({ qc, classes }) {
  return <Paper className={ classes.root }>
    <Typography variant="title" className={ classes.qcName }
      component={ Link } to={ `/qcs/${qc.id}` }
    >
      { qc.name }
      <Launch className={ classes.icon } />
    </Typography>

    <div className={ classes.controlGroup }>
      <Button component={ Link } to={ `/qcs/${qc.id}/edit` }>
        Edit
        <ModeEdit />
      </Button>
      <DeleteButton characterType="qcs" id={ qc.id } />
    </div>

    <div className={ classes.controlGroup }>
      <HideButton characterType="qcs" id={ qc.id } />
      <PinButton characterType="qcs" id={ qc.id } />
    </div>
  </Paper>
}

QcListItem.propTypes = {
  qc: PropTypes.shape(fullQc),
  classes: PropTypes.object
}

export default withStyles(styles)(QcListItem)
