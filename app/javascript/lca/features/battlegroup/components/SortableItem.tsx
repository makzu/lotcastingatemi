import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type ReactNode } from 'react'

import { type WithId } from '@/types/_lib'

interface Props {
  id: WithId['id']
  children: ReactNode
}

const SortableItem = ({ id, children }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style: React.CSSProperties = {
    position: 'relative',
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging && { pointerEvents: 'none' as const, zIndex: 5 }),
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default SortableItem
