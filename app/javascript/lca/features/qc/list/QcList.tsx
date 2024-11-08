import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core'
import { Grid2 as Grid } from '@mui/material'
import { useEffect, useState } from 'react'

import ListCategoryHeader from '@/components/shared/wrappers/ListCategoryHeader'
import CreateQcModal from '../components/CreateQcModal'
import { useDocumentTitle, useSensorsWrapped } from '@/hooks'
import { useListQcsQuery, useUpdateQcSortMutation } from '../store/qc'
import type { QC } from '../types'
import QcCard from '../components/QcCard'
import SortableItem from '@/features/battlegroup/components/SortableItem'

const emptyArray: QC[] = []

const QcList = () => {
  useDocumentTitle('QCs | Lot-Casting Atemi')
  const [ids, setIds] = useState<QC['id'][]>([])
  const [mutate] = useUpdateQcSortMutation()

  const sensors = useSensorsWrapped()

  const {
    data: qcs,
    isLoading,
    error,
  } = useListQcsQuery(1, {
    selectFromResult: ({ data, isLoading, error }) => ({
      data: data ?? emptyArray,
      isLoading,
      error,
    }),
  })

  useEffect(() => {
    if (qcs) {
      setIds(qcs.map(({ id }) => id))
    }
  }, [qcs])

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
  // TODO Skeleton here
  if (!qcs || isLoading) return 'Loading...'

  return (
    <>
      <ListCategoryHeader>
        QCs
        <CreateQcModal />
      </ListCategoryHeader>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={ids}>
          <Grid
            container
            spacing={3}
            sx={{
              mt: 0,
            }}
          >
            {ids.map((id) => (
              <Grid
                key={id}
                size={{ xs: 12, sm: 6, xl: 4 }}
                sx={{ height: '100%' }}
              >
                <SortableItem id={id}>
                  <QcCard id={id} />
                </SortableItem>
              </Grid>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </>
  )
}

export default QcList
