import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Hidden from 'material-ui/Hidden'
import Tabs, { Tab } from 'material-ui/Tabs'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import { GenericHeader } from './header.jsx'
import LcaDrawerButton from './lcaDrawerButton.jsx'
import { getSpecificCharacter, canIEditCharacter } from '../../selectors/'

const styles = theme => ({ //eslint-disable-line no-unused-vars
  tabs: {
    flex: 1,
  },
  title: {
  },
})

function CharmTab({ character, isEditing }) {
  let tabLabel = 'Charms'
  let disabled = false

  const tabPath = isEditing
    ? `/characters/${ character.id }/edit/charms`
    : `/characters/${ character.id }/charms`

  if (character.type == 'Character' && character.is_sorcerer) {
    tabLabel = 'Spells'
  } else if (character.type == 'Character') {
    disabled = true
  } else if (character.is_sorcerer) {
    tabLabel = 'Charms/Spells'
  }

  return <Tab label={ tabLabel } disabled={ disabled } component={ Link } to={ tabPath } />
}
CharmTab.propTypes = {
  character: PropTypes.object.isRequired,
  isEditing: PropTypes.bool,
}

function CharacterHeader(props) {
  if (props.character == undefined)
    return <GenericHeader />

  const { id, character, path, canIEdit, classes } = props
  const editing = path.includes('/edit')

  let tabValue = 0

  let editButtonPath = `/characters/${id}`
  let tabBasePath = `/characters/${id}`

  if (editing){
    tabBasePath += '/edit'
  } else {
    editButtonPath += '/edit'
  }

  if (path.endsWith('merits') || path.endsWith('merits/')) {
    tabValue = 1
    editButtonPath += '/merits'
  } else if (path.endsWith('charms') || path.endsWith('charms/')) {
    tabValue = 2
    editButtonPath += '/charms'
  }
  const tabs = <Tabs
    className={ classes.tabs }
    value={ tabValue }
    centered
  >
    <Tab label="Basics" component={ Link } to={ tabBasePath } />
    <Tab label="Merits" component={ Link } to={ tabBasePath + '/merits' } />
    <CharmTab character={ character } isEditing={ editing } />
  </Tabs>

  return <Fragment>
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="title" color="inherit" className={ classes.title }>
        { editing && 'Editing ' }
        { character.name }
      </Typography>

      { canIEdit &&
        <Button component={ Link } to={ editButtonPath } color="inherit">
          { editing ? 'Done' : 'Edit' }
        </Button>
      }
      <Hidden xsDown>
        { tabs }
      </Hidden>
    </Toolbar>

    <Hidden smUp>
      { tabs }
    </Hidden>
  </Fragment>
}
CharacterHeader.propTypes = {
  id: PropTypes.string,
  character: PropTypes.object,
  path: PropTypes.string,
  canIEdit: PropTypes.bool,
  classes: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)
  const path = ownProps.location.pathname

  let canIEdit = canIEditCharacter(state, id)

  return {
    id,
    character,
    path,
    canIEdit,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(CharacterHeader))
