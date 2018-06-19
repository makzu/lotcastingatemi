// @flow
import * as React from 'react'
const { Component, Fragment } = React
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { updateCharacter, updateQc } from 'ducks/actions.js'
import { canIEditCharacter, canIEditQc } from 'selectors'
import { prettyAnimaLevel } from 'utils/calculated'
import type { withMotePool } from 'utils/flow-types'

const styles = theme => ({
  wrap: {
    marginRight: theme.spacing.unit,
    minWidth: '8em',
    textAlign: 'left',
  },
  animaLabel: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
    textAlign: 'left',
    paddingLeft: '0.25rem',
  },
  valueWrap: {
    textAlign: 'left',
  },
  animaCurrent: {
    ...theme.typography.display1,
    display: 'inline-block',
    fontSize: '1.75rem',
    verticalAlign: 'top',
  },
  animaValue: {
    ...theme.typography.caption,
    display: 'inline-block',
    verticalAlign: 'top',
    marginTop: '0.25em',
  },
})

type Props = {
  character: withMotePool & { id: number },
  qc: boolean,
  canEdit: boolean,
  update: Function,
  classes: Object,
}
type State = {
  anchor: any,
}
class AnimaDisplay extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      anchor: null,
    }
  }

  handleOpen = e => {
    if (this.props.canEdit) this.setState({ anchor: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchor: null })
  }

  handleChange = anima => {
    this.props.update(this.props.character.id, anima)
    this.setState({ anchor: null })
  }

  render() {
    const { anchor } = this.state
    const { handleOpen, handleClose, handleChange } = this
    const { character, qc, classes } = this.props

    if (qc && character.motes_personal_total === 0) return null

    return (
      <Fragment>
        <ButtonBase onClick={handleOpen}>
          <div className={classes.wrap}>
            <div className={classes.animaLabel}>Anima</div>
            <div className={classes.valueWrap}>
              <span className={classes.animaCurrent}>
                {prettyAnimaLevel(character.anima_level)}
              </span>
              {character.anima_level > 0 && (
                <span className={classes.animaValue}>
                  &nbsp;({character.anima_level})
                </span>
              )}
            </div>
          </div>
        </ButtonBase>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
          <MenuItem
            onClick={() => handleChange(0)}
            selected={character.anima_level === 0}
          >
            Dim
          </MenuItem>
          <MenuItem
            onClick={() => handleChange(1)}
            selected={character.anima_level === 1}
          >
            Glowing
          </MenuItem>
          <MenuItem
            onClick={() => handleChange(2)}
            selected={character.anima_level === 2}
          >
            Burning
          </MenuItem>
          <MenuItem
            onClick={() => handleChange(3)}
            selected={character.anima_level === 3}
          >
            Bonfire
          </MenuItem>
        </Menu>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  canEdit: props.qc
    ? canIEditQc(state, props.character.id)
    : canIEditCharacter(state, props.character.id),
})

const mapDispatchToProps = (dispatch: Function, props) => ({
  update: (id, value) =>
    props.qc
      ? dispatch(updateQc(id, 'anima_level', value))
      : dispatch(updateCharacter(id, 'anima_level', value)),
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AnimaDisplay)
