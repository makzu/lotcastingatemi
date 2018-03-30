import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import styles from './CharmStyles.js'
import BlockPaper from '../../generic/blockPaper.jsx'

function CharmDisplay({ charm, classes }) {
  return <BlockPaper>
    <Typography variant="title">
      { charm.name }
    </Typography>

    { charm.type == 'Evocation' && charm.artifact_name != '' &&
      <Typography variant="caption" className={ classes.capitalize }>
        Evocation of { charm.artifact_name }
      </Typography>
    }
    { charm.type == 'MartialArtsCharm' &&
      <Typography variant="caption" className={ classes.capitalize }>
        { charm.style } Style
      </Typography>
    }

    <Typography paragraph>
      <strong>Cost:</strong> { charm.cost };&nbsp;
      <strong>Mins:</strong>&nbsp;
      { charm.ability &&
        <span className={ classes.capitalize }>
          { charm.ability } { charm.min_ability},&nbsp;
        </span>
      }
      { charm.type == 'MartialArtsCharm' &&
        <span className={ classes.capitalize }>
          Martial Arts ({ charm.style } style) { charm.min_ability},&nbsp;
        </span>
      }
      Essence { charm.min_essence }
      <br />

      <strong>Type:</strong>&nbsp;
      <span className={ classes.capitalize }>{ charm.timing }</span>
      <br />

      <strong>Keywords:</strong> { charm.keywords.join(', ') || 'None' }
      <br />

      <strong>Duration:</strong>&nbsp;
      <span className={ classes.capitalize }>{ charm.duration }</span>
      <br />

      <strong>Prerequisite Charms:</strong> { charm.prereqs || 'None' }
    </Typography>

    <Typography className={ classes.charmBody }>{ charm.body }</Typography>

    { charm.ref != '' &&
      <Typography variant="caption">Ref: { charm.ref }</Typography>
    }
  </BlockPaper>
}
CharmDisplay.propTypes = {
  charm: PropTypes.object,
  classes: PropTypes.object,
}
export default withStyles(styles)(CharmDisplay)
