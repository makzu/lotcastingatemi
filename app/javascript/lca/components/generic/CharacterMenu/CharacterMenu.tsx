import MoreVert from '@mui/icons-material/MoreVert'
import { Divider, IconButton, Menu, Theme } from '@mui/material'
import { WithStyles } from '@mui/styles'
import withStyles from '@mui/styles/withStyles'

import { useMenuLogic } from 'hooks'
import { CharacterType } from './CharacterMenuItem'
import MenuBattlegroupFromQc from './MenuBattlegroupFromQc'
import MenuChangeExaltType from './MenuChangeExaltType'
import MenuDelete from './MenuDelete'
import MenuDuplicate from './MenuDuplicate'
import MenuEdit from './MenuEdit'
import MenuLinks from './MenuLinks'
import MenuPinHide from './MenuPinHide'
import MenuRefresh from './MenuRefresh'
import MenuRemoveFromChronicle from './MenuRemoveFromChronicle'

const styles = (_theme: Theme) => ({
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
    </div>
  )
}

export default withStyles(styles)(CharacterMenu)
