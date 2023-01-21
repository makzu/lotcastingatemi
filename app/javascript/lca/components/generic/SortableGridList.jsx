// @flow
import { SortableContainer } from 'react-sortable-hoc'
import Grid from '@material-ui/core/Grid'

const SortableGridList = SortableContainer(({ header, items, classes }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} className={classes.stickyHeader}>
      {header}
    </Grid>
    {items}
  </Grid>
))

export default SortableGridList
