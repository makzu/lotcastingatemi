import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Tabs, { Tab } from 'material-ui/Tabs'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import { GenericHeader } from './header.jsx'
import LcaDrawerButton from './generic/lcaDrawerButton.jsx'

const styles = theme => ({
  tabs: {
    flex: 1,
  },
  title: {
    flex: 1,
  },
})

function CharacterHeader(props) {
  if (props.character == undefined)
    return <GenericHeader />

  const { id, character, path, classes } = props
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

  return <div>
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="title" color="inherit" className={ classes.title }>
        { editing && 'Editing ' }
        { character.name }
      </Typography>

      <Tabs
        className={ classes.tabs }
        value={ tabValue }
        centered
      >
        <Tab label="Basics" component={ Link } to={ tabBasePath } />
        <Tab label="Merits" component={ Link } to={ tabBasePath + '/merits' } />
        <Tab label="Charms" component={ Link } to={ tabBasePath + '/charms'}
          disabled={ character.type == 'Character' /* Mortals cannot have Charms */ }
        />
      </Tabs>

      <Button component={ Link } to={ editButtonPath } color="inherit">
        { editing ? 'Done' : 'Edit' }
      </Button>
    </Toolbar>

  </div>
}
CharacterHeader.propTypes = {
  id: PropTypes.string,
  character: PropTypes.object,
  path: PropTypes.string,
  classes: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId
  const character = state.entities.characters[id]
  const path = ownProps.location.pathname

  return {
    id,
    character,
    path,
  }
}


export default withStyles(styles)(connect(mapStateToProps)(CharacterHeader))
