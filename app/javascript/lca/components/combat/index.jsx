// @flow
import React, { Component } from 'react'
import FlipMove from 'react-flip-move'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import CharacterCard from './CharacterCombatCard.jsx'
import QcCard from './QcCombatCard.jsx'
import BattlegroupCard from './BattlegroupCombatCard.jsx'
import OutOfCombatCard from './OutOfCombatCard.jsx'
import BlockPaper from '../generic/blockPaper.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import {
  getSpecificChronicle,
  getPlayersForChronicle,
  getCharactersForChronicle,
  getQcsForChronicle,
  getBattlegroupsForChronicle,
  getStorytellerForChronicle,
  amIStOfChronicle,
} from 'selectors'
import type {
  Player,
  Character,
  fullQc,
  Battlegroup,
  Chronicle,
} from 'utils/flow-types'

function initiativeSort(a, b) {
  if (a.initiative > b.initiative) {
    return -1
  } else if (a.initiative < b.initiative) {
    return 1
  } else {
    return 0
  }
}
type Props = {
  id: number,
  st: Player,
  is_st: boolean,
  players: Array<Player>,
  characters: Array<Character>,
  qcs: Array<fullQc>,
  battlegroups: Array<Battlegroup>,
  chronicle: Chronicle,
}

class CombatDashboard extends Component<Props> {
  render() {
    /* Escape hatch */
    if (this.props.chronicle == null || this.props.chronicle.name == null)
      return (
        <BlockPaper>
          <Typography paragraph>This Chronicle has not yet loaded.</Typography>
        </BlockPaper>
      )

    const { characters, qcs, battlegroups } = this.props
    const entities = [...characters, ...qcs, ...battlegroups]

    const outOfCombatList = entities.filter(c => !c.in_combat).map(c => (
      <Grid item xs={6} lg={4} xl={3} key={c.type + c.id}>
        <OutOfCombatCard character={c} />
      </Grid>
    ))

    const inCombatEntities = entities
      .filter(c => c.in_combat)
      .sort(initiativeSort)

    const combatCards = inCombatEntities.map(c => (
      <Grid item xs={12} md={6} key={c.id + c.name}>
        {c.type.includes('Character') && <CharacterCard character={c} />}
        {c.type === 'qc' && <QcCard qc={c} />}
        {c.type === 'battlegroup' && <BattlegroupCard battlegroup={c} />}
      </Grid>
    ))

    const nextCharacter = inCombatEntities.filter(c => !c.has_acted)[0]

    return (
      <Grid container spacing={24}>
        <Grid item hidden={{ smUp: true }} xs={12}>
          <div style={{ height: '1em' }}>&nbsp;</div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subheading">
            Current Initiative: {nextCharacter ? nextCharacter.initiative : 0}&nbsp;
            Next up: {nextCharacter ? nextCharacter.name : 'Round over!'}
          </Typography>
        </Grid>

        <FlipMove typeName={null}>{combatCards}</FlipMove>

        <Grid item xs={12}>
          <Typography variant="headline">Out of Combat</Typography>
        </Grid>

        {outOfCombatList}
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.chronicleId

  return {
    id: id,
    chronicle: getSpecificChronicle(state, id),
    st: getStorytellerForChronicle(state, id),
    is_st: amIStOfChronicle(state, id),
    players: getPlayersForChronicle(state, id),
    characters: getCharactersForChronicle(state, id),
    qcs: getQcsForChronicle(state, id),
    battlegroups: getBattlegroupsForChronicle(state, id),
  }
}

export default compose(ProtectedComponent, connect(mapStateToProps))(
  CombatDashboard
)
