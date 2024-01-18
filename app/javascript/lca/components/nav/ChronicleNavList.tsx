import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Collapse,
  IconButton,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from '@mui/material'

import ChronicleCreateDialog from '@/components/chronicles/ChronicleCreateDialog'
import ChronicleJoinPopup from '@/components/chronicles/chronicleJoinPopup'
import NavLinkListItem from '@/components/shared/wrappers/NavLinkListItem'
import { closeDrawer } from '@/features/drawerSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import useToggleBoolean from '@/hooks/UseToggleBoolean'
import { getMyChronicles, getMyOwnChronicles } from '@/selectors'
import { Chronicle } from '@/types'

const ChronicleNavList = () => {
  const [open, toggleOpen] = useToggleBoolean(false)
  const ownChronicles = useAppSelector((state) => getMyOwnChronicles(state))
  const joinedChronicles = useAppSelector((state) => getMyChronicles(state))
  const dispatch = useAppDispatch()

  const chronicleMap = (c: Chronicle) => (
    <NavLinkListItem
      key={c.id}
      to={`/chronicles/${c.id}`}
      onClick={() => dispatch(closeDrawer())}
    >
      <ListItemText
        inset
        primary={c.name}
        secondary={`${c.players.length} Player${
          c.players.length == 1 ? '' : 's'
        }`}
      />
    </NavLinkListItem>
  )

  return (
    <>
      <ListItemButton onClick={toggleOpen}>
        <ListItemText primary="Chronicles" />

        <ListItemSecondaryAction>
          <IconButton onClick={toggleOpen} size="large">
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemButton>

      <Collapse in={open}>
        {ownChronicles.length > 0 && (
          <ListSubheader inset>Your Chronicles</ListSubheader>
        )}
        {ownChronicles.map(chronicleMap)}
        {joinedChronicles.length > 0 && (
          <ListSubheader inset>Joined Chronicles</ListSubheader>
        )}
        {joinedChronicles.map(chronicleMap)}

        <ChronicleJoinPopup />
        <ChronicleCreateDialog />
      </Collapse>
    </>
  )
}

export default ChronicleNavList
