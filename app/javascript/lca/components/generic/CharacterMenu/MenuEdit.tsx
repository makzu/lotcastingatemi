import { ListItemIcon, ListItemText } from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'

import { useAppSelector } from '@lca/hooks'
import { canIEdit } from '@lca/selectors'
import type { MenuItemProps as Props } from './CharacterMenuItem'
import LinkMenuItem from './LinkMenuItem'

const CardMenuEdit = ({ id, characterType }: Props) => {
  const canEdit = useAppSelector((state) => canIEdit(state, id, characterType))
  if (!canEdit) return null

  return (
    <LinkMenuItem to={`/${characterType}s/${id}/edit`}>
      <ListItemIcon>
        <Edit />
      </ListItemIcon>
      <ListItemText inset primary="Edit" />
    </LinkMenuItem>
  )
}

export default CardMenuEdit
