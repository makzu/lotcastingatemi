import { Component } from 'react'
import {
  SortableContainer,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc'

import ContentAddCircle from '@mui/icons-material/AddCircle'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ContentRemoveCircle from '@mui/icons-material/RemoveCircle'
import { Button, IconButton, Typography, type Theme } from '@mui/material'
import { createStyles } from '@mui/styles'
import withStyles, { type WithStyles } from '@mui/styles/withStyles'

import { type Character, type QC } from '@/types'
import SortableItem from './SortableItem'

const SortableList = SortableContainer(({ items }) => <div>{items}</div>)
const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={(e) => e.preventDefault()} />
))

export interface ListAttributeFieldTypes {
  character: Record<string, $TSFixMe>
  trait: Record<string, $TSFixMe>
  onChange: $TSFixMeFunction
  classes: Record<string, $TSFixMe>
}

const styles = (theme: Theme) =>
  createStyles({
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
      countLabel: { ...theme.typography.caption },
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
    },
  })

interface Props extends WithStyles<typeof styles> {
  character: Character | QC
  trait: keyof (Character | QC)
  label: string
  newObject: Record<string, $TSFixMe> | string
  nonObject?: boolean
  showCount?: boolean
  Fields: React.ReactNode
  onChange: $TSFixMeFunction
}

class ListAttributeEditor extends Component<Props> {
  onChange = (index, e) => {
    const { character, trait, nonObject } = this.props
    const newTrait = JSON.parse(JSON.stringify(character[trait]))
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (nonObject) newTrait[index] = val
    else newTrait[index][e.target.name] = val
    this.handleChange(newTrait)
  }

  onAdd() {
    const { character, trait } = this.props
    this.handleChange([...character[trait], this.props.newObject])
  }

  onRemove(index: number) {
    const { character, trait } = this.props
    const newTrait = [...character[trait]]
    newTrait.splice(index, 1)
    this.handleChange(newTrait)
  }

  handleSort = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    const { character, trait } = this.props
    const newTrait = arrayMove(character[trait], oldIndex, newIndex)
    this.handleChange(newTrait)
  }

  handleChange(newTrait) {
    this.props.onChange({
      target: {
        name: this.props.trait,
        value: newTrait,
      },
    })
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
