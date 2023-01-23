import { useLocation } from 'react-router'

import { Button, Toolbar, Typography } from '@mui/material'

import CharacterMenu from 'components/generic/CharacterMenu/'
import { canIEditQc, getSpecificQc } from 'selectors'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { useAppSelector, useDocumentTitle, useIdFromParams } from 'hooks'
import { Link } from 'react-router-dom'

function QcHeader() {
  const id = useIdFromParams()
  const qc = useAppSelector((state) => getSpecificQc(state, id))
  const path = useLocation().pathname
  const canIEdit = useAppSelector((state) => canIEditQc(state, id))
  useDocumentTitle(`${qc?.name} | Lot-Casting Atemi`)

  if (qc == null) {
    return <GenericHeader />
  }

  const editing = path.includes('/edit')

  let editButtonPath = `/qcs/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  return (
    <>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="h6" color="inherit">
          {editing && 'Editing '}
          {qc.name}
        </Typography>

        {canIEdit && (
          <Button component={Link} to={editButtonPath} color="inherit">
            {editing ? 'Done' : 'Edit'}
          </Button>
        )}

        <div style={{ flex: 1 }} />

        <CharacterMenu id={qc.id} characterType="qc" header />
      </Toolbar>
    </>
  )
}

export default QcHeader
