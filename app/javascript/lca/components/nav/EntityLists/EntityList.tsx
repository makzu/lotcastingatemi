import * as React from 'react'

import {
  Collapse,
  IconButton,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

import NavLinkListItem from 'components/shared/wrappers/NavLinkListItem'

interface Props {
  label: string
  link: string
  count: number
  children: React.ReactNodeArray
  onClick(): void
}

const EntityList = ({ label, count, link, children, onClick }: Props) => {
  const [open, setOpen] = React.useState(false)
  const showExpando = !!children.length

  return (
    <>
      <NavLinkListItem to={link} onClick={onClick}>
        <ListItemText primary={label} secondary={`${count} total`} />

        {showExpando && (
          <ListItemSecondaryAction>
            <IconButton onClick={() => setOpen(!open)}>
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
