import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'

import { Hidden, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'

import { State } from 'ducks'
import { amIStOfChronicle, getSpecificChronicle } from 'selectors'
import { Chronicle } from 'types'
import { RouteWithIdProps as RouteProps } from 'types/util'
import LcaDrawerButton from './DrawerButton'
import { GenericHeader } from './Header'
import { styles } from './HeaderStyles'

interface Props extends RouteComponentProps<any> {
  id: number
  chronicle: Chronicle
  path: string
  isST: boolean
  classes: any
}

const LinkTab = (props) => <Tab {...props} component={Link as any} />

function ChronicleHeader(props: Props) {
  if (props.chronicle == null || props.chronicle.name == null) {
    return <GenericHeader />
  }

  const { chronicle, path, classes } = props

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

  return <>
    <Toolbar>
      <LcaDrawerButton />

      <Typography variant="h6" color="inherit" className={classes.title}>
        {chronicle.name}
      </Typography>

      <Hidden smDown>{tabs}</Hidden>
    </Toolbar>

    <Hidden smUp>{tabs}</Hidden>
  </>
}

function mapStateToProps(state: State, { match, location }: RouteProps) {
  const id = parseInt(match.params.id, 10)

  const chronicle = getSpecificChronicle(state, id)
  const isST = amIStOfChronicle(state, id)
  const path = location.pathname

  return {
    chronicle,
    id,
    isST,
    path,
  }
}

export default compose<Props, RouteProps>(
  connect(mapStateToProps),
  withStyles(styles),
)(ChronicleHeader)
