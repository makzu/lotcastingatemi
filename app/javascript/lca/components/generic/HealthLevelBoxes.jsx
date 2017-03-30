import React from 'react'
import styled from 'styled-components'
import * as calc from '../../utils/calculated'

/* TODO replace this css nonsense with svg icons or something */
const DamageDiv = styled.div`
  background-color: white;
  color: transparent;
  width: 1em;
  height: 1em;
  border: 0.15em solid black;
`
const EmptyDamageDiv = DamageDiv


const BashingDamageDiv = styled(DamageDiv)`
  &::after{
    color: black;
    position: relative;
    top: -0.25em;
    left: -0.5em;
    text-align: center;
    font-weight: bold;
    font-size: 125%;
    content: "|";
  }
`
const LethalDamageDiv = styled(DamageDiv)`
  &::after {
    color: black;
    position: relative;
    top: -0.3em;
    left: -0.59em;
    text-align: center;
    font-size: 180%;
    content: "❌";
  }
`
const AggravatedDamageDiv = styled(DamageDiv)`
  &::after {
    color: black;
    position: relative;
    top: -0.25em;
    left: -0.65em;
    text-align: center;
    font-size: 150%;
    content: "✱";
  }
`
const DamageBoxWrap = styled.div`
  display: inline-block;
  margin-right: 2px;
`
const DamageBoxLabel = styled.div`
  font-size: small;
  text-align: center;
  margin: 0 auto;
`

export default function HealthLevelBoxes(props) {
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
      level = "-4"
      lv4s--
    } else if (lvis > 0) {
      level = "in"
      lvis--
    } else {
      level = "X"
    }

    if (aggDamage > 0) {
      box = <DamageBoxWrap key={ i }>
        <AggravatedDamageDiv>◼</AggravatedDamageDiv>
        <DamageBoxLabel>{ level }</DamageBoxLabel>
      </DamageBoxWrap>
      aggDamage--
    } else if (lthDamage > 0) {
      box = <DamageBoxWrap key={ i }>
        <LethalDamageDiv>◩</LethalDamageDiv>
        <DamageBoxLabel>{ level }</DamageBoxLabel>
      </DamageBoxWrap>
      lthDamage--
    } else if (bshDamage > 0) {
      box = <DamageBoxWrap key={ i }>
        <BashingDamageDiv>◫</BashingDamageDiv>
        <DamageBoxLabel>{ level }</DamageBoxLabel>
      </DamageBoxWrap>
      bshDamage--
    } else {
      box = <DamageBoxWrap key={ i }>
        <EmptyDamageDiv>◻</EmptyDamageDiv>
        <DamageBoxLabel>{ level }</DamageBoxLabel>
      </DamageBoxWrap>
    }

    hlBoxes.push(box)
  }

  return (<div className="healthLevelBoxes">
    { hlBoxes }
  </div>)
}
