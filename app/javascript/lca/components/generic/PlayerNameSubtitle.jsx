// @flow
import React from 'react'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'

import { getSpecificPlayer } from 'selectors'

function PlayerNameSubtitle({ name }: { name: string }) {
  return <Typography variant="caption">Player: {name}</Typography>
}
const mapStateToProps = (state, props) => ({
  name: getSpecificPlayer(state, props.playerId).display_name,
})

export default connect(mapStateToProps)(PlayerNameSubtitle)
