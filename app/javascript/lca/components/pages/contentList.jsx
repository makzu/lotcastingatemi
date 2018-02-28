import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import CharacterListItem from '../characters/characterListItem.jsx'
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
    const { classes } = this.props
    const chars = this.props.characters.map((c) =>
      <CharacterListItem character={ c } key={ c.id } />
    )
    const qcs = this.props.qcs.map((q) =>
      <QcListItem qc={ q } key={ q.id } />
    )
    const bgs = this.props.battlegroups.map((b) =>
      <BattlegroupListItem battlegroup={ b } key={ b.id } />
    )
    return <div>

      <Typography variant="headline">Characters</Typography>
      { chars }

      <Typography variant="headline" className={ classes.nthTitle }>
        QCs
        <QcCreatePopup />
      </Typography>
      { qcs }

      <Typography variant="headline" className={ classes.nthTitle }>
        Battlegroups
        <BattlegroupCreatePopup />
      </Typography>
      { bgs }

    </div>
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
