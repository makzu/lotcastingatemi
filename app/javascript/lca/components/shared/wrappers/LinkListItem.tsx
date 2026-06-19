import { forwardRef, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { ListItem } from '@material-ui/core'

const LcaLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'innerRef'>>(
  (props, ref) => <Link innerRef={ref as any} {...props} />,
)

const LinkListItem = (props: {
  to: string
  children: ReactNode
  onClick?(): void
}) => <ListItem button component={LcaLink} {...props} />

export default LinkListItem
