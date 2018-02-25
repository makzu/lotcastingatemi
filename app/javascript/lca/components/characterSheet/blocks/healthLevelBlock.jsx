import React from 'react'
import PropTypes from 'prop-types'

import Typography from 'material-ui/Typography'

import BlockPaper from './blockPaper.jsx'
import HealthLevelPopup from '../editors/healthLevelPopup.jsx'
import HealthLevelBoxes from '../../generic/HealthLevelBoxes.jsx'

import { woundPenalty } from '../../../utils/calculated'
import { withHealthLevels } from '../../../utils/propTypes'

export default function HealthLevelBlock(props) {
  const { character } = props

  return <BlockPaper>
    <Typography variant="title">
      Health Levels
      <HealthLevelPopup character={ character } />
    </Typography>

    <HealthLevelBoxes character={ character } />

    <br />
    <Typography>
      <strong>Wound Penalty:</strong> -{ woundPenalty(character) }
    </Typography>
  </BlockPaper>
}
HealthLevelBlock.propTypes = {
  character: PropTypes.shape(withHealthLevels)
}
