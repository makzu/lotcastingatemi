import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import ChronicleDeletePopup from './ChronicleDeletePopup.jsx'
import ChronicleInvitePopup from './chronicleInvitePopup.jsx'
import ChronicleLeavePopup from './ChronicleLeavePopup.jsx'
import RemovePlayerPopup from './removePlayerPopup.jsx'
import BlockPaper from '../generic/blockPaper.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import { updateChronicle } from 'ducks/actions.js'
import {
  getSpecificChronicle, getPlayersForChronicle,
  getStorytellerForChronicle, amIStOfChronicle,
} from 'selectors'

class ChroniclePlayerPage extends Component {
  constructor(props) {
    super(props)
    this.state = { }

    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  static getDerivedStateFromProps(props) {
    const { chronicle } = props
    if (chronicle === undefined || chronicle.st_id === undefined)
      return null
    return { name: chronicle.name }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onBlur(e) {
    const { chronicle, update } = this.props
    update(chronicle.id, e.target.name, e.target.value)
  }

  render() {
    /* Escape hatch */
    if (this.props.chronicle == undefined || this.props.chronicle.st_id == undefined)
      return <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>

    const { chronicle, st, is_st, players } = this.props
    const { onChange, onBlur } = this

    const playerList = players.map((p) =>
      <Fragment key={ p.id }>
        <Typography>
          { p.display_name }&nbsp;&nbsp;
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
          { !is_st &&
            <div style={{ marginTop: '1em' }}>
              <ChronicleLeavePopup chronicleId={ chronicle.id } />
            </div>
          }
        </BlockPaper>
      </Grid>

      { is_st &&
        <Grid item xs={ 12 }>
          <BlockPaper>
            <Typography variant="subheading">
              ST Controls
            </Typography>

            <div>
              <TextField name="name" value={ this.state.name }
                label="Chronicle Name"
                style={{ width: '30em' }}
                onChange={ onChange } onBlur={ onBlur }
              />
            </div>
            <div style={{ marginTop: '1em' }}>
              <ChronicleDeletePopup chronicleId={ chronicle.id }/>
            </div>
          </BlockPaper>
        </Grid>
      }
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
  update: PropTypes.func,
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

const mapDispatchToProps = dispatch => ({
  update: (id, trait, value) => dispatch(updateChronicle(id, trait, value)),
})

export default ProtectedComponent(
  connect(mapStateToProps, mapDispatchToProps)(
    ChroniclePlayerPage
  )
)
