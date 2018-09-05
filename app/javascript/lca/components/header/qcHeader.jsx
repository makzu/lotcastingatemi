// @flow
import React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { GenericHeader } from './header.jsx'
import LcaDrawerButton from './lcaDrawerButton.jsx'
import CharacterMenu from 'components/generic/CharacterMenu/'
import { getSpecificQc, canIEditQc } from 'selectors'
import type { fullQc } from 'utils/flow-types'

//eslint-disable-next-line no-unused-vars
const styles = theme => ({
  tabs: {
    flex: 1,
  },
  title: {},
})

type Props = {
  qc: fullQc,
  id: number,
  path: string,
  canIEdit: boolean,
  classes: Object,
}
function QcHeader(props: Props) {
  if (props.qc == undefined) return <GenericHeader />

  const { id, qc, path, classes } = props
  const editing = path.includes('/edit')

  let editButtonPath = `/qcs/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  return (
    <>
      <DocumentTitle title={`${qc.name} | Lot-Casting Atemi`} />

      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="title" color="inherit" className={classes.title}>
          {editing && 'Editing '}
          {qc.name}
        </Typography>

        {props.canIEdit && (
          <Button component={Link} to={editButtonPath} color="inherit">
            {editing ? 'Done' : 'Edit'}
          </Button>
        )}
        <div className={classes.tabs} />
        <CharacterMenu id={qc.id} characterType="qc" header />
      </Toolbar>
    </>
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

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(QcHeader)
