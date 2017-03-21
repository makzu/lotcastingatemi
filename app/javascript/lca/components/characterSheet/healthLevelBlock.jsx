import React from 'react'

import Divider from 'material-ui/Divider'

import HealthLevelPopup from './editors/healthLevelPopup.jsx'

import * as calc from '../../utils/calculated'

function EmptyDamageBox(props) {
  return (<div className="damageBox emptyDamageBox">◻</div>)
}

function BashingDamageBox(props) {
  return (<div className="damageBox bashingDamageBox">◫
  </div>)
}

function LethalDamageBox(prop) {
  return (<div className="damageBox lethalDamageBox">◩</div>)
}

function AggravatedDamageBox(props) {
  return (<div className="damageBox aggravatedDamageBox">◼</div>)
}

export default function HealthLevelBlock(props) {
  const { character } = props
  const totalHealthLevels = calc.totalHealthLevels(character)

  let hlBoxes = []
  let box
  let level

  let aggDamage = character.damage_aggravated
  let lthDamage = character.damage_lethal
  let bshDamage = character.damage_bashing

  let lv0s = character.health_level_0s
  let lv1s = character.health_level_1s
  let lv2s = character.health_level_2s
  let lv4s = character.health_level_4s
  let lvis = character.health_level_incap

  for (var i = 0; i < totalHealthLevels; i++) {
    if (lv0s > 0) {
      level = "0"
      lv0s--
    } else if (lv1s > 0) {
      level = "-1"
      lv1s--
    } else if (lv2s > 0) {
      level = "-2"
      lv2s--
    } else if (lv4s > 0) {
      level = "-1"
      lv4s--
    } else if (lvis > 0) {
      level = "in"
      lvis--
    } else {
      level = "X"
    }

    if (aggDamage > 0) {
      box = <div key={ i } className="damageBoxWrapper"><AggravatedDamageBox level={ level } /><span className="damageBoxLevel">{ level }</span></div>
      aggDamage--
    } else if (lthDamage > 0) {
      box = <div key={ i } className="damageBoxWrapper"><LethalDamageBox level={ level } /><span className="damageBoxLevel">{ level }</span></div>
      lthDamage--
    } else if (bshDamage > 0) {
      box = <div key={ i } className="damageBoxWrapper"><BashingDamageBox level={ level } /><span className="damageBoxLevel">{ level }</span></div>
      bshDamage--
    } else {
      box = <div key={ i } className="damageBoxWrapper"><EmptyDamageBox level={ level } /><span className="damageBoxLevel">{ level }</span></div>
    }

    hlBoxes.push(box)
  }

  return (<div className="healthLevelBlock">
    <h3>Health Levels<HealthLevelPopup character={ character } boxes={ hlBoxes } /></h3>
    { hlBoxes }
    <Divider />
  </div>)
}
