// @flow
import React, { Component } from 'react'

import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'
import MoreVert from '@material-ui/icons/MoreVert'

import MenuDelete from './MenuDelete.jsx'
import MenuChangeExaltType from './MenuChangeExaltType.jsx'
import MenuEdit from './MenuEdit.jsx'
import MenuHide from './MenuHide.jsx'
import MenuLinks from './MenuLinks.jsx'
import MenuPin from './MenuPin.jsx'
import MenuRemoveFromChronicle from './MenuRemoveFromChronicle.jsx'
import MenuDuplicate from './MenuDuplicate.jsx'
import MenuBattlegroupFromQc from './MenuBattlegroupFromQc.jsx'

//eslint-disable-next-line no-unused-vars
const styles = theme => ({
  wrapper: {
    margin: '-0.75em -1em 0 1.5em',
  },
  headerWrapper: {},
})

type Props = {
  id: number,
  characterType: string,
  header?: boolean,
  classes: Object,
}
class CharacterMenu extends Component<Props, { menuAnchor: ?Object }> {
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
    const { header, classes } = this.props
    return (
      <div className={header ? classes.headerWrapper : classes.wrapper}>
        <IconButton onClick={this.handleOpen}>
          <MoreVert />
        </IconButton>

        <Menu
          anchorEl={this.state.menuAnchor}
          open={!!this.state.menuAnchor}
          onClose={this.handleClose}
        >
          {!this.props.header && (
            <>
              <MenuLinks
                characterType={this.props.characterType}
                id={this.props.id}
              />
              <MenuEdit
                characterType={this.props.characterType}
                id={this.props.id}
              />
            </>
          )}

          <MenuPin
            characterType={this.props.characterType}
            id={this.props.id}
          />
          <MenuHide
            characterType={this.props.characterType}
            id={this.props.id}
          />

          <MenuRemoveFromChronicle
            characterType={this.props.characterType}
            id={this.props.id}
          />

          <MenuDuplicate
            characterType={this.props.characterType}
            id={this.props.id}
          />

          <MenuBattlegroupFromQc
            characterType={this.props.characterType}
            id={this.props.id}
          />

          <MenuChangeExaltType
            characterType={this.props.characterType}
            id={this.props.id}
          />

          <MenuDelete
            characterType={this.props.characterType}
            id={this.props.id}
          />
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(CharacterMenu)
