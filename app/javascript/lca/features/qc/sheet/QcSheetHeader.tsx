import { Toolbar, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import CharacterMenu from '@/components/generic/CharacterMenu'
import LcaDrawerButton from '@/components/header/DrawerButton'
import { GenericHeader } from '@/components/header/Header'
import { LinkButton } from '@/components/shared/wrappers'
import { useIdFromParams } from '@/hooks'
import { useGetQcQuery } from '../store/qc'

function QcHeader() {
  const id = useIdFromParams()
  const { data: qc } = useGetQcQuery(id)

  const editing = useLocation().pathname.includes('/edit')
  let editButtonPath = `/qcs/${id}`

  if (!editing) {
    editButtonPath += '/edit'
  }

  if (qc == undefined) {
    return <GenericHeader />
  }

  return (
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="h6" sx={{ color: 'inherit' }}>
        {editing && 'Editing '}
        {qc.name}
      </Typography>

      {qc.editable && (
        <LinkButton to={editButtonPath}>{editing ? 'Done' : 'Edit'}</LinkButton>
      )}

      <div className="flex" />

      <CharacterMenu header id={qc.id} characterType="qc" />
    </Toolbar>
  )
}

export default QcHeader
