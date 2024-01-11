import React from 'react'
import DocumentTitle from 'react-document-title'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography } from '@material-ui/core'

import BattlegroupCard from 'components/battlegroups/BattlegroupCard'
import BattlegroupCreatePopup from 'components/battlegroups/battlegroupCreatePopup'
import SortableGridList from 'components/generic/SortableGridList'
import ProtectedComponent from 'containers/ProtectedComponent'
import { State } from 'ducks'
import { getMyBattlegroups, updateBattlegroup } from 'ducks/entities'
import SortableItem from 'components/generic/SortableItem'

const BattlegroupList = () => {
  const battlegroups = useSelector((state: State) => getMyBattlegroups(state))
  const dispatch = useDispatch()

  const chars = battlegroups.map((c, i) => (
    <SortableItem key={c.id} index={i} collection="battlegroups">
      <Grid item xs={12} md={6} xl={4}>
        <BattlegroupCard battlegroup={c} />
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
    const offset = charA.sort_order > charB.sort_order ? -1 : 1
    dispatch(
      updateBattlegroup(charA.id, { sort_order: charB.sort_order + offset }),
    )
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
