// @flow
import React from 'react'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'

import { getSpecificPlayer } from 'selectors'

function PlayerNameSubtitle({ player }: { player: Object }) {
  return <Typography variant="caption">
    Player: { player.display_name }
  </Typography>
}
const mapStateToProps = (state, props) => ({
  player: getSpecificPlayer(state, props.playerId),
})

export default connect(mapStateToProps)(PlayerNameSubtitle)
