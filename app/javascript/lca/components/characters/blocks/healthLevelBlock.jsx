import React from 'react'
import PropTypes from 'prop-types'

import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import HealthLevelBoxes from '../../generic/HealthLevelBoxes.jsx'

import { withHealthLevels } from '../../../utils/propTypes'

export default function HealthLevelBlock({ character, penalties }) {
  return <BlockPaper>
    <Typography variant="title">
      Health Levels
    </Typography>

    <HealthLevelBoxes character={ character } />

    <br />
    <Typography>
      <strong>Wound Penalty:</strong> -{ penalties.wound }
    </Typography>
  </BlockPaper>
}
HealthLevelBlock.propTypes = {
  character: PropTypes.shape(withHealthLevels),
  penalties: PropTypes.object,
}
