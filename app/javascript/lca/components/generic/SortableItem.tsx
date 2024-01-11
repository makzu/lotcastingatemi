import { ReactElement } from 'react'
import { SortableElement } from 'react-sortable-hoc'

const SortableItem = SortableElement(
  ({ children }: { children: ReactElement }) => children,
)

export default SortableItem
