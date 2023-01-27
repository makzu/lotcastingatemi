import { ReactNode, useState } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Collapse,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material'

import NavLinkListItem from 'components/shared/wrappers/NavLinkListItem'

interface Props {
  label: string
  link: string
  count: number
  children: ReactNode[]
  onClick(): void
}

const EntityList = ({ label, count, link, children, onClick }: Props) => {
  const [open, setOpen] = useState(false)
  const showExpando = !!children.length

  return (
    <>
      <NavLinkListItem to={link} onClick={onClick}>
        <ListItemText primary={label} secondary={`${count} total`} />

        {showExpando && (
          <ListItemSecondaryAction>
            <IconButton onClick={() => setOpen(!open)} size="large">
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </NavLinkListItem>

      <Collapse in={open}>{children}</Collapse>
    </>
  )
}

export default EntityList
