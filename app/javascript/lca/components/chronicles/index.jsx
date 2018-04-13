import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import CharacterAddPopup from './characterAddPopup.jsx'
import CharacterCard from 'components/characters/CharacterCard.jsx'
import QcAddPopup from './qcAddPopup.jsx'
import QcCard from 'components/qcs/QcCard.jsx'
import BattlegroupAddPopup from './battlegroupAddPopup.jsx'
import BattlegroupCard from 'components/battlegroups/BattlegroupCard.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import SortableGridList from 'components/generic/SortableGridList.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import {
  getSpecificChronicle, getPlayersForChronicle,
  getCharactersForChronicle, getQcsForChronicle, getBattlegroupsForChronicle,
  getStorytellerForChronicle, amIStOfChronicle,
} from 'selectors'

const SortableItem = SortableElement(({ children }) => children)

class ChronicleDashboard extends Component {
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
    update(charA.id, 'chronicle_sort_order', charB.sort_order + offset)
  }

  render() {
    /* Escape hatch */
    if (this.props.chronicle == undefined || this.props.chronicle.name == undefined)
      return <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>

    const { chronicle, characters, qcs, battlegroups, is_st } = this.props
    const { handleSort } = this

    const characterList = characters.map((c, i) => <SortableItem key={ c.id } index={ i } collection="characters">
      <Grid item xs={ 12 } lg={ 6 } xl={ 4 }>
        <CharacterCard character={ c } chronicle st={ is_st } />
      </Grid>
    </SortableItem>)
    const qcList = qcs.map((c) =>
      <Grid item xs={ 12 } md={ 6 } lg={ 4 } xl={ 3 } key={ c.id }>
        <QcCard qc={ c } chronicle st={ is_st } />
      </Grid>
    )
    const bgList = battlegroups.map((c) =>
      <Grid item xs={ 12 } md={ 6 } lg={ 4 } xl={ 3 } key={ c.id }>
        <BattlegroupCard battlegroup={ c } chronicle st={ is_st } />
      </Grid>
    )

    return <Fragment>
      <SortableGridList
        header={<Typography variant="headline">
          Characters
          <CharacterAddPopup chronicleId={ chronicle.id } />
        </Typography>}
        items={ characterList }
        classes={{}}
        onSortEnd={ handleSort }
        useDragHandle={ true }
        axis="xy"
      />
      <Grid container spacing={ 24 }>
        { characterList.length == 0 &&
          <Grid item xs={ 12 }>
            <Typography>None yet</Typography>
          </Grid>
        }

        <Grid item xs={ 12 }>
          <Typography variant="headline">
            Quick Characters
            <QcAddPopup chronicleId={ chronicle.id } />
          </Typography>
        </Grid>
        { qcList }
        { qcList.length == 0 &&
          <Grid item xs={ 12 }>
            <Typography>None yet</Typography>
          </Grid>
        }

        <Grid item xs={ 12 }>
          <Typography variant="headline">
            Battlegroups
            <BattlegroupAddPopup chronicleId={ chronicle.id } />
          </Typography>
        </Grid>
        { bgList }
        { bgList.length == 0 &&
          <Grid item xs={ 12 }>
            <Typography>None yet</Typography>
          </Grid>
        }
      </Grid>
    </Fragment>
  }
}

ChronicleDashboard.propTypes = {
  id: PropTypes.string,
  st: PropTypes.object,
  is_st: PropTypes.bool,
  players: PropTypes.arrayOf(PropTypes.object),
  characters: PropTypes.arrayOf(PropTypes.object),
  qcs: PropTypes.arrayOf(PropTypes.object),
  battlegroups: PropTypes.arrayOf(PropTypes.object),
  chronicle: PropTypes.object,
  updateCharacter: PropTypes.func,
  updateQc: PropTypes.func,
  updateBattlegroup: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.chronicleId

  return {
    id: id,
    chronicle: getSpecificChronicle(state, id),
    st: getStorytellerForChronicle(state, id),
    is_st: amIStOfChronicle(state, id),
    players: getPlayersForChronicle(state, id),
    characters: getCharactersForChronicle(state, id),
    qcs: getQcsForChronicle(state, id),
    battlegroups: getBattlegroupsForChronicle(state, id),
  }
}

export default ProtectedComponent(
  connect(mapStateToProps, { updateCharacter, updateQc, updateBattlegroup })(
    ChronicleDashboard
  )
)
