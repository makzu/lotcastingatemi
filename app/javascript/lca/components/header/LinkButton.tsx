import * as React from 'react'
import { Link } from 'react-router-dom'

import Button, { ButtonProps } from '@material-ui/core/Button'

interface LinkButtonProps extends ButtonProps {
  to: string
  replace?: boolean
}

const LinkButton = (props: LinkButtonProps) => (
  // FIXME bad prop passing for the component prop
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  <Button {...props} component={Link as any} />
)

export default LinkButton
