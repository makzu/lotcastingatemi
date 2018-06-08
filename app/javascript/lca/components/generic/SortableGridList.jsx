// @flow
import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import Grid from '@material-ui/core/Grid'

const SortableGridList = SortableContainer(({ header, items, classes }) => (
  <Grid container spacing={24}>
    <Grid item xs={12} className={classes.stickyHeader}>
      {header}
    </Grid>
    {items}
  </Grid>
))

export default SortableGridList
