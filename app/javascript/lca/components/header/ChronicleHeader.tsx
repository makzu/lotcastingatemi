import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import { Hidden, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'

import { getSpecificChronicle } from 'selectors'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { styles } from './HeaderStyles'
import { useAppSelector, useIdFromParams } from 'hooks'

interface Props {
  classes: any
}

const LinkTab = (props) => <Tab {...props} component={Link as any} />

function ChronicleHeader(props: Props) {
  const id = useIdFromParams()
  const chronicle = useAppSelector((state) => getSpecificChronicle(state, id))
  const path = useLocation().pathname

  if (chronicle == null || chronicle.name == null) {
    return <GenericHeader />
  }

  const { classes } = props

  const tabBasePath = `/chronicles/${chronicle.id}`

  let tabValue = 0
  if (path.includes('/combat')) {
    tabValue = 1
  } else if (path.includes('/details')) {
    tabValue = 2
  }

  const tabs = (
    <Tabs className={classes.tabs} value={tabValue} centered>
      <LinkTab label="Characters" to={tabBasePath} />
      <LinkTab label="Combat" to={tabBasePath + '/combat'} />
      <LinkTab label="Details" to={tabBasePath + '/details'} />
    </Tabs>
  )

  return (
    <>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="h6" color="inherit" className={classes.title}>
          {chronicle.name}
        </Typography>

        <Hidden smDown>{tabs}</Hidden>
      </Toolbar>

      <Hidden smUp>{tabs}</Hidden>
    </>
  )
}

export default withStyles(styles)(ChronicleHeader)
