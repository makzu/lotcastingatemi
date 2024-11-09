import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { AddCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'

import ListCategoryHeader from '@/components/shared/wrappers/ListCategoryHeader'
import useSensorsWrapped from '@/hooks/UseSensorsWrapped'
import type { QcAttack } from '@/types'
import { sortOrderSort } from '@/utils'
import SortableItem from '../components/SortableItem'
import { useCreateBattlegroupAttackMutation } from '../store'
import { useUpdateBattlegroupAttackSortMutation } from '../store/qcAttack'
import type { Battlegroup } from '../types'
import BattlegroupAttackFields from './BattlegroupAttackFields'

const BattlegroupAttackEditor = (props: { battlegroup: Battlegroup }) => {
  const { battlegroup } = props
  const [add] = useCreateBattlegroupAttackMutation()
  const [mutate] = useUpdateBattlegroupAttackSortMutation()
  const [attacks, setAttacks] = useState<QcAttack[]>([])

  const handleAdd = () => void add({ qc_attackable_id: battlegroup.id })

  useEffect(() => {
    setAttacks(
      (structuredClone(battlegroup?.qc_attacks) ?? []).sort(sortOrderSort),
    )
  }, [battlegroup?.qc_attacks])

  const sensors = useSensorsWrapped()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over !== null && active.id !== over.id) {
      const oldIndex = attacks.findIndex((attack) => attack.id === active.id)
      const newIndex = attacks.findIndex((attack) => attack.id === over.id)
      mutate({
        id: active.id as number,
        qc_attackable_id: battlegroup.id,
        sorting_position: newIndex,
      })
      return setAttacks((attacks) => arrayMove(attacks, oldIndex, newIndex))
    }
  }

  return (
    <>
      <ListCategoryHeader
        noBg
        sx={{
          mt: 1,
          bgcolor: 'background.paper',
          backgroundImage: 'inherit',
        }}
      >
        Attacks
        <Button sx={{ ml: 1 }} onClick={handleAdd}>
          Add
          <AddCircle />
        </Button>
      </ListCategoryHeader>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={attacks.map((attack) => attack.id)}>
          {attacks.map((attack) => (
            <SortableItem key={attack.id} id={attack.id}>
              <BattlegroupAttackFields
                battlegroup={battlegroup}
                attack={attack}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </>
  )
}

export default BattlegroupAttackEditor
