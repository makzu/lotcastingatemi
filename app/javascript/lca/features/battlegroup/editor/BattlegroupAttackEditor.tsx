import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { AddCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'

import ListCategoryHeader from '@/components/shared/wrappers/ListCategoryHeader'
import { type QcAttack } from '@/types'
import { sortOrderSort } from '@/utils'
import SortableItem from '../components/SortableItem'
import { useCreateBattlegroupAttackMutation } from '../store'
import { useUpdateBattlegroupAttackSortMutation } from '../store/qcAttack'
import type { Battlegroup } from '../types'
import BattlegroupAttackFields from './BattlegroupAttackFields'

const BattlegroupAttackEditor = (props: { battlegroup: Battlegroup }) => {
  const { battlegroup } = props
  const [add] = useCreateBattlegroupAttackMutation()
  const handleAdd = () => void add({ qc_attackable_id: battlegroup.id })
  const [mutate] = useUpdateBattlegroupAttackSortMutation()

  const [attacks, setAttacks] = useState<QcAttack[]>([])

  useEffect(() => {
    setAttacks(
      (structuredClone(battlegroup?.qc_attacks) ?? []).sort(sortOrderSort),
    )
  }, [battlegroup?.qc_attacks])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

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
        <Button onClick={handleAdd} sx={{ ml: 1 }}>
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
