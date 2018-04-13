import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import CharacterCard from '../characters/CharacterCard.jsx'
import QcCard from '../qcs/QcCard.jsx'
import BattlegroupCard from '../battlegroups/BattlegroupCard.jsx'
import OutOfCombatCard from './OutOfCombatCard.jsx'
import BlockPaper from '../generic/blockPaper.jsx'

import ProtectedComponent from '../../containers/ProtectedComponent.jsx'
import {
  getSpecificChronicle, getPlayersForChronicle,
  getCharactersForChronicle, getQcsForChronicle, getBattlegroupsForChronicle,
  getStorytellerForChronicle, amIStOfChronicle,
} from '../../selectors'

function initiativeSort(a, b) {
  if      (a.initiative > b.initiative) { return -1 }
  else if (a.initiative < b.initiative) { return  1 }
  else { return 0 }
}

class ChronicleCombatDashboard extends Component {
  render() {
    /* Escape hatch */
    if (this.props.chronicle == undefined || this.props.chronicle.name == undefined)
      return <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>

    const { characters, qcs, battlegroups } = this.props

    const characterList = characters.filter((c) => !c.in_combat).map((c) =>
      <Grid item xs={ 6 } lg={ 4 } xl={ 3 } key={ c.id }>
        <OutOfCombatCard character={ c } />
      </Grid>
    )
    const qcList = qcs.filter((c) => !c.in_combat).map((c) =>
      <Grid item xs={ 6 } lg={ 4 } xl={ 3 } key={ c.id }>
        <OutOfCombatCard character={ c } />
      </Grid>
    )
    const bgList = battlegroups.filter((c) => !c.in_combat).map((c) =>
      <Grid item xs={ 6 } lg={ 4 } xl={ 3 } key={ c.id }>
        <OutOfCombatCard character={ c } />
      </Grid>
    )

    const inCombatEntities = characters.concat(qcs).concat(battlegroups)
      .filter((c) => c.in_combat)
      .sort(initiativeSort)

    const combatCards = inCombatEntities.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id + c.name }>
        { c.type.includes('Character') &&
          <CharacterCard character={ c } combat />
        }
        { c.type === 'qc' &&
          <QcCard qc={ c } combat />
        }
        { c.type === 'battlegroup' &&
          <BattlegroupCard battlegroup={ c } combat />
        }
      </Grid>
    )

    const nextCharacter = inCombatEntities.filter((c) => !c.has_acted)[0]

    return <Grid container spacing={ 24 }>
      <Grid item hidden={{ smUp: true }} xs={ 12 }>
        <div style={{ height: '1em', }}>&nbsp;</div>
      </Grid>
      <Grid item xs={ 12 }>
        <Typography variant="subheading">
          Current Initiative: { nextCharacter ? nextCharacter.initiative : 0 }&nbsp;
          Next up: { nextCharacter ? nextCharacter.name : 'Round over!' }
        </Typography>
      </Grid>

      { combatCards }

      <Grid item xs={ 12 }>
        <Typography variant="headline">
          Out of Combat
        </Typography>
      </Grid>

      { characterList }
      { qcList }
      { bgList }
    </Grid>
  }
}

ChronicleCombatDashboard.propTypes = {
  id: PropTypes.string,
  st: PropTypes.object,
  is_st: PropTypes.bool,
  players: PropTypes.arrayOf(PropTypes.object),
  characters: PropTypes.arrayOf(PropTypes.object),
  qcs: PropTypes.arrayOf(PropTypes.object),
  battlegroups: PropTypes.arrayOf(PropTypes.object),
  chronicle: PropTypes.object,
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

export default ProtectedComponent(
  connect(mapStateToProps)(
    ChronicleCombatDashboard
  )
)
