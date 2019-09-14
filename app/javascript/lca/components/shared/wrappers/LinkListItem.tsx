import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { ListItem, Omit } from '@material-ui/core'

const LcaLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, 'innerRef'>
>((props, ref) => <Link innerRef={ref as any} {...props} />)

const LinkListItem = (props: {
  to: string
  children: React.ReactNode
  onClick?(): void
}) => <ListItem button component={LcaLink} {...props} />

export default LinkListItem
