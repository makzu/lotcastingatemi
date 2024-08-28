import { Button, Toolbar, Typography, type ButtonProps } from '@mui/material'
import { Link, useLocation, type LinkProps } from 'react-router-dom'

import CharacterMenu from '@/components/generic/CharacterMenu'
import LcaDrawerButton from '@/components/header/DrawerButton'
import { GenericHeader } from '@/components/header/Header'
import { useIdFromParams } from '@/hooks'
import { useGetQcQuery } from '../store/qc'

const LinkButton = (props: ButtonProps & LinkProps) => (
  <Button component={Link} color="inherit" {...props} sx={{ ml: 1 }} />
)

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

      <Typography variant="h6" color="inherit">
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
