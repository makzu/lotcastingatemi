// @flow
import React, { Component, Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import ChronicleDeletePopup from './ChronicleDeletePopup.jsx'
import ChronicleInvitePopup from './chronicleInvitePopup.jsx'
import ChronicleLeavePopup from './ChronicleLeavePopup.jsx'
import RemovePlayerPopup from './removePlayerPopup.jsx'
import BlockPaper from '../generic/blockPaper.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import { updateChronicle } from 'ducks/actions.js'
import {
  getSpecificChronicle,
  getPlayersForChronicle,
  getStorytellerForChronicle,
  amIStOfChronicle,
} from 'selectors'
import type { Character, fullQc, Battlegroup } from 'utils/flow-types'

type Props = {
  id: number,
  st: Object,
  is_st: boolean,
  players: Array<Object>,
  characters: Array<Character>,
  qcs: Array<fullQc>,
  battlegroups: Array<Battlegroup>,
  chronicle: Object,
  updateChronicle: Function,
}
class ChroniclePlayerPage extends Component<Props, { name?: string }> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(props) {
    const { chronicle } = props
    if (chronicle === undefined || chronicle.st_id === undefined) return null
    return { name: chronicle.name }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onBlur = e => {
    const { chronicle, updateChronicle } = this.props
    updateChronicle(chronicle.id, e.target.name, e.target.value)
  }

  render() {
    /* Escape hatch */
    if (
      this.props.chronicle == undefined ||
      this.props.chronicle.st_id == undefined
    )
      return (
        <BlockPaper>
          <Typography paragraph>This Chronicle has not yet loaded.</Typography>
        </BlockPaper>
      )

    const { chronicle, st, is_st, players } = this.props
    const { onChange, onBlur } = this

    const playerList = players.map(p => (
      <Fragment key={p.id}>
        <Typography>
          {p.display_name}&nbsp;&nbsp;
          {is_st && (
            <RemovePlayerPopup chronicleId={chronicle.id} playerId={p.id} />
          )}
        </Typography>
        <Divider />
      </Fragment>
    ))
    return (
      <Grid container spacing={24}>
        <DocumentTitle title={`${chronicle.name} | Lot-Casting Atemi`} />

        <Hidden smUp>
          <Grid item xs={12}>
            <div style={{ height: '1.0em' }}>&nbsp;</div>
          </Grid>
        </Hidden>

        <Grid item xs={12}>
          <Typography variant="headline">
            Players
            {is_st && <ChronicleInvitePopup chronicleId={chronicle.id} />}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <BlockPaper>
            <Typography variant="subheading" gutterBottom>
              Storyteller: {st.display_name}
            </Typography>

            <Divider />

            {playerList}
            {!is_st && (
              <div style={{ marginTop: '1em' }}>
                <ChronicleLeavePopup chronicleId={chronicle.id} />
              </div>
            )}
          </BlockPaper>
        </Grid>

        {is_st && (
          <Grid item xs={12}>
            <BlockPaper>
              <Typography variant="subheading">ST Controls</Typography>

              <div>
                <TextField
                  name="name"
                  value={this.state.name}
                  label="Chronicle Name"
                  style={{ width: '30em' }}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </div>
              <div style={{ marginTop: '1em' }}>
                <ChronicleDeletePopup chronicleId={chronicle.id} />
              </div>
            </BlockPaper>
          </Grid>
        )}
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.chronicleId

  return {
    id,
    chronicle: getSpecificChronicle(state, id),
    st: getStorytellerForChronicle(state, id),
    is_st: amIStOfChronicle(state, id),
    players: getPlayersForChronicle(state, id),
  }
}

export default ProtectedComponent(
  connect(
    mapStateToProps,
    { updateChronicle }
  )(ChroniclePlayerPage)
)
