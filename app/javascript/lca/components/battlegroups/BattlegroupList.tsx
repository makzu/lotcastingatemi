import DocumentTitle from 'react-document-title'
import { SortableElement } from 'react-sortable-hoc'

import { Grid, Typography } from '@material-ui/core'

import { useAppDispatch } from '@lca/hooks/UseAppDispatch'
import { useAppSelector } from '@lca/hooks/UseAppSelector'
import BattlegroupCard from 'components/battlegroups/BattlegroupCard.jsx'
import BattlegroupCreatePopup from 'components/battlegroups/battlegroupCreatePopup.jsx'
import SortableGridList from 'components/generic/SortableGridList.jsx'
import ProtectedComponent from 'containers/ProtectedComponent'
import { getMyBattlegroups, updateBattlegroup } from 'ducks/entities'
import { updateBattlegroupSort } from 'ducks/entities/battlegroup'

const SortableItem = SortableElement(({ children }) => children)

const BattlegroupList = () => {
  const battlegroups = useAppSelector((state) => getMyBattlegroups(state))
  const dispatch = useAppDispatch()

  const chars = battlegroups.map((c, i) => (
    <SortableItem key={c.id} index={i} collection="battlegroups">
      <Grid item xs={12} md={6} xl={4}>
        <BattlegroupCard battlegroup={c} />
      </Grid>
    </SortableItem>
  ))

  const handleSort = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return
    }

    const charA = battlegroups[oldIndex]
    const charB = battlegroups[newIndex]
    const offset = charA.sorting > charB.sorting ? 1 : -1
    dispatch(
      updateBattlegroupSort({ id: charA.id, sorting: charB.sorting + offset }),
    )
    dispatch(updateBattlegroup(charA.id, { sorting_position: newIndex }))
  }

  const classes = {}

  return (
    <>
      <DocumentTitle title="Battlegroups | Lot-Casting Atemi" />

      <SortableGridList
        header={
          <Typography variant="h5">
            Battlegroups &nbsp;
            <BattlegroupCreatePopup />
          </Typography>
        }
        items={chars}
        classes={classes}
        onSortEnd={handleSort}
        useDragHandle
        axis="xy"
      />
    </>
  )
}

export default ProtectedComponent(BattlegroupList)
