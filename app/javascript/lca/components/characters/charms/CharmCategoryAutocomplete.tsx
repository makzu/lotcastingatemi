import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import classNames from 'classnames'
import withStyles from '@mui/styles/withStyles'

import Select from 'react-select/lib/Creatable'
import { getAllCharmCategoriesForCharacter } from '@/selectors'
import type { Enhancer } from '@/utils/flow-types'

import {
  Chip,
  MenuItem,
  NoSsr,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

/* Shamelessly stolen and crudely reshaped from the Material-ui react-select
 * Autocomplete example
 */
const NoOptionsMessage = (props) => (
  <Typography sx={{ color: 'textSecondary' }}
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
    {props.children}>
  </Typography>
)

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

const Control = (props) => (
  <TextField
    variant="standard"
    fullWidth
    helperText="Select a category or start typing to create a new one"
    slotProps={{
      input: {
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      },
    }}
    {...props.selectProps.textFieldProps}
  />
)

const Option = (props) => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400,
    }}
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
)

const Placeholder = (props) => (
  <Typography
  sx={{      color: 'textSecondary',    }}
    className={props.selectProps.classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
)

const SingleValue = (props) => (
  <Typography
    className={props.selectProps.classes.singleValue}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
)

const ValueContainer = (props: Record<string, $TSFixMe>) => (
  <div className={props.selectProps.classes.valueContainer}>
    {props.children}
  </div>
)

const MultiValue = (props: Record<string, $TSFixMe>) => (
  <Chip
    tabIndex={-1}
    label={props.children}
    className={classNames(props.selectProps.classes.chip, {
      [props.selectProps.classes.chipFocused]: props.isFocused,
    })}
    onDelete={(event) => {
      props.removeProps.onClick()
      props.removeProps.onMouseDown(event)
    }}
  />
)

const Menu = (props) => (
  <Paper
    square
    className={props.selectProps.classes.paper}
    elevation={8}
    {...props.innerProps}
  >
    {props.children}
  </Paper>
)

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  MultiValue,
  ValueContainer,
  Menu,
}

const styles = (theme) => ({
  root: {
    flexGrow: 1, //height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
    height: '1.75em',
    '& svg': {
      marginRight: '-1px',
    },
  },
  chipFocused: {
    //   backgroundColor: emphasize(
    //     theme.palette.mode === 'light'
    //       ? theme.palette.grey[300]
    //       : theme.palette.grey[700],
    //     0.08,
    //   ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    marginTop: theme.spacing(),
    position: 'absolute',
    zIndex: '10',
    width: '100%',
  },
  divider: {
    height: theme.spacing(2),
  },
})

interface ExposedProps {
  value: string[]
  onChange: $TSFixMeFunction
}
type Props = ExposedProps & {
  categories: string[]
  classes: Record<string, $TSFixMe>
  theme: Record<string, $TSFixMe>
}
interface State {
  categories: string[]
}

class CharmCategoryAutocomplete extends Component<Props, State> {
  handleChange = (value) => {
    this.props.onChange({
      target: {
        name: 'categories',
        value: value.map((v) => v.value),
      },
    })
  }

  render() {
    const { categories, classes, theme, value } = this.props
    const suggestions = categories.map((c) => ({ value: c, label: c }))
    const val = value.map((c) => ({ value: c, label: c }))

    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
      }),
    }
    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            name="categories"
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: 'Categories',
              InputLabelProps: {
                shrink: true,
              },
            }}
            options={suggestions}
            components={components}
            value={val}
            onChange={this.handleChange}
            placeholder="Select or start typing to create one or more categories"
            isMulti
          />
        </NoSsr>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  categories: getAllCharmCategoriesForCharacter(state, props.id),
})

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true }),
)
export default enhance(CharmCategoryAutocomplete)
