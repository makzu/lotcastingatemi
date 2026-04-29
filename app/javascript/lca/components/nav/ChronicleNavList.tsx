import { useState } from 'react'

import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { closeDrawer } from '@lca/features/drawerSlice'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch.js'
import { useAppSelector } from '@lca/hooks/UseAppSelector.js'
import { NavLinkListItem } from 'components/shared/wrappers'
import type { Chronicle } from 'utils/flow-types'
import ChronicleCreatePopup from '../chronicles/chronicleCreatePopup.jsx'
import ChronicleJoinPopup from '../chronicles/chronicleJoinPopup.jsx'
import { getMyChronicles, getMyOwnChronicles } from 'selectors'

const ChronicleNavList = () => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const ownChronicles = useAppSelector(getMyOwnChronicles)
  const chronicles = useAppSelector(getMyChronicles)

  const chronicleMap = (c: Chronicle) => (
    <NavLinkListItem
      key={c.id}
      to={`/chronicles/${c.id}`}
      onClick={() => dispatch(closeDrawer())}
    >
      <ListItemText
        inset
        primary={c.name}
        secondary={`${(c.players || '').length} Player${
          (c.players || '').length === 1 ? '' : 's'
        }`}
      />
    </NavLinkListItem>
  )

  const ownChronicleList = ownChronicles.map(chronicleMap)
  const chronicleList = chronicles.map(chronicleMap)

  return (
    <>
      <ListItem button onClick={() => setIsOpen(!isOpen)}>
        <ListItemText primary="Chronicles" />

        <ListItemSecondaryAction>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Collapse in={isOpen}>
        {ownChronicleList.length > 0 && (
          <ListSubheader inset>Your Chronicles</ListSubheader>
        )}
        {ownChronicleList}
        {chronicleList.length > 0 && (
          <ListSubheader inset>Joined Chronicles</ListSubheader>
        )}
        {chronicleList}

        <ChronicleJoinPopup />
        <ChronicleCreatePopup />
      </Collapse>
    </>
  )
}

export default ChronicleNavList
