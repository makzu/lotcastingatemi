import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'

import ListCategoryHeader from '@/components/shared/wrappers/ListCategoryHeader'
import { useDocumentTitle } from '@/hooks'
import useSensorsWrapped from '@/hooks/UseSensorsWrapped'
import BattlegroupCard from '../components/BattlegroupCard'
import BattlegroupCreatePopup from '../components/BattlegroupCreatePopup'
import SortableItem from '../components/SortableItem'
import {
  useListBattlegroupsQuery,
  useUpdateBattlegroupSortMutation,
} from '../store/battlegroup'
import type { Battlegroup } from '../types'

const emptyArray: Battlegroup[] = []

const BattlegroupList = () => {
  useDocumentTitle('Battlegroups | Lot-Casting Atemi')
  const [ids, setIds] = useState<Battlegroup['id'][]>([])
  const [mutate] = useUpdateBattlegroupSortMutation()

  const {
    data: battlegroups,
    isLoading,
    error,
  } = useListBattlegroupsQuery(1, {
    selectFromResult: ({ data, isLoading, error }) => ({
      data: data ?? emptyArray,
      isLoading,
      error,
    }),
  })

  useEffect(() => {
    if (battlegroups) {
      setIds(battlegroups.map(({ id }) => id))
    }
  }, [battlegroups])

  const sensors = useSensorsWrapped()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over != null && active.id !== over.id) {
      // dispatch move action
      const oldIndex = ids.indexOf(active.id as number)
      const newIndex = ids.indexOf(over.id as number)
      mutate({ id: active.id as number, sorting_position: newIndex })
      return setIds((items) => {
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  if (error) return 'An error has occurred: ' + JSON.stringify(error)
  if (!battlegroups || isLoading) return 'Loading...'

  return (
    <>
      <ListCategoryHeader>
        Battlegroups
        <BattlegroupCreatePopup />
      </ListCategoryHeader>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={ids}>
          <Grid container spacing={3} mt={0}>
            {ids.map((id) => (
              <Grid key={id} item xs={12} md={6} xl={4}>
                <SortableItem id={id}>
                  <BattlegroupCard id={id} />
                </SortableItem>
              </Grid>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </>
  )
}

export default BattlegroupList
