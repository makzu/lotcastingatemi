import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import LcaDrawerButton from './lcaDrawerButton.jsx'
import CharacterHeader from './characterHeader.jsx'
import QcHeader from './qcHeader.jsx'
import BattlegroupHeader from './battlegroupHeader.jsx'

const drawerWidth = 240
const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
})

export function GenericHeader() {
  return <div>
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="title" color="inherit">
        Lot-Casting Atemi
      </Typography>
    </Toolbar>
  </div>
}

function LcaHeader(props) {
  const { classes } = props
  return <AppBar className={ classes.appBar } component="header">
    <Switch>
      <Route path="/characters/:characterId" component={ CharacterHeader } />
      <Route path="/qcs/:qcId" component={ QcHeader} />
      <Route path="/battlegroups/:battlegroupId" component={ BattlegroupHeader } />
      <Route component={ GenericHeader } />
    </Switch>
  </AppBar>
}
LcaHeader.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(LcaHeader)
