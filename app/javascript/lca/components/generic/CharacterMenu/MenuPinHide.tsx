import {
  Bookmark,
  BookmarkBorder,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { Divider, ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { update } from '@/ducks/actions/ByType'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { canIDelete, getEntity } from '@/selectors'
import type { MenuItemProps as Props } from './CharacterMenuItem'

const CardMenuPin = ({ id, characterType }: Props) => {
  const dispatch = useAppDispatch()
  const canEdit = useAppSelector((state) =>
    canIDelete(state, id, characterType),
  )
  const character = useAppSelector((state) =>
    getEntity[characterType](state, id),
  )

  const pin = (pinned: boolean) => {
    dispatch(update[characterType](id, { pinned }))
  }
  const hide = (hidden: boolean) => {
    dispatch(update[characterType](id, { hidden }))
  }

  if (!canEdit || !character) return null
  const { hidden, pinned } = character

  return (
    <>
      <Divider />
      <MenuItem onClick={() => pin(!pinned)}>
        <ListItemIcon>
          {pinned ? <Bookmark /> : <BookmarkBorder />}
        </ListItemIcon>
        <ListItemText inset primary={pinned ? 'Unpin' : 'Pin to Menu'} />
      </MenuItem>

      <MenuItem onClick={() => hide(!hidden)}>
        <ListItemIcon>
          {hidden ? <Visibility /> : <VisibilityOff />}
        </ListItemIcon>
        <ListItemText
          inset
          primary={hidden ? 'Unhide' : 'Hide from other players'}
        />
      </MenuItem>
    </>
  )
}

export default CardMenuPin
