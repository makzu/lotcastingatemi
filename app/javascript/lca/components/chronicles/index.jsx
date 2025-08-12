// @flow
import React, { Component, Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import BattlegroupCard from 'components/battlegroups/BattlegroupCard.jsx'
import CharacterCard from 'components/characters/CharacterCard.jsx'
import SortableGridList from 'components/generic/SortableGridList.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import QcCard from 'components/qcs/QcCard.jsx'
import STControls from './StControls.jsx'
import BattlegroupAddPopup from './battlegroupAddPopup.jsx'
import CharacterAddPopup from './characterAddPopup.jsx'
import QcAddPopup from './qcAddPopup.jsx'
import DiceRoller from 'components/DiceRoller'

import ProtectedComponent from 'containers/ProtectedComponent'
import { updateBattlegroup, updateCharacter, updateQc } from 'ducks/actions.js'
import { updateBattlegroupChronicleSort } from 'ducks/entities/battlegroup'
import { updateCharacterChronicleSort } from 'ducks/entities/character'
import { updateQcChronicleSort } from 'ducks/entities/qc'
import {
  amIStOfChronicle,
  getBattlegroupsForChronicle,
  getCharactersForChronicle,
  getPlayersForChronicle,
  getQcsForChronicle,
  getSpecificChronicle,
  getStorytellerForChronicle,
} from 'selectors'
import type { Battlegroup, Character, fullQc } from 'utils/flow-types'

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
  updateCharacterChronicleSort: Function,
  updateQcChronicleSort: Function,
  updateBattlegroupChronicleSort: Function,
}
class ChronicleDashboard extends Component<Props> {
  handleSort = ({ oldIndex, newIndex, collection }) => {
    if (oldIndex === newIndex) return
    // eslint-disable-next-line no-unused-vars
    let update = (...a) => {}
    let updateSort
    let coll = []
    switch (collection) {
      case 'characters':
        update = this.props.updateCharacter
        updateSort = this.props.updateCharacterChronicleSort
        coll = this.props.characters
        break
      case 'qcs':
        update = this.props.updateQc
        updateSort = this.props.updateQcChronicleSort
        coll = this.props.qcs
        break
      case 'battlegroups':
        update = this.props.updateBattlegroup
        updateSort = this.props.updateBattlegroupChronicleSort
        coll = this.props.battlegroups
        break
    }
    const charA = coll[oldIndex]
    const charB = coll[newIndex]
    const offset = charA.chronicle_sorting > charB.chronicle_sorting ? -1 : 1
    updateSort({ id: charA.id, sorting: charB.chronicle_sorting + offset })
    update(charA.id, { chronicle_sorting_position: newIndex })
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
        <DocumentTitle title={`${chronicle.name} | Lot-Casting Atemi`} />

        <Hidden smUp>
          <Grid item xs={12}>
            <div style={{ height: '1em' }}>&nbsp;</div>
          </Grid>
        </Hidden>

        {is_st && <STControls chronicleId={chronicle.id} />}

        <DiceRoller />

        <SortableGridList
          header={
            <Typography variant="h5">
              Characters
              <CharacterAddPopup chronicleId={chronicle.id} />
            </Typography>
          }
          items={characterList}
          classes={{}}
          onSortEnd={handleSort}
          useDragHandle
          axis="xy"
        />
        {characterList.length == 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>None yet</Typography>
            </Grid>
          </Grid>
        )}

        <SortableGridList
          header={
            <Typography variant="h5">
              Quick Characters
              <QcAddPopup chronicleId={chronicle.id} />
            </Typography>
          }
          items={qcList}
          classes={{}}
          onSortEnd={handleSort}
          useDragHandle
          axis="xy"
        />
        {qcList.length == 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>None yet</Typography>
            </Grid>
          </Grid>
        )}

        <SortableGridList
          header={
            <Typography variant="h5">
              Battlegroups
              <BattlegroupAddPopup chronicleId={chronicle.id} />
            </Typography>
          }
          items={bgList}
          classes={{}}
          onSortEnd={handleSort}
          useDragHandle
          axis="xy"
        />
        {bgList.length == 0 && (
          <Grid container spacing={3}>
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
  connect(mapStateToProps, {
    updateCharacter,
    updateQc,
    updateBattlegroup,
    updateCharacterChronicleSort,
    updateQcChronicleSort,
    updateBattlegroupChronicleSort,
  })(ChronicleDashboard),
)
