// @flow
import React, { Component } from 'react'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc'
import { cloneDeep } from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import ContentRemoveCircle from '@material-ui/icons/RemoveCircle'

const SortableItem = SortableElement(({ children }) => children)
const SortableList = SortableContainer(({ items }) => <div>{items}</div>)
const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={e => e.preventDefault()} />
))

export type ListAttributeFieldTypes = {
  character: Object,
  trait: Object,
  onChange: Function,
  classes: Object,
}

const styles = theme => ({
  fieldContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  grabHandle: {
    marginRight: theme.spacing.unit,
  },
  nameField: {
    flex: 1,
    marginRight: theme.spacing.unit,
  },
  withMargin: {
    marginRight: theme.spacing.unit,
  },
  checkboxWrap: {
    paddingTop: theme.spacing.unit,
  },
  floatingLabel: {
    ...theme.typography.caption,
    marginBottom: -theme.spacing.unit * 1.25,
    textAlign: 'center',
  },
})

type Props = {
  character: Object,
  trait: string,
  label: string,
  newObject: Object | string,
  nonObject?: boolean,
  Fields: Function,
  onChange: Function,
  classes: Object,
}
class ListAttributeEditor extends Component<Props> {
  onChange = (index, e) => {
    const { character, trait, nonObject } = this.props
    var newTrait = cloneDeep(character[trait])

    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    if (nonObject) newTrait[index] = val
    else newTrait[index][e.target.name] = val

    this.handleChange(newTrait)
  }

  onAdd() {
    const { character, trait } = this.props
    this.handleChange([...character[trait], this.props.newObject])
  }

  onRemove(index) {
    const { character, trait } = this.props
    var newTrait = [...character[trait]]
    newTrait.splice(index, 1)

    this.handleChange(newTrait)
  }

  handleSort = ({ oldIndex, newIndex }) => {
    const { character, trait } = this.props
    var newTrait = arrayMove(character[trait], oldIndex, newIndex)

    this.handleChange(newTrait)
  }

  handleChange(newTrait) {
    this.props.onChange({ target: { name: this.props.trait, value: newTrait } })
  }

  render() {
    const { character, trait, Fields, classes } = this.props
    const { onChange, onAdd, onRemove, handleSort } = this

    const rows = character[trait].map((t, index) => (
      <SortableItem key={index} index={index}>
        <div className={classes.fieldContainer}>
          <Typography component="div" className={classes.grabHandle}>
            <Handle />
          </Typography>
          <Fields
            trait={t}
            character={character}
            onChange={onChange.bind(this, index)}
            classes={classes}
          />
          <IconButton onClick={onRemove.bind(this, index)}>
            <ContentRemoveCircle />
          </IconButton>
        </div>
      </SortableItem>
    ))

    return (
      <div data-cy={`${this.props.trait}-list-editor`}>
        <Typography variant="subtitle1">
          {this.props.label}
          <Button
            onClick={onAdd.bind(this)}
            data-cy={`add-${this.props.trait}`}
          >
            Add &nbsp;
            <ContentAddCircle />
          </Button>
        </Typography>
        {rows.length == 0 && <Typography paragraph>None</Typography>}
        <SortableList
          items={rows}
          onSortEnd={handleSort}
          useDragHandle={true}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ListAttributeEditor)
