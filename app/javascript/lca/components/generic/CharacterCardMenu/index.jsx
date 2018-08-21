// @flow
import React, { Component } from 'react'

import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'
import MoreVert from '@material-ui/icons/MoreVert'

import CardMenuDelete from './CardMenuDelete.jsx'
import CardMenuEdit from './CardMenuEdit.jsx'
import CardMenuHide from './CardMenuHide.jsx'
import CardMenuLinks from './CardMenuLinks.jsx'
import CardMenuPin from './CardMenuPin.jsx'
import CardMenuRemoveFromChronicle from './CardMenuRemoveFromChronicle.jsx'

//eslint-disable-next-line no-unused-vars
const styles = theme => ({
  wrapper: {
    margin: '-0.75em -1em 0 1.5em',
  },
})

type Props = { id: number, characterType: string, classes: Object }
class CharacterCardMenu extends Component<Props, { menuAnchor: ?Object }> {
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
          <CardMenuLinks
            characterType={this.props.characterType}
            id={this.props.id}
          />
          <CardMenuEdit
            characterType={this.props.characterType}
            id={this.props.id}
          />
          <CardMenuPin
            characterType={this.props.characterType}
            id={this.props.id}
          />
          <CardMenuHide
            characterType={this.props.characterType}
            id={this.props.id}
          />

          <CardMenuRemoveFromChronicle
            characterType={this.props.characterType}
            id={this.props.id}
          />

          <CardMenuDelete
            characterType={this.props.characterType}
            id={this.props.id}
          />
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(CharacterCardMenu)
