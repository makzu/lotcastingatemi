// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import LcaDrawerButton from './lcaDrawerButton.jsx'
import ChronicleHeader from './chronicleHeader.jsx'
import CharacterHeader from './characterHeader.jsx'
import QcHeader from './qcHeader.jsx'
import BattlegroupHeader from './battlegroupHeader.jsx'

const drawerWidth = 240
const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
})

export const GenericHeader = () => (
  <Toolbar>
    <LcaDrawerButton />

    <Typography variant="title" color="inherit">
      Lot-Casting Atemi
    </Typography>
  </Toolbar>
)

const LcaHeader = ({ classes }: { classes: Object }) => (
  <AppBar className={classes.appBar} component="header">
    <Switch>
      <Route path="/chronicles/:chronicleId" component={ChronicleHeader} />
      <Route path="/characters/:characterId" component={CharacterHeader} />
      <Route path="/qcs/:qcId" component={QcHeader} />
      <Route
        path="/battlegroups/:battlegroupId"
        component={BattlegroupHeader}
      />
      <Route component={GenericHeader} />
    </Switch>
  </AppBar>
)

export default withStyles(styles)(LcaHeader)
