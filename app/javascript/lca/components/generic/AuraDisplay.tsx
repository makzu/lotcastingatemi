import { Component, type MouseEventHandler } from 'react'
import { type ConnectedProps, connect } from 'react-redux'
import ButtonBase from '@material-ui/core/ButtonBase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {
  createStyles,
  type Theme,
  type WithStyles,
  withStyles,
} from '@material-ui/core/styles'

import { updateCharacter, updateQc } from '@lca/ducks/actions.ts'
import { canIEditCharacter, canIEditQc } from '@lca/selectors/index.ts'
import type store from '@lca/store.ts'
import type { RootState } from '@lca/store.ts'
import type { Character, QC } from '@lca/types/index.ts'

const styles = (theme: Theme) =>
  createStyles({
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
  character: Character | QC
  qc?: boolean
}
interface Props
  extends ExposedProps,
    PropsFromRedux,
    WithStyles<typeof styles> {}
type State = {
  anchor: Element | null
}

class AuraDisplay extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      anchor: null,
    }
  }

  handleOpen: MouseEventHandler = (e) => {
    if (this.props.canEdit) this.setState({ anchor: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchor: null })
  }

  handleChange = (aura: Character['aura']) => {
    this.props.update(this.props.character.id, aura)
    this.setState({ anchor: null })
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

const mapStateToProps = (state: RootState, props: ExposedProps) => ({
  canEdit: props.qc
    ? canIEditQc(state, props.character.id)
    : canIEditCharacter(state, props.character.id),
})

const mapDispatchToProps = (
  dispatch: typeof store.dispatch,
  props: ExposedProps,
) => ({
  update: (id: number, value: Character['aura']) =>
    props.qc
      ? dispatch(updateQc(id, { aura: value }))
      : dispatch(updateCharacter(id, { aura: value })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default withStyles(styles)(connector(AuraDisplay))
