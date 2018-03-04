import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import CharacterListItem from '../characters/characterListItem.jsx'
import CharacterCreatePopup from '../characters/characterCreatePopup.jsx'
import QcListItem from '../qcs/qcListItem.jsx'
import QcCreatePopup from '../qcs/qcCreatePopup.jsx'
import BattlegroupListItem from '../battlegroups/battlegroupListItem'
import BattlegroupCreatePopup from '../battlegroups/battlegroupCreatePopup'

import { fullQc, fullChar } from '../../utils/propTypes'

const styles = theme => ({
  nthTitle: { marginTop: theme.spacing.unit * 3 },
})

class ContentList extends React.Component {
  render() {
    const chars = this.props.characters.map((c) =>
      <Grid item xs={ 12 } md={ 6 } lg={ 4 }  key={ c.id }>
        <CharacterListItem character={ c } />
      </Grid>
    )
    const qcs = this.props.qcs.map((q) =>
      <Grid item xs={ 12 } md={ 6 } lg={ 4 }  key={ q.id }>
        <QcListItem qc={ q } />
      </Grid>
    )
    const bgs = this.props.battlegroups.map((b) =>
      <Grid item xs={ 12 } md={ 6 } lg={ 4 } key={ b.id }>
        <BattlegroupListItem battlegroup={ b } />
      </Grid>
    )

    return <Grid container spacing={ 24 }>
      <Grid item xs={ 9 }>
        <Typography variant="headline">
          Characters
        </Typography>
      </Grid>
      <Grid item xs={ 3 }>
        <CharacterCreatePopup />
      </Grid>
      { chars }

      <Grid item xs={ 12 }>
        <Divider />
      </Grid>

      <Grid item xs={ 9 }>
        <Typography variant="headline">
          Quick Characters
        </Typography>
      </Grid>
      <Grid item xs={ 3 }>
        <QcCreatePopup />
      </Grid>
      { qcs }

      <Grid item xs={ 9 }>
        <Typography variant="headline">
          Battlegroups
        </Typography>
      </Grid>
      <Grid item xs={ 3 }>
        <BattlegroupCreatePopup />
      </Grid>

      { bgs }

    </Grid>
  }
}
ContentList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.shape(fullChar)),
  qcs: PropTypes.arrayOf(PropTypes.shape(fullQc)),
  battlegroups: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object,
}

function mapStateToProps(state) {
  const player = state.entities.players[state.session.id]
  let characters = []
  let qcs = []
  let battlegroups = []

  if(player != undefined) {
    characters = player.characters.map((id) => state.entities.characters[id])
    qcs = player.qcs.map((id) => state.entities.qcs[id])
    battlegroups = player.battlegroups.map((id) => state.entities.battlegroups[id])
  }
  return {
    characters,
    qcs,
    battlegroups,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(ContentList))
