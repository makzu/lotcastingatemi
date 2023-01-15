// @flow
import { Component } from 'react'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc'

import withStyles from '@mui/styles/withStyles'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ContentAddCircle from '@mui/icons-material/AddCircle'
import ContentRemoveCircle from '@mui/icons-material/RemoveCircle'

const SortableItem = SortableElement(({ children }) => children)
const SortableList = SortableContainer(({ items }) => <div>{items}</div>)
const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={(e) => e.preventDefault()} />
))

export type ListAttributeFieldTypes = {
  character: Object,
  trait: Object,
  onChange: Function,
  classes: Object,
}

const styles = (theme) => ({
  fieldContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  grabHandle: {
    marginRight: theme.spacing(),
  },
  nameField: {
    flex: 1,
    marginRight: theme.spacing(),
  },
  withMargin: {
    marginRight: theme.spacing(),
  },
  checkboxWrap: {
    paddingTop: theme.spacing(),
  },
  floatingLabel: {
    ...theme.typography.caption,
    marginBottom: theme.spacing(-1.25),
    textAlign: 'center',
  },
  countLabel: {
    ...theme.typography.caption,
  },
  idField: {
    width: '3em',
    '& input': {
      '-moz-appearance': 'textfield',
    },
    '& ::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
})

type Props = {
  character: Object,
  trait: string,
  label: string,
  newObject: Object | string,
  nonObject?: boolean,
  showCount?: boolean,
  Fields: Function,
  onChange: Function,
  classes: Object,
}
class ListAttributeEditor extends Component<Props> {
  onChange = (index, e) => {
    const { character, trait, nonObject } = this.props
    var newTrait = JSON.parse(JSON.stringify(character[trait]))

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
    const { character, trait, Fields, showCount, classes } = this.props
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
          <IconButton onClick={onRemove.bind(this, index)} size="large">
            <ContentRemoveCircle />
          </IconButton>
        </div>
      </SortableItem>
    ))

    return (
      <div data-cy={`${this.props.trait}-list-editor`}>
        <Typography variant="subtitle1">
          {this.props.label}
          {showCount && (
            <span className={classes.countLabel}>
              &nbsp;({character[trait].length} total)
            </span>
          )}
          <Button
            onClick={onAdd.bind(this)}
            data-cy={`add-${this.props.trait}`}
          >
            Add &nbsp;
            <ContentAddCircle />
          </Button>
        </Typography>
        {rows.length == 0 && <Typography paragraph>None</Typography>}
        <SortableList items={rows} onSortEnd={handleSort} useDragHandle />
      </div>
    )
  }
}

export default withStyles(styles)(ListAttributeEditor)
