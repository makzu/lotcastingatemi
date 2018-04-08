import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import CharacterAddPopup from './characterAddPopup.jsx'
import CharacterCard from '../characters/CharacterCard.jsx'
import QcAddPopup from './qcAddPopup.jsx'
import QcCard from '../qcs/QcCard.jsx'
import BattlegroupAddPopup from './battlegroupAddPopup.jsx'
import BattlegroupCard from '../battlegroups/BattlegroupCard.jsx'
import BlockPaper from '../generic/blockPaper.jsx'

import ProtectedComponent from '../../containers/ProtectedComponent.jsx'
import {
  getSpecificChronicle, getPlayersForChronicle,
  getCharactersForChronicle, getQcsForChronicle, getBattlegroupsForChronicle,
  getStorytellerForChronicle, amIStOfChronicle,
} from '../../selectors'

class ChronicleDashboard extends Component {
  render() {
    /* Escape hatch */
    if (this.props.chronicle == undefined || this.props.chronicle.name == undefined)
      return <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>

    const { chronicle, characters, qcs, battlegroups, is_st } = this.props

    const characterList = characters.map((c) =>
      <Grid item xs={ 12 } lg={ 6 } xl={ 4 } key={ c.id }>
        <CharacterCard character={ c } chronicle st={ is_st } />
      </Grid>
    )
    const qcList = qcs.map((c) =>
      <Grid item xs={ 12 } md={ 6 } lg={ 4 } xl={ 3 } key={ c.id }>
        <QcCard qc={ c } chronicle st={ is_st } />
      </Grid>
    )
    const bgList = battlegroups.map((c) =>
      <Grid item xs={ 12 } md={ 6 } lg={ 4 } xl={ 3 } key={ c.id }>
        <BattlegroupCard battlegroup={ c } chronicle st={ is_st } />
      </Grid>
    )

    return <Grid container spacing={ 24 }>
      <Grid item hidden={{ smUp: true }} xs={ 12 }>
        <div style={{ height: '1em', }}>&nbsp;</div>
      </Grid>

      <Grid item xs={ 12 }>
        <Typography variant="headline">
          Characters
          <CharacterAddPopup chronicleId={ chronicle.id } />
        </Typography>
      </Grid>
      { characterList }
      { characterList.length == 0 &&
        <Grid item xs={ 12 }>
          <Typography>None yet</Typography>
        </Grid>
      }

      <Grid item xs={ 12 }>
        <Typography variant="headline">
          Quick Characters
          <QcAddPopup chronicleId={ chronicle.id } />
        </Typography>
      </Grid>
      { qcList }
      { qcList.length == 0 &&
        <Grid item xs={ 12 }>
          <Typography>None yet</Typography>
        </Grid>
      }

      <Grid item xs={ 12 }>
        <Typography variant="headline">
          Battlegroups
          <BattlegroupAddPopup chronicleId={ chronicle.id } />
        </Typography>
      </Grid>
      { bgList }
      { bgList.length == 0 &&
        <Grid item xs={ 12 }>
          <Typography>None yet</Typography>
        </Grid>
      }
    </Grid>
  }
}

ChronicleDashboard.propTypes = {
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
    ChronicleDashboard
  )
)
