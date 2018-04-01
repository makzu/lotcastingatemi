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
import { getSpecificQc, canIEditQc } from '../../selectors/'

const styles = theme => ({ //eslint-disable-line no-unused-vars
  tabs: {
    flex: 1,
  },
  title: {
  },
})

function QcHeader(props) {
  if (props.qc == undefined)
    return <GenericHeader />

  const { id, qc, path, classes } = props
  const editing = path.includes('/edit')

  let editButtonPath = `/qcs/${id}`

  if (!editing){
    editButtonPath += '/edit'
  }

  return <div>
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="title" color="inherit" className={ classes.title }>
        { editing && 'Editing ' }
        { qc.name }
      </Typography>

      <Button component={ Link } to={ editButtonPath } color="inherit">
        { editing ? 'Done' : 'Edit' }
      </Button>
    </Toolbar>

  </div>
}
QcHeader.propTypes = {
  id: PropTypes.string,
  qc: PropTypes.object,
  path: PropTypes.string,
  canIEdit: PropTypes.bool,
  classes: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.qcId
  const qc = getSpecificQc(state, id)
  const path = ownProps.location.pathname

  const canIEdit = canIEditQc

  return {
    id,
    qc,
    path,
    canIEdit,
  }
}


export default withStyles(styles)(connect(mapStateToProps)(QcHeader))
