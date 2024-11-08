import { Button, type ButtonProps } from '@mui/material'
import { Link, type LinkProps } from 'react-router-dom'

const LinkButton = (props: ButtonProps & LinkProps) => (
  <Button component={Link} color="inherit" {...props} sx={{ ml: 1 }} />
)

export default LinkButton
