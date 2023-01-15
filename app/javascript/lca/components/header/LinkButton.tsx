import { Link } from 'react-router-dom'

import Button, { ButtonProps } from '@mui/material/Button'

interface LinkButtonProps extends ButtonProps {
  to: string
  replace?: boolean
}

const LinkButton = (props: LinkButtonProps) => (
  <Button {...props} component={Link as any} />
)

export default LinkButton
