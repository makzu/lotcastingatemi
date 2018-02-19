import React from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

export default function LcaHeader(props) {
  return(
    <AppBar component="header" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Lot-Casting Atemi
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
