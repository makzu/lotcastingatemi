import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'

function PlayerNameSubtitle({ player }) {
  return <Typography variant="caption">
    Player: { player.display_name }
  </Typography>
}
PlayerNameSubtitle.propTypes = {
  player: PropTypes.object,
}
function mapStateToProps(state, ownProps) {
  return {
    player: state.entities.players[ownProps.playerId],
  }
}

export default connect(mapStateToProps)(PlayerNameSubtitle)
