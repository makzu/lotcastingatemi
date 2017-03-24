import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'

function LcaHeader(props) {
  return(
    <header>
      <AppBar title="Lot-Casting Atemi"
        style={{paddingLeft: '280px'}}
      />
      <Drawer open={ true } docked={ true }>
        <List>
          <Link to="/">
            <ListItem primaryText="Home" />
          </Link>
          <Link to="/characters/1">
            <ListItem primaryText="Edit character" />
          </Link>
          <Link to="/qcs/1">
            <ListItem primaryText="Edit QC" />
          </Link>
          <ListItem primaryText="Etc" />
        </List>
      </Drawer>
    </header>
  )
}

export default LcaHeader
