import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'

import ChronicleInvitePopup from './chronicleInvitePopup.jsx'
import BlockPaper from '../generic/blockPaper.jsx'

class ChronicleDashboard extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    /* Escape hatch */
    if (this.props.chronicle == undefined || this.props.chronicle.st == undefined)
      return <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>

    const { chronicle, st, is_st, players, } = this.props

    const playerList = players.map((p) =>
      <div key={ p.id }>{ p.display_name }</div>
    )
    return <div>
      <Typography variant="headline">
        { chronicle.name }

        { is_st &&
          <ChronicleInvitePopup chronicleId={ chronicle.id } />
        }
      </Typography>

      <Typography component="div">
        Storyteller: { st.display_name }<br />
        Players:
        { playerList }
      </Typography>
    </div>
  }
}

ChronicleDashboard.propTypes = {
  id: PropTypes.string,
  st: PropTypes.object,
  is_st: PropTypes.bool,
  players: PropTypes.arrayOf(PropTypes.object),
  characters: PropTypes.arrayOf(PropTypes.object),
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

  if (chronicle != undefined && chronicle.st != undefined) {
    is_st = chronicle.st == state.session.id
    st = state.entities.players[chronicle.st]
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
