import { MoreVert } from '@mui/icons-material'
import { Box, Divider, IconButton, Menu } from '@mui/material'

import { useMenuLogic } from '@/hooks'
import { type MenuItemProps } from './CharacterMenuItem'
import MenuBattlegroupFromQc from './MenuBattlegroupFromQc'
import MenuChangeExaltType from './MenuChangeExaltType'
import MenuDelete from './MenuDelete'
import MenuDuplicate from './MenuDuplicate'
import MenuEdit from './MenuEdit'
import MenuLinks from './MenuLinks'
import MenuPinHide from './MenuPinHide'
import MenuRefresh from './MenuRefresh'
import MenuRemoveFromChronicle from './MenuRemoveFromChronicle'

interface Props extends MenuItemProps {
  header?: boolean
  chronicle?: boolean
}

const CharacterMenu = ({ header, chronicle, characterType, id }: Props) => {
  const [menuAnchor, handleOpen, handleClose] = useMenuLogic()

  return (
    <Box sx={header ? { margin: '-0.75em -1em 0 1.5em' } : {}}>
      <IconButton
        onClick={handleOpen}
        data-cy="character-menu"
        color="inherit"
        size="large"
      >
        <MoreVert />
      </IconButton>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={handleClose}>
        <MenuRefresh characterType={characterType} id={id} />

        <Divider />

        <MenuDuplicate characterType={characterType} id={id} />

        <MenuBattlegroupFromQc characterType={characterType} id={id} />

        {!header && [
          <Divider key="div" />,
          <MenuLinks key="links" characterType={characterType} id={id} />,
          <MenuEdit key="edit" characterType={characterType} id={id} />,
        ]}

        <MenuPinHide characterType={characterType} id={id} />

        {!chronicle && (
          <MenuChangeExaltType characterType={characterType} id={id} />
        )}

        <MenuRemoveFromChronicle characterType={characterType} id={id} />

        {!chronicle && <MenuDelete characterType={characterType} id={id} />}
      </Menu>
    </Box>
  )
}

export default CharacterMenu
