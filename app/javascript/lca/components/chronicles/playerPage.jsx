import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import ChronicleInvitePopup from './chronicleInvitePopup.jsx'
import RemovePlayerPopup from './removePlayerPopup.jsx'
import BlockPaper from '../generic/blockPaper.jsx'

import ProtectedComponent from '../../containers/ProtectedComponent.jsx'
import { getSpecificChronicle } from '../../selectors/'

class ChroniclePlayerPage extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    /* Escape hatch */
    if (this.props.chronicle == undefined || this.props.chronicle.st_id == undefined)
      return <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>

    const { chronicle, st, is_st, players } = this.props

    const playerList = players.map((p) =>
      <Fragment key={ p.id }>
        <Typography>
          { p.display_name }
          { is_st &&
            <RemovePlayerPopup chronicleId={ chronicle.id } playerId={ p.id } />
          }
        </Typography>
        <Divider />
      </Fragment>
    )
    return <Grid container spacing={ 24 }>
      <Grid item hidden={{ smUp: true }} xs={ 12 }>
        <div style={{ height: '1.0em', }}>&nbsp;</div>
      </Grid>

      <Grid item xs={ 12 }>
        <Typography variant="headline">
          Players
          { is_st &&
            <ChronicleInvitePopup chronicleId={ chronicle.id } />
          }
        </Typography>
      </Grid>


      <Grid item xs={ 12 }>
        <BlockPaper>
          <Typography variant="subheading" gutterBottom>
            Storyteller: { st.display_name }
          </Typography>

          <Divider />

          { playerList }
        </BlockPaper>
      </Grid>
    </Grid>
  }
}

ChroniclePlayerPage.propTypes = {
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
  const chronicle = getSpecificChronicle(state, id)

  let st
  let is_st = false
  let players = []

  if (chronicle != undefined && chronicle.name != undefined) {
    is_st = chronicle.st_id == state.session.id
    st = state.entities.players[chronicle.st_id]
    players = chronicle.players.map((c) => state.entities.players[c])
  }

  return {
    id,
    st,
    is_st,
    players,
    chronicle,
  }
}

export default ProtectedComponent(
  connect(mapStateToProps)(
    ChroniclePlayerPage
  )
)
