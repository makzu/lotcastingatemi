import withStyles from '@mui/styles/withStyles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

const styles = (theme) => ({
  field: {
    marginRight: theme.spacing(),
    width: '5.65em',
  },
  armor: {
    marginRight: theme.spacing(),
    width: '7em',
  },
})

interface Props extends WithStyles<typeof styles> {
  name: string
  armor?: boolean
  value: string
  margin?: 'none' | 'dense' | 'normal'
  style?: Record<string, $TSFixMe>
  onChange: $TSFixMeFunction
}

const WeightSelect = (props: Props) => (
  <TextField
    variant="standard"
    select
    label="Weight"
    name={props.name}
    value={props.value}
    className={props.armor ? props.classes.armor : props.classes.field}
    onChange={props.onChange}
    margin={props.margin}
    style={props.style}
  >
    {props.armor && <MenuItem value="unarmored">Unarmored</MenuItem>}
    <MenuItem value="light">Light</MenuItem>
    <MenuItem value="medium">Medium</MenuItem>
    <MenuItem value="heavy">Heavy</MenuItem>
  </TextField>
)

export default withStyles(styles)(WeightSelect)
