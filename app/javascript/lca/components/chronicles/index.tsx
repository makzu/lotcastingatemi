import { Component } from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'

import Grid from '@mui/material/Grid'
import Hidden from '@mui/material/Hidden'
import Typography from '@mui/material/Typography'

import STControls from './StControls'
import CharacterAddPopup from './characterAddPopup'
import CharacterCard from 'components/characters/CharacterCard'
import QcAddPopup from './qcAddPopup'
import QcCard from 'components/qcs/QcCard'
import BattlegroupAddPopup from './battlegroupAddPopup'
import BattlegroupCard from 'components/battlegroups/BattlegroupCard'
import BlockPaper from 'components/shared/BlockPaper'
import DocumentTitle from 'components/generic/DocumentTitle'
import SortableGridList from 'components/generic/SortableGridList'

import ProtectedComponent from 'containers/ProtectedComponent'
import withRouter from 'containers/withRouter'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions'
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
import SortableItem from 'components/generic/SortableItem'

// TODO: replace with proper objects
interface Props {
  id: string
  st: Record<string, $TSFixMe>
  is_st: boolean
  players: Record<string, $TSFixMe>[]
  characters: Character[]
  qcs: fullQc[]
  battlegroups: Battlegroup[]
  chronicle: Record<string, $TSFixMe>
  updateCharacter: $TSFixMeFunction
  updateQc: $TSFixMeFunction
  updateBattlegroup: $TSFixMeFunction
}

class ChronicleDashboard extends Component<Props> {
  handleSort = ({ oldIndex, newIndex, collection }) => {
    if (oldIndex === newIndex) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
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
    update(charA.id, {
      chronicle_sort_order: charB.chronicle_sort_order + offset,
    })
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
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
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

export default ProtectedComponent(
  withRouter(
    connect(mapStateToProps, { updateCharacter, updateQc, updateBattlegroup })(
      ChronicleDashboard,
    ),
  ),
)
