import { SortableContainer } from 'react-sortable-hoc'
import { Grid } from '@mui/material'

interface Props {
  header: React.ReactNode
  items: React.ReactNode
}

const SortableGridList = SortableContainer(({ header, items }: Props) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sx={{ position: 'sticky', top: 0, zIndex: 2 }}>
      {header}
    </Grid>
    {items}
  </Grid>
))

export default SortableGridList
