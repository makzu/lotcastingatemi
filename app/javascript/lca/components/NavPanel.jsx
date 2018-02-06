import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Divider from 'material-ui/Divider'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import { ResponsiveDrawer } from 'material-ui-responsive-drawer'
import styled from 'styled-components'

import NewCharacterPopup from './generic/newCharacterPopup.jsx'
import NewQcPopup from './generic/newQcPopup.jsx'
import NewBattlegroupPopup from './generic/newBattlegroupPopup.jsx'
import { fullChar, fullQc } from '../utils/propTypes'

const SelectableList = makeSelectable(List)

const NavPanelHeader = styled.div`
  width: 100%;
  height: 55px;
`

export class NavPanel extends React.Component {
  constructor(props) {
    super(props)

    this.handleListChange = this.handleListChange.bind(this)
  }

  handleListChange(e, value) {
    this.props.history.push(value)
  }

  render() {
    const { handleListChange } = this
    const { authenticated } = this.props

    const characterListItems = this.props.characters.map((c) =>
      <ListItem
        primaryText={ c.name }
        key={ c.id }
        value={ `/characters/${c.id}` }
      />
    )
    characterListItems.push(<NewCharacterPopup key={ 0 } />)
    const qcListItems = this.props.qcs.map((c) =>
      <ListItem
        primaryText={ c.name }
        key={ c.id }
        value={ `/qcs/${c.id}` }
      />
    )
    qcListItems.push(<NewQcPopup key={ 0 } />)
    const bgListItems = this.props.battlegroups.map((c) =>
      <ListItem
        primaryText={ c.name }
        key={ c.id }
        value={ `/battlegroups/${c.id}` }
      />
    )
    bgListItems.push(<NewBattlegroupPopup key={ 0 } />)

    return(
      <ResponsiveDrawer>
        <NavPanelHeader> </NavPanelHeader>
        <SelectableList value={ location.pathname }
          onChange={ handleListChange }
        >
          <ListItem primaryText="Home" value="/" />

          { !authenticated &&
            <ListItem primaryText="Log in with Google"
              href="/auth/google_oauth2"
            />
          }

          { authenticated &&
            <ListItem primaryText="Characters"
              primaryTogglesNestedList={ true }
              nestedItems={ characterListItems }
            />
          }

          { authenticated &&
            <ListItem primaryText="QCs"
              primaryTogglesNestedList={ true }
              nestedItems={ qcListItems }
            />
          }

          { authenticated &&
            <ListItem primaryText="Battlegroups"
              primaryTogglesNestedList={ true }
              nestedItems={ bgListItems }
            />
          }

          <Divider />
          <ListItem primaryText="Resources"
            disabled={ true }
          />

          <Divider />
          <a href="https://github.com/makzu/lotcastingatemi"
            target="_blank" rel="noopener noreferrer"
          >
            <ListItem primaryText="View on GitHub" />
          </a>
        </SelectableList>
      </ResponsiveDrawer>
    )
  }
}
NavPanel.propTypes = {
  authenticated: PropTypes.bool,
  id: PropTypes.number,
  player: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  characters: PropTypes.arrayOf(PropTypes.shape(fullChar)),
  qcs: PropTypes.arrayOf(PropTypes.shape(fullQc)),
  battlegroups: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
}

function mapStateToProps(state) {
  const { authenticated, id } = state.session

  const player = state.entities.players[id]
  let characters = []
  let qcs = []
  let battlegroups = []
  if (player != undefined) {
    characters = player.characters.map((id) => state.entities.characters[id])
    qcs = player.qcs.map((id) => state.entities.qcs[id])
    battlegroups = player.battlegroups.map((id) => state.entities.battlegroups[id])
  }

  return {
    authenticated,
    id,
    player,
    characters,
    qcs,
    battlegroups,
  }
}

export default withRouter(connect(
  mapStateToProps
)(NavPanel))
