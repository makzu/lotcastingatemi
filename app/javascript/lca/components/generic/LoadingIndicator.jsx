// @flow

import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import SvgIcon from '@material-ui/core/SvgIcon'

import DawnSpinner from 'icons/DawnSpinner'

const styles = (theme) => ({
  wrap: {
    display: 'block',
    position: 'fixed',
    bottom: '2em',
    width: '100%',
    textAlign: 'center',
    zIndex: '2000',
  },
  paper: {
    display: 'inline-block',
    padding: '0.5em',
    borderRadius: '2em',
  },
  icon: {
    animation: 'spin 0.8s steps(8, end) infinite',
    stroke: theme.typography.body1.color,
    height: '1.75em',
    width: '1.75em',
    marginBottom: '-4px',
  },
})

type Props = { loading: boolean, classes: Object }
class LoadingSpinner extends PureComponent<Props> {
  render() {
    const { loading, classes } = this.props
    return (
      <Slide
        direction="up"
        in={loading}
        mountOnEnter
        unmountOnExit
        style={{ transitionDelay: loading ? 250 : 0 }}
      >
        <div className={classes.wrap}>
          <Paper square={false} elevation={6} classes={{ root: classes.paper }}>
            <SvgIcon viewBox="0 0 51 51" className={classes.icon}>
              <DawnSpinner />
            </SvgIcon>
          </Paper>
        </div>
      </Slide>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.app.loading,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(LoadingSpinner)
