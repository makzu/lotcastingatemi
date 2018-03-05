import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import HideButton from '../generic/hideButton'
import PinButton from '../generic/pinButton.jsx'
import { fullQc } from '../../utils/propTypes'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  })
})

function QcListItem(props) {
  const { qc, classes } = props

  return <div>
    <Paper className={ classes.root }>
      <Typography variant="title">
        { qc.name }

        <HideButton characterType="qcs" id={ qc.id } />
        <PinButton characterType="qcs" id={ qc.id } />
      </Typography>

      <Button component={ Link } to={ `/qcs/${qc.id}` }>
        Full Sheet
      </Button>
      <Button component={ Link } to={ `/qcs/${qc.id}/edit` }>
        Edit
      </Button>
    </Paper>
  </div>
}

QcListItem.propTypes = {
  qc: PropTypes.shape(fullQc),
  classes: PropTypes.object
}

export default withStyles(styles)(QcListItem)
