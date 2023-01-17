import { useLocation } from 'react-router'

import { Toolbar, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'

import CharacterMenu from 'components/generic/CharacterMenu'
import { canIEditBattlegroup, getSpecificBattlegroup } from 'selectors'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { styles } from './HeaderStyles'
import LinkButton from './LinkButton'
import { useAppSelector, useDocumentTitle, useIdFromParams } from 'hooks'

interface Props {
  classes: any
}
function BattlegroupHeader(props: Props) {
  const id = useIdFromParams()
  const battlegroup = useAppSelector((state) =>
    getSpecificBattlegroup(state, id),
  )
  const canIEdit = useAppSelector((state) => canIEditBattlegroup(state, id))
  const path = useLocation().pathname
  useDocumentTitle(`${battlegroup?.name} | Lot-Casting Atemi`)

  if (battlegroup == null) {
    return <GenericHeader />
  }

  const { classes } = props
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

export default withStyles(styles)(BattlegroupHeader)
