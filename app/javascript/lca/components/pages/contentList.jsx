import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'

import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import CharacterCard from '../characters/CharacterCard.jsx'
import CharacterCreatePopup from '../characters/characterCreatePopup.jsx'
import QcCard from '../qcs/QcCard.jsx'
import QcCreatePopup from '../qcs/qcCreatePopup.jsx'
import BattlegroupCard from '../battlegroups/BattlegroupCard.jsx'
import BattlegroupCreatePopup from '../battlegroups/battlegroupCreatePopup'
import SortableGridList from 'components/generic/SortableGridList.jsx'
import ProtectedComponent from '../../containers/ProtectedComponent.jsx'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import { getMyCharacters, getMyQCs, getMyBattlegroups } from '../../selectors'
import { fullQc, fullChar } from '../../utils/propTypes'

const SortableItem = SortableElement(({ children }) => children)

const styles = theme => ({
  nthTitle: { marginTop: theme.spacing.unit * 3 },
})

class ContentList extends Component {
  handleSort = ({ oldIndex, newIndex, collection }) => {
    if (oldIndex === newIndex)
      return
    let update
    let coll = []
    switch(collection) {
    case 'characters':
      update = this.props.updateCharacter
      coll = this.props.characters
      break
    }
    const charA = coll[oldIndex]
    const charB = coll[newIndex]
    const offset = charA.sort_order > charB.sort_order ? -1 : 1
    update(charA.id, 'sort_order', charB.sort_order + offset)
  }

  render() {
    const { handleSort } = this
    const chars = this.props.characters.map((c, i) => <SortableItem key={ c.id } index={ i } collection="characters">
      <Grid item xs={ 12 } md={ 6 } xl={ 4 }>
        <CharacterCard character={ c } />
      </Grid>
    </SortableItem>)
    const qcs = this.props.qcs.map((q) =>
      <Grid item xs={ 12 } md={ 6 } lg={ 4 }  key={ q.id }>
        <QcCard qc={ q } />
      </Grid>
    )
    const bgs = this.props.battlegroups.map((b) =>
      <Grid item xs={ 12 } md={ 6 } lg={ 4 } key={ b.id }>
        <BattlegroupCard battlegroup={ b } />
      </Grid>
    )

    return <Fragment>
      <SortableGridList
        header={<Typography variant="headline">
          Characters
          &nbsp;<CharacterCreatePopup />
        </Typography>}
        items={ chars }
        classes={{}}
        onSortEnd={ handleSort }
        useDragHandle={ true }
        axis="xy"
      />

      <Divider style={{ margin: '1em 0' }} />

      <Grid container spacing={ 24 }>
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
    </Fragment>
  }
}
ContentList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.shape(fullChar)),
  qcs: PropTypes.arrayOf(PropTypes.shape(fullQc)),
  battlegroups: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object,
  updateCharacter: PropTypes.func,
  updateQc: PropTypes.func,
  updateBattlegroup: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    characters: getMyCharacters(state),
    qcs: getMyQCs(state),
    battlegroups: getMyBattlegroups(state),
  }
}

export default ProtectedComponent(
  withStyles(styles)(
    connect(mapStateToProps, { updateCharacter, updateQc, updateBattlegroup })(
      ContentList
    )
  )
)
