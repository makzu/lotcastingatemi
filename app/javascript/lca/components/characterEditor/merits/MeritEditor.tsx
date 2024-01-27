import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'

import ContentAddCircle from '@mui/icons-material/AddCircle'
import HelpIcon from '@mui/icons-material/Help'
import withStyles from '@mui/styles/withStyles'

import DocumentTitle from '@/components/generic/DocumentTitle'
import SortableGridList from '@/components/generic/SortableGridList'
import SortableItem from '@/components/generic/SortableItem'
import ProtectedComponent from '@/containers/ProtectedComponent'
import { createMerit, destroyMerit, updateMerit } from '@/ducks/actions'
import { getSpecificCharacter } from '@/ducks/entities/character'
import { getMeritsForCharacter } from '@/selectors'
import commonStyles from '@/styles'
import type {
  Character,
  Enhancer,
  fullMerit as Merit,
} from '@/utils/flow-types'
import MeritFields from './MeritFields'

import { updateMeritSort } from '@/ducks/entities/merit'
import { RootState } from '@/store'
import {
  Button,
  Grid,
  Hidden,
  IconButton,
  Theme,
  Typography,
} from '@mui/material'

const styles = (theme: Theme) => commonStyles(theme)

/* LATER: possible autocomplete for merits in the book with merit_name, cat, and
 * ref pre-filled
 * TODO:  See how kosher something like above would be
 * */
interface ExposedProps {
  match: {
    params: {
      characterId: number
    }
  }
}
type Props = ExposedProps & {
  character: Character
  merits: Merit[]
  updateMerit: $TSFixMeFunction
  destroyMerit: $TSFixMeFunction
  createMerit: $TSFixMeFunction
  updateMeritSort: $TSFixMeFunction
  classes: Record<string, $TSFixMe>
}

class MeritEditor extends Component<Props> {
  handleUpdate = (id, charId, trait) => {
    this.props.updateMerit(id, charId, trait)
  }
  handleAdd = () => {
    this.props.createMerit(this.props.character.id)
  }
  handleRemove = (id) => {
    this.props.destroyMerit(id, this.props.character.id)
  }
  handleSort = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    if (oldIndex === newIndex) return
    const meritA = this.props.merits[oldIndex]!
    const meritB = this.props.merits[newIndex]!
    const offset = meritA.sorting > meritB.sorting ? -1 : 1
    this.props.updateMeritSort({
      id: meritA.id,
      sorting: meritB.sorting + offset,
    })
    this.props.updateMerit(meritA.id, this.props.character.id, {
      sorting_position: newIndex,
    })
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return (
        <div>
          <Typography paragraph>This Character has not yet loaded.</Typography>
        </div>
      )
    const { handleAdd, handleRemove, handleSort } = this
    const { merits, updateMerit, classes } = this.props
    const mts = merits.map((m, i) => (
      <SortableItem key={m.id} index={i}>
        <Grid item key={m.id} xs={12} md={6} xl={4}>
          <MeritFields
            merit={m}
            character={this.props.character}
            onUpdate={updateMerit}
            onRemove={handleRemove}
          />
        </Grid>
      </SortableItem>
    ))
    const totalDots = merits.reduce((acc, merit) => acc + merit.rating, 0)
    return (
      <>
        <DocumentTitle
          title={`${this.props.character.name} Merits | Lot-Casting Atemi`}
        />

        <Hidden smUp>
          <div
            style={{
              height: '1.5em',
            }}
          >
            &nbsp;
          </div>
        </Hidden>

        <SortableGridList
          header={
            <Typography
              variant="h5"
              component="div"
              style={{
                display: 'flex',
              }}
            >
              <div>
                Merits &nbsp;&nbsp;
                <Button onClick={handleAdd}>
                  Add Merit&nbsp;
                  <ContentAddCircle />
                </Button>
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <IconButton component={Link} to="/help/merits" size="large">
                  <HelpIcon />
                </IconButton>
              </div>
            </Typography>
          }
          items={mts}
          classes={classes}
          onSortEnd={handleSort}
          useDragHandle
          axis="xy"
        />

        <Typography
          variant="caption"
          style={{
            marginTop: '2.5em',
            marginBottom: '-1.5em',
          }}
        >
          {totalDots} dots of merits total
        </Typography>
      </>
    )
  }
}

function mapStateToProps(state: RootState, ownProps: ExposedProps) {
  const id = ownProps.params.id
  const character = getSpecificCharacter(state, id)
  let merits = []

  if (character?.merits != undefined) {
    merits = getMeritsForCharacter(state, id)
  }

  return {
    character,
    merits,
  }
}

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps, {
    updateMerit,
    destroyMerit,
    createMerit,
    updateMeritSort,
  }),
  withStyles(styles),
  ProtectedComponent,
)

export default enhance(MeritEditor)
