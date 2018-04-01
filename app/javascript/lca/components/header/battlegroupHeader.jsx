import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import { GenericHeader } from './header.jsx'
import LcaDrawerButton from './lcaDrawerButton.jsx'
import { getSpecificBattlegroup, canIEditBattlegroup } from '../../selectors/'

const styles = theme => ({ //eslint-disable-line no-unused-vars
  tabs: {
    flex: 1,
  },
  title: {
  },
})

function BattlegroupHeader(props) {
  if (props.battlegroup == undefined)
    return <GenericHeader />

  const { id, battlegroup, path, canIEdit, classes } = props
  const editing = path.includes('/edit')

  let editButtonPath = `/battlegroups/${id}`

  if (!editing){
    editButtonPath += '/edit'
  }

  return <div>
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="title" color="inherit" className={ classes.title }>
        { editing && 'Editing ' }
        { battlegroup.name }
      </Typography>

      { canIEdit &&
        <Button component={ Link } to={ editButtonPath } color="inherit">
          { editing ? 'Done' : 'Edit' }
        </Button>
      }
    </Toolbar>

  </div>
}
BattlegroupHeader.propTypes = {
  id: PropTypes.string,
  battlegroup: PropTypes.object,
  path: PropTypes.string,
  canIEdit: PropTypes.bool,
  classes: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.battlegroupId
  const battlegroup = getSpecificBattlegroup(state, id)
  const path = ownProps.location.pathname

  let canIEdit = canIEditBattlegroup(state, id)

  return {
    id,
    battlegroup,
    path,
    canIEdit,
  }
}


export default withStyles(styles)(connect(mapStateToProps)(BattlegroupHeader))
