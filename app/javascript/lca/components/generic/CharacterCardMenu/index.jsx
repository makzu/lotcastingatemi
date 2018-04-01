import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import MoreVert from 'material-ui-icons/MoreVert'

import CardMenuDelete from './CardMenuDelete.jsx'
import CardMenuEdit from './CardMenuEdit.jsx'
import CardMenuHide from './CardMenuHide.jsx'
import CardMenuLinks from './CardMenuLinks.jsx'
import CardMenuPin from './CardMenuPin.jsx'
import CardMenuRemoveFromChronicle from './CardMenuRemoveFromChronicle.jsx'

class CharacterCardMenu extends Component {
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
        <CardMenuLinks characterType={ this.props.characterType } id={ this.props.id } />
        <CardMenuEdit  characterType={ this.props.characterType } id={ this.props.id } />
        <CardMenuPin   characterType={ this.props.characterType } id={ this.props.id } />
        <CardMenuHide  characterType={ this.props.characterType } id={ this.props.id } />

        <CardMenuRemoveFromChronicle characterType={ this.props.characterType } id={ this.props.id } />

        <Divider />

        <CardMenuDelete characterType={ this.props.characterType } id={ this.props.id } />
      </Menu>
    </div>
  }
}
CharacterCardMenu.propTypes = {
  id: PropTypes.number.isRequired,
  characterType: PropTypes.string.isRequired,
}

export default CharacterCardMenu
