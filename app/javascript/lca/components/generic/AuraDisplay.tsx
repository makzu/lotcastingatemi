import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from '@mui/styles/withStyles'
import ButtonBase from '@mui/material/ButtonBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { updateCharacter, updateQc } from 'ducks/actions'
import { canIEditCharacter, canIEditQc } from 'selectors'
import type { Enhancer } from 'utils/flow-types'
import type { WithAura } from 'types/shared'
import type { WithId } from 'types/_lib'

const styles = (theme) => ({
  wrap: {
    marginRight: theme.spacing(),
    minWidth: '5.5em',
    textAlign: 'left',
  },
  label: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
    textAlign: 'left',
    paddingLeft: '0.25rem',
  },
  current: {
    ...theme.typography.h4,
    fontSize: '1.75rem',
    display: 'inline-block',
    verticalAlign: 'top',
    textTransform: 'capitalize',
  },
})

interface ExposedProps {
  character: WithAura & WithId
  qc?: boolean
}
type Props = ExposedProps & {
  canEdit: boolean
  update: $TSFixMeFunction
  classes: Record<string, $TSFixMe>
}
interface State {
  anchor: MenuProps['anchorEl']
}

class AuraDisplay extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      anchor: null,
    }
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
    const { character, canEdit, classes } = this.props

    if (character.aura == null || character.aura === '') return null

    return (
      <>
        <ButtonBase onClick={handleOpen} disabled={!canEdit}>
          <div className={classes.wrap}>
            <div className={classes.label}>Aura</div>
            <div>
              <span className={classes.current}>{character.aura}</span>
            </div>
          </div>
        </ButtonBase>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
          <MenuItem
            onClick={() => handleChange('none')}
            selected={character.aura === 'none'}
          >
            None
          </MenuItem>
          <MenuItem
            onClick={() => handleChange('air')}
            selected={character.aura === 'air'}
          >
            Air
          </MenuItem>
          <MenuItem
            onClick={() => handleChange('earth')}
            selected={character.aura === 'earth'}
          >
            Earth
          </MenuItem>
          <MenuItem
            onClick={() => handleChange('fire')}
            selected={character.aura === 'fire'}
          >
            Fire
          </MenuItem>
          <MenuItem
            onClick={() => handleChange('water')}
            selected={character.aura === 'water'}
          >
            Water
          </MenuItem>
          <MenuItem
            onClick={() => handleChange('wood')}
            selected={character.aura === 'wood'}
          >
            Wood
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
  update: (id: number, value) =>
    props.qc
      ? dispatch(
          updateQc(id, {
            aura: value,
          }),
        )
      : dispatch(
          updateCharacter(id, {
            aura: value,
          }),
        ),
})

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)
export default enhance(AuraDisplay)
