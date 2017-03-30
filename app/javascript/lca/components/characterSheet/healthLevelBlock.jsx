import React from 'react'

import Divider from 'material-ui/Divider'

import HealthLevelPopup from './editors/healthLevelPopup.jsx'
import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'

export default function HealthLevelBlock(props) {
  const { character } = props

  return (<div className="healthLevelBlock">
    <h3>Health Levels<HealthLevelPopup character={ character } /></h3>
    <HealthLevelBoxes character={ character } />
    <Divider />
  </div>)
}
