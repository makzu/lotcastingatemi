// @flow
import * as React from 'react'
const { Component } = React
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import { MenuItem } from 'material-ui/Menu'
import Chip from 'material-ui/Chip'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import CancelIcon from '@material-ui/icons/Cancel'
import ClearIcon from '@material-ui/icons/Clear'
import { Creatable } from 'react-select'
import 'react-select/dist/react-select.css'

import { getAllCharmCategoriesForCharacter } from 'selectors'

type OptionProps = {
  children: number | string | React.Element<> | Array<any>,
  option?: string,
  isFocused?: boolean,
  isSelected?: boolean,
  onFocus: Function,
  onSelect: Function,
}
/* Shamelessly stolen and crudely reshaped from the Material-ui react-select
 * Autocomplete example
 */
class Option extends Component<OptionProps> {
  constructor(props: OptionProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = e => {
    this.props.onSelect(this.props.option, e)
  }

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    )
  }
}
type SelectWrappedProps = { classes: Object }

function SelectWrapped(props: SelectWrappedProps) {
  const { classes, ...other } = props

  return (
    <Creatable
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps

        const onDelete = event => {
          event.preventDefault()
          event.stopPropagation()
          onRemove(value)
        }

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          )
        }

        return <div className="Select-value">{children}</div>
      }}
      {...other}
    />
  )
}

const ITEM_HEIGHT = 48

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxHeight: 250,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select.is-open .Select-control': {
      background: 'transparent',
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      caretColor: theme.typography.body1.color,
      color: theme.typography.body1.color,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      color: theme.typography.body1.color,
      opacity: 0.7,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
      background: 'transparent',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  }, // */
})

type CCAProps = {
  categories: Array<string>,
  value: Array<string>,
  classes: Object,
  onChange: Function,
}
type CCAState = { categories: Array<string> }
class CharmCategoryAutocomplete extends Component<CCAProps, CCAState> {
  constructor(props) {
    super(props)
    this.state = { categories: this.props.value }
  }

  static getDerivedStateFromProps(props) {
    // eslint-disable-line no-unused-vars
    return { categories: props.value }
  }

  handleChange = e => {
    this.setState({ categories: e })
    this.props.onChange({
      target: { name: 'categories', value: e.length === 0 ? [] : e.split(',') },
    })
  }

  render() {
    const { categories, classes } = this.props
    const suggestions = categories.map(c => ({ value: c, label: c }))

    return (
      <div className={classes.root}>
        <TextField
          fullWidth
          value={this.state.categories}
          onChange={this.handleChange}
          placeholder="Select or start typing to create one or more categories"
          name="categories"
          label="Categories"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: SelectWrapped,
            inputProps: {
              classes,
              multi: true,
              instanceId: 'react-select-chip-label',
              id: 'react-select-chip-label',
              simpleValue: true,
              options: suggestions,
            },
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  categories: getAllCharmCategoriesForCharacter(state, props.id),
})
export default withStyles(styles)(
  connect(mapStateToProps)(CharmCategoryAutocomplete)
)
