// @flow
import React, { Component, Fragment } from 'react'
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
  getSpecificChronicle,
  getPlayersForChronicle,
  getCharactersForChronicle,
  getQcsForChronicle,
  getBattlegroupsForChronicle,
  getStorytellerForChronicle,
  amIStOfChronicle,
} from 'selectors'
import type { Character, fullQc, Battlegroup } from 'utils/flow-types'

const SortableItem = SortableElement(({ children }) => children)

// TODO: replace with proper objects
type Props = {
  id: string,
  st: Object,
  is_st: boolean,
  players: Array<Object>,
  characters: Array<Character>,
  qcs: Array<fullQc>,
  battlegroups: Array<Battlegroup>,
  chronicle: Object,
  updateCharacter: Function,
  updateQc: Function,
  updateBattlegroup: Function,
}
class ChronicleDashboard extends Component<Props> {
  handleSort = ({ oldIndex, newIndex, collection }) => {
    if (oldIndex === newIndex) return
    // eslint-disable-next-line no-unused-vars
    let update = (...a) => {}
    let coll = []
    switch (collection) {
      case 'characters':
        update = this.props.updateCharacter
        coll = this.props.characters
        break
      case 'qcs':
        update = this.props.updateQc
        coll = this.props.qcs
        break
      case 'battlegroups':
        update = this.props.updateBattlegroup
        coll = this.props.battlegroups
        break
    }
    const charA = coll[oldIndex]
    const charB = coll[newIndex]
    const offset =
      charA.chronicle_sort_order > charB.chronicle_sort_order ? -1 : 1
    update(
      charA.id,
      'chronicle_sort_order',
      charB.chronicle_sort_order + offset
    )
  }

  render() {
    /* Escape hatch */
    if (
      this.props.chronicle == undefined ||
      this.props.chronicle.name == undefined
    )
      return (
        <BlockPaper>
          <Typography paragraph>This Chronicle has not yet loaded.</Typography>
        </BlockPaper>
      )

    const { chronicle, characters, qcs, battlegroups, is_st } = this.props
    const { handleSort } = this

    const characterList = characters.map((c, i) => (
      <SortableItem key={c.id} index={i} collection="characters">
        <Grid item xs={12} lg={6} xl={4}>
          <CharacterCard character={c} chronicle st={is_st} />
        </Grid>
      </SortableItem>
    ))
    const qcList = qcs.map((c, i) => (
      <SortableItem key={c.id} index={i} collection="qcs">
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <QcCard qc={c} chronicle st={is_st} />
        </Grid>
      </SortableItem>
    ))
    const bgList = battlegroups.map((c, i) => (
      <SortableItem key={c.id} index={i} collection="battlegroups">
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <BattlegroupCard battlegroup={c} chronicle st={is_st} />
        </Grid>
      </SortableItem>
    ))

    return (
      <Fragment>
        <SortableGridList
          header={
            <Typography variant="headline">
              Characters
              <CharacterAddPopup chronicleId={chronicle.id} />
            </Typography>
          }
          items={characterList}
          classes={{}}
          onSortEnd={handleSort}
          useDragHandle={true}
          axis="xy"
        />
        {characterList.length == 0 && (
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography>None yet</Typography>
            </Grid>
          </Grid>
        )}

        <SortableGridList
          header={
            <Typography variant="headline">
              Quick Characters
              <QcAddPopup chronicleId={chronicle.id} />
            </Typography>
          }
          items={qcList}
          classes={{}}
          onSortEnd={handleSort}
          useDragHandle={true}
          axis="xy"
        />
        {qcList.length == 0 && (
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography>None yet</Typography>
            </Grid>
          </Grid>
        )}

        <SortableGridList
          header={
            <Typography variant="headline">
              Battlegroups
              <BattlegroupAddPopup chronicleId={chronicle.id} />
            </Typography>
          }
          items={bgList}
          classes={{}}
          onSortEnd={handleSort}
          useDragHandle={true}
          axis="xy"
        />
        {bgList.length == 0 && (
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography>None yet</Typography>
            </Grid>
          </Grid>
        )}
      </Fragment>
    )
  }
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
