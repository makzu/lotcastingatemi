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
import type { Character } from '@lca/types/character.ts'
import type { QC } from '@lca/types/qc.ts'
import { prettyAnimaLevel } from '@lca/utils/calculated/index.ts'

const styles = (theme: Theme) =>
  createStyles({
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

class AnimaDisplay extends Component<Props, State> {
  state = {
    anchor: null,
  }

  handleOpen: MouseEventHandler = (e) => {
    if (this.props.canEdit) this.setState({ anchor: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchor: null })
  }

  handleChange = (anima: number) => {
    this.props.update(this.props.character.id, anima)
    this.setState({ anchor: null })
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

const mapStateToProps = (state: RootState, props: ExposedProps) => ({
  canEdit: props.qc
    ? canIEditQc(state, props.character.id)
    : canIEditCharacter(state, props.character.id),
})

const mapDispatchToProps = (
  dispatch: typeof store.dispatch,
  props: ExposedProps,
) => ({
  update: (id: number, value: number) =>
    props.qc
      ? dispatch(updateQc(id, { anima_level: value }))
      : dispatch(updateCharacter(id, { anima_level: value })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default withStyles(styles)(connector(AnimaDisplay))
