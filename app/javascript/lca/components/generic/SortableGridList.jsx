// @flow
import * as React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import Grid from 'material-ui/Grid'

const SortableGridList = SortableContainer(({ header, items, classes }) =>
  <Grid container spacing={ 24 }>
    <Grid item xs={ 12 } className={ classes.stickyHeader }>
      { header }
    </Grid>
    { items }
  </Grid>
)

export default SortableGridList
