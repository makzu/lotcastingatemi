import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from '@mui/styles/withStyles'
import type { WithStyles } from '@mui/styles'
import ButtonBase from '@mui/material/ButtonBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { updateCharacter, updateQc } from 'ducks/actions'
import { canIEditCharacter, canIEditQc } from 'selectors'
import { prettyAnimaLevel } from 'utils/calculated'
import type { withMotePool, Enhancer } from 'utils/flow-types'
import { Character } from 'types'

const styles = (theme) => ({
  wrap: {
    marginRight: theme.spacing(),
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
    ...theme.typography.h4,
    display: 'inline-block',
    fontSize: '1.75rem',
    verticalAlign: 'top',
  },
  animaValue: {
    ...theme.typography.caption,
    display: 'inline-block',
    verticalAlign: 'top',
    marginTop: '0.25em',
    marginLeft: '0.25em',
  },
})

interface ExposedProps {
  character: withMotePool & {
    id: number
    type: string
  }
  qc?: boolean
}
type Props = ExposedProps &
  WithStyles<typeof styles> & {
    canEdit: boolean
    update: $TSFixMeFunction
  }
interface State {
  anchor: EventTarget | null
}

class AnimaDisplay extends Component<Props, State> {
  state = {
    anchor: null,
  }

  handleOpen = (e) => {
    if (this.props.canEdit) this.setState({ anchor: e.currentTarget })
  }
  handleClose = () => {
    this.setState({
      anchor: null,
    })
  }

  handleChange = (anima) => {
    this.props.update(this.props.character.id, anima)
    this.setState({
      anchor: null,
    })
  }

  render() {
    const { anchor } = this.state
    const { handleOpen, handleClose, handleChange } = this
    const { character, qc, classes, canEdit } = this.props
    if (
      (qc && character.motes_personal_total === 0) ||
      character.type === 'Character'
    )
      return null
    return (
      <>
        <ButtonBase onClick={handleOpen} disabled={!canEdit}>
          <div className={classes.wrap}>
            <div className={classes.animaLabel}>Anima</div>
            <div className={classes.valueWrap}>
              <span className={classes.animaCurrent}>
                {prettyAnimaLevel(character.anima_level)}
              </span>
              {character.anima_level > 0 && (
                <span className={classes.animaValue}>
                  ({character.anima_level})
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
      </>
    )
  }
}

const mapStateToProps = (state, props: ExposedProps) => ({
  canEdit: props.qc
    ? canIEditQc(state, props.character.id)
    : canIEditCharacter(state, props.character.id),
})

const mapDispatchToProps = (
  dispatch: $TSFixMeFunction,
  props: ExposedProps,
) => ({
  update: (id: number, value: $TSFixMe) =>
    props.qc
      ? dispatch(
          updateQc(id, {
            anima_level: value,
          }),
        )
      : dispatch(
          updateCharacter(id, {
            anima_level: value,
          }),
        ),
})

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)
export default enhance(AnimaDisplay)
