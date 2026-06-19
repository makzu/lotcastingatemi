import { MenuItem } from '@material-ui/core'

const HouseOptions = [
  'journeys',
  'serenity',
  'battles',
  'secrets',
  'endings',
].map((h) => (
  <MenuItem key={h} value={h} style={{ textTransform: 'capitalize' }}>
    {h}
  </MenuItem>
))

export default HouseOptions
