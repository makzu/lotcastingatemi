import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import CharacterCard from './characterCard.jsx'
import QcCard from './qcCard.jsx'
import BattlegroupCard from './battlegroupCard.jsx'
import ChronicleInvitePopup from './chronicleInvitePopup.jsx'
import BlockPaper from '../generic/blockPaper.jsx'

class ChronicleDashboard extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    /* Escape hatch */
    if (this.props.chronicle == undefined || this.props.chronicle.name == undefined)
      return <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>

    const { chronicle, st, is_st, players, characters, qcs, battlegroups } = this.props

    const characterList = characters.map((c) =>
      <Grid item xs={ 6 } key={ c.id }>
        <CharacterCard characterId={ c.id } />
      </Grid>
    )
    const qcList = qcs.map((c) =>
      <Grid item xs={ 6 } key={ c.id }>
        <QcCard qcId={ c.id } />
      </Grid>
    )
    const bgList = battlegroups.map((c) =>
      <Grid item xs={ 6 } key={ c.id }>
        <BattlegroupCard battlegroupId={ c.id } />
      </Grid>
    )

    return <Grid container spacing={ 24 }>

      <Grid item xs={ 9 }>
        <Typography variant="headline">
          Characters
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
  const chronicle = state.entities.chronicles[id]

  let st
  let is_st = false
  let players = []
  let characters = []
  let qcs = []
  let battlegroups = []

  if (chronicle != undefined && chronicle.name != undefined) {
    is_st = chronicle.st_id == state.session.id
    st = state.entities.players[chronicle.st_id]
    players = chronicle.players.map((c) => state.entities.players[c])
    characters = chronicle.characters.map((c) => state.entities.characters[c])
    qcs = chronicle.qcs.map((c) => state.entities.qcs[c])
    battlegroups = chronicle.battlegroups.map((c) => state.entities.battlegroups[c])
  }

  return {
    id,
    st,
    is_st,
    players,
    chronicle,
    characters,
    qcs,
    battlegroups,
  }
}

export default connect(
  mapStateToProps
)(ChronicleDashboard)
