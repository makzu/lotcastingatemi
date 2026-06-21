import { connect } from 'react-redux'
import { Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'recompose'

import CharacterMenu from '@lca/components/generic/CharacterMenu/index.ts'
import { useDocumentTitle } from '@lca/hooks/index.ts'
import { canIEditQc, getSpecificQc } from '@lca/selectors/index.ts'
import type { RootState } from '@lca/store.ts'
import type { QC } from '@lca/types/index.ts'
import type { RouteWithIdProps as RouteProps } from '@lca/types/util.ts'
import LcaDrawerButton from './DrawerButton.tsx'
import { GenericHeader } from './Header.tsx'
import { styles } from './HeaderStyles.ts'
import LinkButton from './LinkButton.tsx'

interface Props {
  qc: QC
  id: number
  path: string
  canIEdit: boolean
  classes: any
}

function QcHeader(props: Props) {
  useDocumentTitle(`${props.qc?.name} | Lot-Casting Atemi`)

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
  )
}

function mapStateToProps(state: RootState, { location, match }: RouteProps) {
  const id = parseInt(match.params.id, 10)
  const qc = getSpecificQc(state, id)
  const path = location.pathname

  const canIEdit = canIEditQc(state, id)

  return {
    canIEdit,
    id,
    path,
    qc,
  }
}

export default compose<Props, RouteProps>(
  withStyles(styles),
  connect(mapStateToProps),
)(QcHeader)
