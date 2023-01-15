import { useDispatch, useSelector } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'

import { Grid, Typography } from '@mui/material'

import BattlegroupCard from 'components/battlegroups/BattlegroupCard.jsx'
import BattlegroupCreatePopup from 'components/battlegroups/battlegroupCreatePopup.jsx'
import SortableGridList from 'components/generic/SortableGridList.jsx'
import ProtectedComponent from 'containers/ProtectedComponent'
import { State } from 'ducks'
import { getMyBattlegroups, updateBattlegroup } from 'ducks/entities'
import useDocumentTitle from 'hooks/UseDocumentTitle'

const SortableItem = SortableElement(({ children }) => children)

const BattlegroupList = () => {
  useDocumentTitle('Battlegroups | Lot-Casting Atemi')
  const battlegroups = useSelector((state: State) => getMyBattlegroups(state))
  const dispatch = useDispatch()

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
    const offset = charA.sort_order > charB.sort_order ? -1 : 1
    dispatch(
      updateBattlegroup(charA.id, { sort_order: charB.sort_order + offset }),
    )
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
