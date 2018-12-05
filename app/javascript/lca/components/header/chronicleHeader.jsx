// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { GenericHeader } from './header.jsx'
import LcaDrawerButton from './lcaDrawerButton.jsx'
import { getSpecificChronicle, amIStOfChronicle } from 'selectors'
import type { Chronicle, Enhancer } from 'utils/flow-types'

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  tabs: {
    flex: 1,
  },
  title: {},
})

type ExposedProps = {
  match: { params: { chronicleId: number } },
  location: { pathname: string },
}
type Props = ExposedProps & {
  id: number,
  chronicle: Chronicle,
  path: string,
  is_st: boolean,
  classes: Object,
}

function ChronicleHeader(props: Props) {
  if (props.chronicle == undefined || props.chronicle.name == undefined)
    return <GenericHeader />

  const { chronicle, path, classes } = props
  const tabBasePath = `/chronicles/${chronicle.id}`

  let tabValue = 0
  if (path.includes('/combat')) tabValue = 1
  else if (path.includes('/details')) tabValue = 2

  const tabs = (
    <Tabs className={classes.tabs} value={tabValue} centered>
      <Tab label="Characters" component={Link} to={tabBasePath} />
      <Tab label="Combat" component={Link} to={tabBasePath + '/combat'} />
      <Tab label="Details" component={Link} to={tabBasePath + '/details'} />
    </Tabs>
  )

  return (
    <div>
      <Toolbar>
        <LcaDrawerButton />

        <Typography variant="title" color="inherit" className={classes.title}>
          {chronicle.name}
        </Typography>

        <Hidden xsDown>{tabs}</Hidden>
      </Toolbar>

      <Hidden smUp>{tabs}</Hidden>
    </div>
  )
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const id = ownProps.match.params.chronicleId
  const chronicle = getSpecificChronicle(state, id)
  const is_st = amIStOfChronicle(state, id)
  const path = ownProps.location.pathname

  return {
    id,
    chronicle,
    is_st,
    path,
  }
}

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps),
  withStyles(styles)
)
export default enhance(ChronicleHeader)
