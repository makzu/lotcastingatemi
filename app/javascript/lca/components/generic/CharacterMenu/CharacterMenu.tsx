import * as React from 'react'

import { Divider, IconButton, Menu } from '@material-ui/core'
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import MoreVert from '@material-ui/icons/MoreVert'

import { useMenuLogic } from 'hooks'
import { CharacterType } from './CharacterMenuItem'
import MenuBattlegroupFromQc from './MenuBattlegroupFromQc'
import MenuChangeExaltType from './MenuChangeExaltType'
import MenuDelete from './MenuDelete'
import MenuDuplicate from './MenuDuplicate'
import MenuExport from './MenuExport'
import MenuImport from './MenuImport'
import MenuEdit from './MenuEdit'
import MenuLinks from './MenuLinks'
import MenuPinHide from './MenuPinHide'
import MenuRefresh from './MenuRefresh'
import MenuRemoveFromChronicle from './MenuRemoveFromChronicle'

// eslint-disable-next-line no-unused-vars
const styles = (theme: Theme) => ({
  headerWrapper: {},
  wrapper: {
    margin: '-0.75em -1em 0 1.5em',
  },
})

interface Props extends WithStyles<typeof styles> {
  id: number
  characterType: CharacterType
  header?: boolean
  chronicle?: boolean
}

const CharacterMenu = (props: Props) => {
  const { header, chronicle, characterType, id, classes } = props
  const [menuAnchor, handleOpen, handleClose] = useMenuLogic()

  return (
    <div className={header ? classes.headerWrapper : classes.wrapper}>
      <IconButton onClick={handleOpen} data-cy="character-menu" color="inherit">
        <MoreVert />
      </IconButton>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={handleClose}>
        <MenuRefresh characterType={characterType} id={id} />

        <Divider />
        <MenuImport characterType={characterType} id={id} />
        <MenuExport characterType={characterType} id={id} />
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

export default withStyles(styles)(CharacterMenu)
