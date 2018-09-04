// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import MoreVert from '@material-ui/icons/MoreVert'

import { duplicateQc } from 'ducks/actions.js'
import type { fullQc } from 'utils/flow-types'

//eslint-disable-next-line no-unused-vars
const styles = theme => ({
  wrapper: {
    margin: '-0.75em -1em 0 1.5em',
  },
})

type Props = { qc: fullQc, classes: Object, duplicateQc: Function }
class QcHeaderMenu extends Component<Props, { menuAnchor: ?Object }> {
  constructor(props: Props) {
    super(props)
    this.state = { menuAnchor: null }
  }

  handleOpen = (e: SyntheticEvent<>) => {
    this.setState({ menuAnchor: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ menuAnchor: null })
  }

  handleClickDupe = () => {
    this.props.duplicateQc(this.props.qc.id)
  }

  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <IconButton onClick={this.handleOpen}>
          <MoreVert />
        </IconButton>

        <Menu
          anchorEl={this.state.menuAnchor}
          open={!!this.state.menuAnchor}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClickDupe}>
            <ListItemText primary="Duplicate QC" />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(
    null,
    { duplicateQc }
  )
)(QcHeaderMenu)
