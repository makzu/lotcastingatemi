import { useLocation, Link } from 'react-router-dom'

import {
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  type Theme,
} from '@mui/material'

import { getSpecificChronicle } from '@/selectors'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { useAppSelector, useIdFromParams } from '@/hooks'

const LinkTab = (props) => <Tab {...props} component={Link} />

function ChronicleHeader() {
  const id = useIdFromParams()
  const chronicle = useAppSelector((state) => getSpecificChronicle(state, id))
  const path = useLocation().pathname
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  if (chronicle?.name == null) {
    return <GenericHeader />
  }

  const tabBasePath = `/chronicles/${chronicle.id}`

  let tabValue = 0
  if (path.includes('/combat')) {
    tabValue = 1
  } else if (path.includes('/details')) {
    tabValue = 2
  }

  const tabs = (
    <Tabs sx={{ flex: 1 }} value={tabValue} centered>
      <LinkTab label="Characters" to={tabBasePath} />
      <LinkTab label="Combat" to={tabBasePath + '/combat'} />
      <LinkTab label="Details" to={tabBasePath + '/details'} />
    </Tabs>
  )

  return (
    <>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="h6" color="inherit">
          {chronicle.name}
        </Typography>

        {!smDown && tabs}
      </Toolbar>

      {smDown && tabs}
    </>
  )
}

export default ChronicleHeader
