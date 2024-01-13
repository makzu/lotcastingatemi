import { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Hidden from '@mui/material/Hidden'
import Typography from '@mui/material/Typography'

import ChronicleDeletePopup from './ChronicleDeletePopup'
import ChronicleInvitePopup from './chronicleInvitePopup'
import ChronicleLeavePopup from './ChronicleLeavePopup'
import RemovePlayerPopup from './removePlayerPopup'
import BlockPaper from 'components/shared/BlockPaper'
import DocumentTitle from 'components/generic/DocumentTitle'
import MarkdownDisplay from 'components/shared/MarkdownDisplay'
import TextField from 'components/generic/TextField'

import ProtectedComponent from 'containers/ProtectedComponent'
import withRouter from 'containers/withRouter'
import { updateChronicle } from 'ducks/actions'
import {
  getSpecificChronicle,
  getPlayersForChronicle,
  getStorytellerForChronicle,
  amIStOfChronicle,
} from 'selectors'
import type { Character, fullQc, Battlegroup } from 'utils/flow-types'
import { Chronicle } from 'types'
import { RootState } from 'store'

interface Props {
  id: number
  st: Record<string, $TSFixMe>
  is_st: boolean
  players: Record<string, $TSFixMe>[]
  characters: Character[]
  qcs: fullQc[]
  battlegroups: Battlegroup[]
  chronicle: Chronicle
  classes: Record<string, $TSFixMe>
  updateChronicle: $TSFixMeFunction
}

class ChronicleDetailsPage extends Component<Props, { name?: string }> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(props: Props) {
    const { chronicle } = props
    if (chronicle?.st_id === undefined) return null
    return {
      name: chronicle.name,
    }
  }

  onChange = (e) => {
    const { chronicle, updateChronicle } = this.props
    updateChronicle(chronicle.id, {
      [e.target.name]: e.target.value,
    })
  }

  render() {
    /* Escape hatch */
    if (this.props.chronicle?.st_id == undefined)
      return (
        <BlockPaper>
          <Typography paragraph>This Chronicle has not yet loaded.</Typography>
        </BlockPaper>
      )
    const { chronicle, st, is_st, players } = this.props
    const { onChange } = this
    const playerList = players.map((p) => (
      <Fragment key={p.id}>
        <Typography>
          {p.display_name}
          &nbsp;&nbsp;
          {is_st && (
            <RemovePlayerPopup chronicleId={chronicle.id} playerId={p.id} />
          )}
        </Typography>
        <Divider />
      </Fragment>
    ))
    return (
      <Grid container spacing={3}>
        <DocumentTitle title={`${chronicle.name} | Lot-Casting Atemi`} />

        <Hidden smUp>
          <Grid item xs={12}>
            <div
              style={{
                height: '1.0em',
              }}
            >
              &nbsp;
            </div>
          </Grid>
        </Hidden>

        {chronicle.notes !== '' && (
          <Grid item xs={12} md={8}>
            <BlockPaper>
              <MarkdownDisplay source={chronicle.notes} />
            </BlockPaper>
          </Grid>
        )}

        <Grid item xs={12} md={4}>
          <BlockPaper>
            <Typography variant="h5">
              Players
              {is_st && <ChronicleInvitePopup chronicleId={chronicle.id} />}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Storyteller: {st.display_name}
            </Typography>

            <Divider />

            {playerList}
            {!is_st && (
              <div
                style={{
                  marginTop: '1em',
                }}
              >
                <ChronicleLeavePopup chronicleId={chronicle.id} />
              </div>
            )}
          </BlockPaper>
        </Grid>

        {is_st && (
          <Grid item xs={12}>
            <BlockPaper>
              <Typography variant="subtitle1">ST Controls</Typography>

              <div>
                <TextField
                  name="name"
                  value={chronicle.name}
                  label="Chronicle Name"
                  style={{
                    width: '30em',
                  }}
                  onChange={onChange}
                  margin="dense"
                  inputProps={{
                    autocomplete: 'off',
                    'data-1p-ignore': 'true',
                    'data-lp-ignore': 'true',
                  }}
                />
              </div>

              <TextField
                name="notes"
                label="Chronicle Notes"
                value={chronicle.notes}
                margin="dense"
                onChange={onChange}
                fullWidth
                multiline
              />
              <div
                style={{
                  marginTop: '1em',
                }}
              >
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
  const id = ownProps.params.id

  return {
    id,
    chronicle: getSpecificChronicle(state, id),
    st: getStorytellerForChronicle(state, id),
    is_st: amIStOfChronicle(state, id),
    players: getPlayersForChronicle(state, id),
  }
}

export default compose(
  ProtectedComponent,
  withRouter,
  connect(mapStateToProps, { updateChronicle }),
)(ChronicleDetailsPage)
