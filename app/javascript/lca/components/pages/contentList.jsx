import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import QcListItem from '../qcs/qcListItem.jsx'
import CharacterListItem from '../characterSheet/characterListItem.jsx'

import { fullQc, fullChar } from '../../utils/propTypes'

const styles = theme => ({
  qcTitle: { marginTop: theme.spacing.unit * 3 }
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
    return <div>

      <Typography variant="headline">Characters</Typography>
      { chars }

      <Typography variant="headline" className={ classes.qcTitle }>QCs</Typography>
      { qcs }

    </div>
  }
}
ContentList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.shape(fullChar)),
  qcs: PropTypes.arrayOf(PropTypes.shape(fullQc)),
  classes: PropTypes.object
}

function mapStateToProps(state) {
  const player = state.entities.players[state.session.id]
  let characters = []
  let qcs = []

  if(player != undefined) {
    characters = player.characters.map((id) => state.entities.characters[id])
    qcs = player.qcs.map((id) => state.entities.qcs[id])
  }
  return {
    characters,
    qcs
  }
}

export default withStyles(styles)(connect(mapStateToProps)(ContentList))
