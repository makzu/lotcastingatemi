import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { Grid, Hidden, Typography } from '@mui/material'

import BattlegroupCard from '@/components/battlegroups/BattlegroupCard'
import CharacterCard from '@/components/characters/CharacterCard'
import DocumentTitle from '@/components/generic/DocumentTitle'
import SortableGridList from '@/components/generic/SortableGridList'
import SortableItem from '@/components/generic/SortableItem'
import QcCard from '@/components/qcs/QcCard'
import BlockPaper from '@/components/shared/BlockPaper'
import ProtectedComponent from '@/containers/ProtectedComponent'
import withRouter from '@/containers/withRouter'
import { updateBattlegroup, updateCharacter, updateQc } from '@/ducks/actions'
import { updateBattlegroupChronicleSort } from '@/ducks/entities/battlegroup'
import { updateCharacterChronicleSort } from '@/ducks/entities/character'
import { updateQcChronicleSort } from '@/ducks/entities/qc'
import {
  amIStOfChronicle,
  getBattlegroupsForChronicle,
  getCharactersForChronicle,
  getPlayersForChronicle,
  getQcsForChronicle,
  getSpecificChronicle,
  getStorytellerForChronicle,
} from '@/selectors'
import { type RootState } from '@/store'
import { type Chronicle } from '@/types'
import type { Battlegroup, Character, fullQc } from '@/utils/flow-types'
import AddToChronicleDialog from './AddToChronicleDialog'
import STControls from './StControls'

// TODO: replace with proper objects
interface Props {
  id: string
  st: Record<string, $TSFixMe>
  is_st: boolean
  players: Record<string, $TSFixMe>[]
  characters: Character[]
  qcs: fullQc[]
  battlegroups: Battlegroup[]
  chronicle: Chronicle
  updateCharacter: $TSFixMeFunction
  updateQc: $TSFixMeFunction
  updateBattlegroup: $TSFixMeFunction
  updateCharacterChronicleSort: $TSFixMeFunction
  updateQcChronicleSort: $TSFixMeFunction
  updateBattlegroupChronicleSort: $TSFixMeFunction
}

class ChronicleDashboard extends Component<Props> {
  handleSort = ({ oldIndex, newIndex, collection }) => {
    if (oldIndex === newIndex) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
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

    const charA = coll[oldIndex]!
    const charB = coll[newIndex]!
    const offset = charA.chronicle_sorting > charB.chronicle_sorting ? -1 : 1
    updateSort({ id: charA.id, sorting: charB.chronicle_sorting + offset })
    update(charA.id, { chronicle_sorting_position: newIndex })
  }

  render() {
    /* Escape hatch */
    if (this.props.chronicle?.name == undefined)
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
      <>
        <DocumentTitle title={`${chronicle.name} | Lot-Casting Atemi`} />

        <Hidden smUp>
          <Grid item xs={12}>
            <div
              style={{
                height: '1em',
              }}
            >
              &nbsp;
            </div>
          </Grid>
        </Hidden>

        {is_st && <STControls chronicleId={chronicle.id} />}

        <SortableGridList
          header={
            <Typography variant="h5">
              Characters
              <AddToChronicleDialog
                chronicleId={chronicle.id}
                thingType="character"
              />
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
              <AddToChronicleDialog chronicleId={chronicle.id} thingType="qc" />
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
              <AddToChronicleDialog
                chronicleId={chronicle.id}
                thingType="battlegroup"
              />
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
      </>
    )
  }
}

function mapStateToProps(state: RootState, ownProps) {
  const id = ownProps.params.id

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

export default compose(
  ProtectedComponent,
  withRouter,
  connect(mapStateToProps, {
    updateCharacter,
    updateQc,
    updateBattlegroup,
    updateCharacterChronicleSort,
    updateQcChronicleSort,
    updateBattlegroupChronicleSort,
  }),
)(ChronicleDashboard)