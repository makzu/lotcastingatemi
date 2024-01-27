import { Grid, Typography } from '@mui/material'

import BattlegroupCard from '@/components/battlegroups/BattlegroupCard'
import BattlegroupCreatePopup from '@/components/battlegroups/battlegroupCreatePopup'
import SortableGridList from '@/components/generic/SortableGridList'
import SortableItem from '@/components/generic/SortableItem'
import ProtectedComponent from '@/containers/ProtectedComponent'
import { getMyBattlegroups, updateBattlegroup } from '@/ducks/entities'
import { updateBattlegroupSort } from '@/ducks/entities/battlegroup'
import { useAppDispatch, useAppSelector, useDocumentTitle } from '@/hooks'

const BattlegroupList = () => {
  useDocumentTitle('Battlegroups | Lot-Casting Atemi')
  const battlegroups = useAppSelector((state) => getMyBattlegroups(state))
  const dispatch = useAppDispatch()

  const chars = battlegroups.map((c, i) => (
    <SortableItem key={c.id} index={i} collection="battlegroups">
      <Grid item xs={12} md={6} xl={4}>
        <BattlegroupCard battlegroup={c} id={c.id} />
      </Grid>
    </SortableItem>
  ))

  const handleSort = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    if (oldIndex === newIndex) {
      return
    }

    const charA = battlegroups[oldIndex]!
    const charB = battlegroups[newIndex]!
    const offset = charA.sorting > charB.sorting ? -1 : 1
    dispatch(
      updateBattlegroupSort({ id: charA.id, sorting: charB.sorting + offset }),
    )
    dispatch(updateBattlegroup(charA.id, { sorting_position: newIndex }))
  }

  const classes = {}

  return (
    <>
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
