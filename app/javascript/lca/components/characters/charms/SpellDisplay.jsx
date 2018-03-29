import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import styles from './CharmStyles.js'
import BlockPaper from '../../generic/blockPaper.jsx'

function SpellDisplay({ spell, classes }) {
  return <BlockPaper>
    <Typography variant="title">
      { spell.name }
      { spell.control && ' (Control Spell)'}
    </Typography>

    <Typography paragraph>
      <strong>Cost:</strong> { spell.cost };&nbsp;
      <br />

      <strong>Keywords:</strong> { spell.keywords.join(', ') || 'None' }
      <br />

      <strong>Duration:</strong>&nbsp;
      <span className={ classes.capitalize }>{ spell.duration }</span>
      <br />

      <strong>Prerequisite Charms:</strong> { spell.prereqs || 'None' }
    </Typography>

    <Typography className={ classes.charmBody }>{ spell.body }</Typography>

    { spell.ref != '' &&
      <Typography variant="caption">Ref: { spell.ref }</Typography>
    }
  </BlockPaper>
}
SpellDisplay.propTypes = {
  spell: PropTypes.object,
  classes: PropTypes.object,
}
export default withStyles(styles)(SpellDisplay)
