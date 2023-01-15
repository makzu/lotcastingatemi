// @flow
import * as React from 'react'
const { Component, Fragment } = React
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SortableElement } from 'react-sortable-hoc'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import HelpIcon from '@material-ui/icons/Help'

import MeritFields from './MeritFields.jsx'
import DocumentTitle from 'components/generic/DocumentTitle'
import SortableGridList from 'components/generic/SortableGridList.jsx'

import ProtectedComponent from 'containers/ProtectedComponent'
import { updateMerit, createMerit, destroyMerit } from 'ducks/actions.js'
import { getSpecificCharacter, getMeritsForCharacter } from 'selectors'
import commonStyles from 'styles'
import type { Character, fullMerit as Merit, Enhancer } from 'utils/flow-types'

const SortableItem = SortableElement(({ children }) => children)

const styles = (theme) => commonStyles(theme)

/* LATER: possible autocomplete for merits in the book with merit_name, cat, and
 * ref pre-filled
 * TODO:  See how kosher something like above would be
 * */
type ExposedProps = {
  match: { params: { characterId: number } },
}
type Props = ExposedProps & {
  character: Character,
  merits: Array<Merit>,
  updateMerit: Function,
  destroyMerit: Function,
  createMerit: Function,
  classes: Object,
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

  handleSort = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return
    const meritA = this.props.merits[oldIndex]
    const meritB = this.props.merits[newIndex]
    const offset = meritA.sort_order > meritB.sort_order ? -1 : 1
    this.props.updateMerit(meritA.id, this.props.character.id, {
      sort_order: meritB.sort_order + offset,
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
      <Fragment>
        <DocumentTitle
          title={`${this.props.character.name} Merits | Lot-Casting Atemi`}
        />

        <Hidden smUp>
          <div style={{ height: '1.5em' }}>&nbsp;</div>
        </Hidden>

        <SortableGridList
          header={
            <Typography
              variant="h5"
              component="div"
              style={{ display: 'flex' }}
            >
              <div>
                Merits &nbsp;&nbsp;
                <Button onClick={handleAdd}>
                  Add Merit&nbsp;
                  <ContentAddCircle />
                </Button>
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <IconButton component={Link} to="/help/merits">
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
          style={{ marginTop: '2.5em', marginBottom: '-1.5em' }}
        >
          {totalDots} dots of merits total
        </Typography>
      </Fragment>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)
  let merits = []

  if (character != undefined && character.merits != undefined) {
    merits = getMeritsForCharacter(state, id)
  }

  return {
    character,
    merits,
  }
}
const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps, { updateMerit, destroyMerit, createMerit }),
  withStyles(styles),
  ProtectedComponent,
)

export default enhance(MeritEditor)
