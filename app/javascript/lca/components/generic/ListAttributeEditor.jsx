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
  onBlur: Function,
  onRatingChange: Function,
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
  nonObject: boolean,
  Fields: Function,
  onChange: Function,
  classes: Object,
}
type State = { trait: Object }
class ListAttributeEditor extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      trait: cloneDeep(this.props.character[this.props.trait]),
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ trait: cloneDeep(newProps.character[this.props.trait]) })
  }

  onChange = (index, e) => {
    var newTrait = [...this.state.trait]
    if (this.props.nonObject) newTrait[index] = e.target.value
    else newTrait[index][e.target.name] = e.target.value
    this.setState({ trait: newTrait })
  }

  onBlur = (index, e) => {
    const { name } = e.target
    const { nonObject, character, trait } = this.props
    if (
      !nonObject &&
      this.state.trait[index][name] === character[trait][index][name]
    )
      return
    if (nonObject && this.state.trait[index] === character[trait][index]) return

    this.handleChange(this.state.trait)
  }

  onRatingChange = (index, e) => {
    var newTrait = [...this.state.trait]
    let val
    if (e.target.type === 'checkbox') val = e.target.checked
    else val = e.target.value
    newTrait[index][e.target.name] = val

    this.handleChange(newTrait)
  }

  onAdd() {
    var newTrait = [...this.state.trait, this.props.newObject]
    this.handleChange(newTrait)
  }

  onRemove(index) {
    var newTrait = [...this.state.trait]
    newTrait.splice(index, 1)

    this.handleChange(newTrait)
  }

  handleSort = ({ oldIndex, newIndex }) => {
    var newTrait = arrayMove(this.state.trait, oldIndex, newIndex)
    this.setState({ trait: newTrait })

    this.handleChange(newTrait)
  }

  handleChange(newTrait) {
    this.props.onChange({ target: { name: this.props.trait, value: newTrait } })
  }

  render() {
    const { character, Fields, classes } = this.props
    const {
      onChange,
      onBlur,
      onRatingChange,
      onAdd,
      onRemove,
      handleSort,
    } = this

    const rows = this.state.trait.map((t, index) => (
      <SortableItem key={index} index={index}>
        <div className={classes.fieldContainer}>
          <Typography component="div" className={classes.grabHandle}>
            <Handle />
          </Typography>
          <Fields
            trait={t}
            character={character}
            onChange={onChange.bind(this, index)}
            onBlur={onBlur.bind(this, index)}
            onRatingChange={onRatingChange.bind(this, index)}
            classes={classes}
          />
          <IconButton onClick={onRemove.bind(this, index)}>
            <ContentRemoveCircle />
          </IconButton>
        </div>
      </SortableItem>
    ))

    return (
      <div>
        <Typography variant="subheading">
          {this.props.label}
          <Button onClick={onAdd.bind(this)}>
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
