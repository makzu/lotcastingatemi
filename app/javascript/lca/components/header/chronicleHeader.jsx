import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Hidden from 'material-ui/Hidden'
import Tabs, { Tab } from 'material-ui/Tabs'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import { GenericHeader } from './header.jsx'
import LcaDrawerButton from './lcaDrawerButton.jsx'

const styles = theme => ({ //eslint-disable-line no-unused-vars
  tabs: {
    flex: 1,
  },
  title: {
  },
})

function ChronicleHeader(props) {
  if (props.chronicle == undefined || props.chronicle.name == undefined)
    return <GenericHeader />

  const { chronicle, path, classes } = props
  const tabBasePath = `/chronicles/${chronicle.id}`

  let tabValue = 0
  if (path.includes('/players'))
    tabValue = 1

  const tabs = <Tabs
    className={ classes.tabs }
    value={ tabValue }
    centered
  >
    <Tab label="Characters" component={ Link } to={ tabBasePath } />
    <Tab label="Players" component={ Link } to={ tabBasePath + '/players' } />
  </Tabs>

  return <div>
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="title" color="inherit" className={ classes.title }>
        { chronicle.name }
      </Typography>

      <Hidden xsDown>
        { tabs }
      </Hidden>
    </Toolbar>

    <Hidden smUp>
      { tabs }
    </Hidden>
  </div>
}
ChronicleHeader.propTypes = {
  id: PropTypes.string,
  chronicle: PropTypes.object,
  path: PropTypes.string,
  classes: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.chronicleId
  const chronicle = state.entities.chronicles[id]
  const path = ownProps.location.pathname

  return {
    id,
    chronicle,
    path,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ChronicleHeader))
