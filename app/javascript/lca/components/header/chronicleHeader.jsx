import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import { GenericHeader } from './header.jsx'
import LcaDrawerButton from './lcaDrawerButton.jsx'

const styles = theme => ({ //eslint-disable-line no-unused-vars
  title: {
  },
})

function ChronicleHeader(props) {
  if (props.chronicle == undefined)
    return <GenericHeader />

  const { chronicle, classes } = props

  return <div>
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="title" color="inherit" className={ classes.title }>
        { chronicle.name }
      </Typography>
    </Toolbar>

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

export default withStyles(styles)(connect(mapStateToProps)(ChronicleHeader))
