import { Divider, IconButton, Menu } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreVert from '@material-ui/icons/MoreVert'

import { useMenuLogic } from '@lca/hooks/index.ts'
import type { Character } from '@lca/types/character.ts'
import type { CharacterType } from './CharacterMenuItem.ts'
import MenuBattlegroupFromQc from './MenuBattlegroupFromQc.tsx'
import MenuChangeExaltType from './MenuChangeExaltType.tsx'
import MenuDelete from './MenuDelete.tsx'
import MenuDuplicate from './MenuDuplicate.tsx'
import MenuEdit from './MenuEdit.tsx'
import MenuLinks from './MenuLinks.tsx'
import MenuPinHide from './MenuPinHide.tsx'
import MenuRefresh from './MenuRefresh.tsx'
import MenuRemoveFromChronicle from './MenuRemoveFromChronicle.tsx'

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(() => ({
  headerWrapper: {},
  wrapper: {
    margin: '-0.75em -1em 0 1.5em',
  },
}))

interface Props {
  id: Character['id']
  characterType: CharacterType
  header?: boolean
  chronicle?: boolean
}

const CharacterMenu = (props: Props) => {
  const classes = useStyles()
  const { header, chronicle, characterType, id } = props
  const [menuAnchor, handleOpen, handleClose] = useMenuLogic()

  return (
    <div className={header ? classes.headerWrapper : classes.wrapper}>
      <IconButton onClick={handleOpen} data-cy="character-menu" color="inherit">
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
    </div>
  )
}

export default CharacterMenu
