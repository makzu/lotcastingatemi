import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@material-ui/core'
import {
  Bookmark,
  BookmarkBorder,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons'

import { update } from '@lca/ducks/actions/ByType.ts'
import { useAppDispatch, useAppSelector } from '@lca/hooks/index.ts'
import { canIDelete } from '@lca/selectors/index.ts'
import type { MenuItemProps as Props } from './CharacterMenuItem.ts'

const CardMenuPin = ({ id, characterType }: Props) => {
  const dispatch = useAppDispatch()
  const canEdit = useAppSelector((state) =>
    canIDelete(state, id, characterType),
  )
  const isPinned = useAppSelector(
    (state) => state.entities.current[`${characterType}s`][id].pinned,
  )
  const isHidden = useAppSelector(
    (state) => state.entities.current[`${characterType}s`][id].hidden,
  )

  const pin = () => dispatch(update[characterType](id, { pinned: !isPinned }))
  const hide = () => dispatch(update[characterType](id, { hidden: !isHidden }))

  if (!canEdit) return null

  return (
    <>
      <Divider />
      <MenuItem button onClick={pin}>
        <ListItemIcon>
          {isPinned ? <Bookmark /> : <BookmarkBorder />}
        </ListItemIcon>
        <ListItemText inset primary={isPinned ? 'Unpin' : 'Pin to Menu'} />
      </MenuItem>

      <MenuItem button onClick={() => hide(!isHidden)}>
        <ListItemIcon>
          {isHidden ? <Visibility /> : <VisibilityOff />}
        </ListItemIcon>
        <ListItemText
          inset
          primary={isHidden ? 'Unhide' : 'Hide from other players'}
        />
      </MenuItem>
    </>
  )
}

export default CardMenuPin
