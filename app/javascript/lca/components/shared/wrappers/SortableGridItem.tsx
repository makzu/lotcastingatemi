import type { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import { Grid } from '@material-ui/core'

interface SortableProps {
  id: number
  index: number
  children: ReactNode
}
const Sortable = ({ id, index, children }: SortableProps) => {
  const { ref } = useSortable({ id, index })

  return (
    <Grid item ref={ref} xs={12} md={6} xl={4}>
      {children}
    </Grid>
  )
}

export default Sortable
