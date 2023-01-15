// @flow
import { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'
import { compose } from 'recompose'

import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import withStyles from '@mui/styles/withStyles'

import CharacterCard from '../characters/CharacterCard.jsx'
import CharacterCreatePopup from '../characters/CharacterCreatePopup'
import QcCard from '../qcs/QcCard.jsx'
import QcCreatePopup from '../qcs/qcCreatePopup.jsx'
import BattlegroupCard from '../battlegroups/BattlegroupCard.jsx'
import BattlegroupCreatePopup from '../battlegroups/battlegroupCreatePopup'
import SortableGridList from 'components/generic/SortableGridList.jsx'
import ProtectedComponent from 'containers/ProtectedComponent'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import { getMyCharacters, getMyQCs, getMyBattlegroups } from 'selectors'
import commonStyles from 'styles'
import type { Character, fullQc, Battlegroup, Enhancer } from 'utils/flow-types'

const SortableItem = SortableElement(({ children }) => children)

const styles = (theme) => ({
  ...commonStyles(theme),
  nthTitle: { marginTop: theme.spacing(3) },
})

type Props = {
  characters: Array<Character>,
  qcs: Array<fullQc>,
  battlegroups: Array<Battlegroup>,
  classes: Object,
  updateCharacter: Function,
  updateQc: Function,
  updateBattlegroup: Function,
}
class ContentList extends Component<Props> {
  handleSort = ({ oldIndex, newIndex, collection }) => {
    if (oldIndex === newIndex) return
    let update
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
      default:
        return
    }
    const charA = coll[oldIndex]
    const charB = coll[newIndex]
    const offset = charA.sort_order > charB.sort_order ? -1 : 1
    update(charA.id, { sort_order: charB.sort_order + offset })
  }

  render() {
    const { handleSort } = this
    const { classes } = this.props
    const chars = this.props.characters.map((c, i) => (
      <SortableItem key={c.id} index={i} collection="characters">
        <Grid item xs={12} md={6} xl={4}>
          <CharacterCard character={c} />
        </Grid>
      </SortableItem>
    ))
    const qcs = this.props.qcs.map((q, i) => (
      <SortableItem key={q.id} index={i} collection="qcs">
        <Grid item xs={12} md={6} lg={4}>
          <QcCard qc={q} />
        </Grid>
      </SortableItem>
    ))
    const bgs = this.props.battlegroups.map((b, i) => (
      <SortableItem key={b.id} index={i} collection="battlegroups">
        <Grid item xs={12} md={6} lg={4}>
          <BattlegroupCard battlegroup={b} />
        </Grid>
      </SortableItem>
    ))

    return (
      <Fragment>
        <SortableGridList
          header={
            <Typography variant="h5">
              Characters &nbsp;
              <CharacterCreatePopup />
            </Typography>
          }
          items={chars}
          classes={classes}
          onSortEnd={handleSort}
          useDragHandle
          axis="xy"
        />

        <Divider style={{ margin: '1em 0' }} />

        <SortableGridList
          header={
            <Typography variant="h5">
              Quick Characters &nbsp;
              <QcCreatePopup />
            </Typography>
          }
          items={qcs}
          classes={classes}
          onSortEnd={handleSort}
          useDragHandle
          axis="xy"
        />

        <Divider style={{ margin: '1em 0' }} />

        <SortableGridList
          header={
            <Typography variant="h5">
              Battlegroups &nbsp;
              <BattlegroupCreatePopup />
            </Typography>
          }
          items={bgs}
          classes={classes}
          onSortEnd={handleSort}
          useDragHandle
          axis="xy"
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  characters: getMyCharacters(state),
  qcs: getMyQCs(state),
  battlegroups: getMyBattlegroups(state),
})

const enhance: Enhancer<Props, {}> = compose(
  connect(mapStateToProps, { updateCharacter, updateQc, updateBattlegroup }),
  withStyles(styles),
  ProtectedComponent,
)

export default enhance(ContentList)
