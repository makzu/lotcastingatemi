// @flow
import React from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import { GenericHeader } from './header.jsx'
import LcaDrawerButton from './lcaDrawerButton.jsx'
import { getSpecificQc, canIEditQc } from 'selectors'
import type { fullQc } from 'utils/flow-types'

//eslint-disable-next-line no-unused-vars
const styles = theme => ({
  tabs: {
    flex: 1,
  },
  title: {},
})

type Props = { qc: fullQc, id: number, path: string, classes: Object }
function QcHeader(props: Props) {
  if (props.qc == undefined) return <GenericHeader />

  const { id, qc, path, classes } = props
  const editing = path.includes('/edit')

  let editButtonPath = `/qcs/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  return (
    <div>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="title" color="inherit" className={classes.title}>
          {editing && 'Editing '}
          {qc.name}
        </Typography>

        <Button component={Link} to={editButtonPath} color="inherit">
          {editing ? 'Done' : 'Edit'}
        </Button>
      </Toolbar>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.qcId
  const qc = getSpecificQc(state, id)
  const path = ownProps.location.pathname

  const canIEdit = canIEditQc(state, id)

  return {
    id,
    qc,
    path,
    canIEdit,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(QcHeader))
