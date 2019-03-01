import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { compose } from 'recompose'

import { Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import CharacterMenu from 'components/generic/CharacterMenu/'
import { canIEditQc, getSpecificQc } from 'selectors'
import { IQc } from 'types'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { styles } from './HeaderStyles'
import LinkButton from './LinkButton'

interface Props {
  qc: IQc
  id: number
  path: string
  canIEdit: boolean
  classes: any
}

function QcHeader(props: Props) {
  if (props.qc == null) {
    return <GenericHeader />
  }

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

        <Typography variant="h6" color="inherit" className={classes.title}>
          {editing && 'Editing '}
          {qc.name}
        </Typography>

        {props.canIEdit && (
          <LinkButton to={editButtonPath} color="inherit">
            {editing ? 'Done' : 'Edit'}
          </LinkButton>
        )}

        <div className={classes.tabs} />

        <CharacterMenu id={qc.id} characterType="qc" header />
      </Toolbar>
    </>
  )
}

function mapStateToProps(state, ownProps: RouteComponentProps<any>) {
  const id = ownProps.match.params.qcId
  const qc = getSpecificQc(state, id)
  const path = ownProps.location.pathname

  const canIEdit = canIEditQc(state, id)

  return {
    canIEdit,
    id,
    path,
    qc,
  }
}

export default compose<Props, RouteComponentProps<any>>(
  withStyles(styles),
  connect(mapStateToProps)
)(QcHeader)
