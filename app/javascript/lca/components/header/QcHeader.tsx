import { useLocation } from 'react-router'

import { Toolbar, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'

import CharacterMenu from 'components/generic/CharacterMenu/'
import { canIEditQc, getSpecificQc } from 'selectors'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { styles } from './HeaderStyles'
import LinkButton from './LinkButton'
import { useAppSelector, useDocumentTitle, useIdFromParams } from 'hooks'

interface Props {
  classes: any
}

function QcHeader(props: Props) {
  const id = useIdFromParams()
  const qc = useAppSelector((state) => getSpecificQc(state, id))
  const path = useLocation().pathname
  const canIEdit = useAppSelector((state) => canIEditQc(state, id))
  useDocumentTitle(`${qc?.name} | Lot-Casting Atemi`)

  if (qc == null) {
    return <GenericHeader />
  }

  const { classes } = props
  const editing = path.includes('/edit')

  let editButtonPath = `/qcs/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  return (
    <>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="h6" color="inherit" className={classes.title}>
          {editing && 'Editing '}
          {qc.name}
        </Typography>

        {canIEdit && (
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

export default withStyles(styles)(QcHeader)
