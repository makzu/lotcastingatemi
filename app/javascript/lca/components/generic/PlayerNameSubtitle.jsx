// @flow
import React from 'react'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'

function PlayerNameSubtitle({ player }: { player: Object }) {
  return <Typography variant="caption">
    Player: { player.display_name }
  </Typography>
}
const mapStateToProps = (state, props) => ({
  player: state.entities.players[props.playerId],
})

export default connect(mapStateToProps)(PlayerNameSubtitle)
