import { Component } from 'react'
import { connect } from 'react-redux'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import ChronicleCreatePopup from '../chronicles/chronicleCreatePopup'
import ChronicleJoinPopup from '../chronicles/chronicleJoinPopup'
import { NavLinkListItem } from '@/components/shared/wrappers'
import { getMyChronicles, getMyOwnChronicles } from '@/selectors'
import type { Chronicle, Enhancer } from '@/utils/flow-types'

import {
  IconButton,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Collapse,
} from '@mui/material'

interface ExposedProps {
  closeDrawer: $TSFixMeFunction
}
type Props = ExposedProps & {
  ownChronicles: Chronicle[]
  chronicles: Chronicle[]
}
interface State {
  open: boolean
}

class ChronicleNavList extends Component<Props, State> {
  state = { open: false }

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    const { ownChronicles, chronicles, closeDrawer } = this.props

    const chronicleMap = (c: Chronicle) => (
      <NavLinkListItem
        key={c.id}
        to={`/chronicles/${c.id}`}
        onClick={closeDrawer}
      >
        <ListItemText
          inset
          primary={c.name}
          secondary={`${(c.players || '').length} Player${
            (c.players || '').length == 1 ? '' : 's'
          }`}
        />
      </NavLinkListItem>
    )

    const ownChronicleList = ownChronicles.map(chronicleMap)
    const chronicleList = chronicles.map(chronicleMap)
    return (
      <>
        <ListItem button onClick={this.handleClick}>
          <ListItemText primary="Chronicles" />

          <ListItemSecondaryAction>
            <IconButton onClick={this.handleClick} size="large">
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse in={this.state.open}>
          {ownChronicleList.length > 0 && (
            <ListSubheader inset>Your Chronicles</ListSubheader>
          )}
          {ownChronicleList}
          {chronicleList.length > 0 && (
            <ListSubheader inset>Joined Chronicles</ListSubheader>
          )}
          {chronicleList}

          <ChronicleJoinPopup />
          <ChronicleCreatePopup />
        </Collapse>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  ownChronicles: getMyOwnChronicles(state),
  chronicles: getMyChronicles(state),
})

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps)
export default enhance(ChronicleNavList)
