import React from 'react'
import PropTypes from 'prop-types'

import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import MoreVert from 'material-ui-icons/MoreVert'

import CardMenuDelete from './CardMenuDelete.jsx'
import CardMenuHide from './CardMenuHide.jsx'
import CardMenuPin from './CardMenuPin.jsx'

class ContentPageCardMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menuAnchor: null }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen(e) {
    this.setState({ menuAnchor: e.currentTarget })
  }

  handleClose() {
    this.setState({ menuAnchor: null })
  }

  render() {
    return <div style={{ marginTop: '-1em', marginRight: '-1em', }}>
      <IconButton onClick={ this.handleOpen }>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={ this.state.menuAnchor }
        open={ !!this.state.menuAnchor }
        onClose={ this.handleClose }
      >
        <CardMenuHide characterType={ this.props.characterType } id={ this.props.id } />
        <CardMenuPin characterType={ this.props.characterType } id={ this.props.id } />

        <Divider />

        <CardMenuDelete characterType={ this.props.characterType } id={ this.props.id } />
      </Menu>
    </div>
  }
}
ContentPageCardMenu.propTypes = {
  id: PropTypes.number.isRequired,
  characterType: PropTypes.string.isRequired,
}

export default ContentPageCardMenu
