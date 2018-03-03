import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

import { toggleDrawer } from '../../ducks/actions.js'

const styles = theme => ({
  drawerButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
})

function LcaDrawerButton(props) {
  const { classes, toggleDrawer } = props

  return <IconButton
    className={ classes.drawerButton }
    onClick={ toggleDrawer }
    color="inherit"
  >
    <MenuIcon />
  </IconButton>
}
LcaDrawerButton.propTypes = {
  classes: PropTypes.object,
  toggleDrawer: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    toggleDrawer: () => {
      dispatch(toggleDrawer())
    },
  }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(LcaDrawerButton))
