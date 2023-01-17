import { connect } from 'react-redux'
import { compose } from 'recompose'

import { Toolbar, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'

import CharacterMenu from 'components/generic/CharacterMenu'
import { State } from 'ducks'
import { canIEditBattlegroup, getSpecificBattlegroup } from 'selectors'
import { Battlegroup } from 'types'
import { RouteWithIdProps as RouteProps } from 'types/util'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { styles } from './HeaderStyles'
import LinkButton from './LinkButton'
import { useDocumentTitle } from 'hooks'

interface Props {
  id: number
  battlegroup: Battlegroup
  path: string
  canIEdit: boolean
  classes: any
}
function BattlegroupHeader(props: Props) {
  useDocumentTitle(`${props.battlegroup?.name} | Lot-Casting Atemi`)

  if (props.battlegroup == null) {
    return <GenericHeader />
  }

  const { id, battlegroup, path, canIEdit, classes } = props
  const editing = path.includes('/edit')

  let editButtonPath = `/battlegroups/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  return (
    <>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="h6" color="inherit" className={classes.title}>
          {editing && 'Editing '}
          {battlegroup.name}
        </Typography>

        {canIEdit && (
          <LinkButton to={editButtonPath} color="inherit">
            {editing ? 'Done' : 'Edit'}
          </LinkButton>
        )}
        <div className={classes.tabs} />
        <CharacterMenu id={battlegroup.id} characterType="battlegroup" header />
      </Toolbar>
    </>
  )
}

function mapStateToProps(state: State, { location, match }: RouteProps) {
  const id = parseInt(match.params.id, 10)
  const battlegroup = getSpecificBattlegroup(state, id)
  const path = location.pathname

  const canIEdit = canIEditBattlegroup(state, id)

  return {
    battlegroup,
    canIEdit,
    id,
    path,
  }
}

export default compose<Props, RouteProps>(
  withStyles(styles),
  connect(mapStateToProps),
)(BattlegroupHeader)
