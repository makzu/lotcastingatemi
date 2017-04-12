import React from 'react'
import PropTypes from 'prop-types'

import Divider from 'material-ui/Divider'

import HealthLevelPopup from './editors/healthLevelPopup.jsx'
import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'

import { woundPenalty } from '../../utils/calculated'
import { withHealthLevels } from '../../utils/propTypes'

export default function HealthLevelBlock(props) {
  const { character } = props

  return (<div className="healthLevelBlock">
    <h3>Health Levels<HealthLevelPopup character={ character } /></h3>
    <HealthLevelBoxes character={ character } />
    <span><strong>Wound Penalty:</strong> -{ woundPenalty(character) }</span>
    <Divider />
  </div>)
}
HealthLevelBlock.propTypes = {
  character: PropTypes.shape(withHealthLevels)
}
