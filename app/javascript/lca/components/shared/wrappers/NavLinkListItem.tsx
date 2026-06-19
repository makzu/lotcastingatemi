import { forwardRef, type ReactNode } from 'react'
import { NavLink, type NavLinkProps } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import type { Location } from 'history'

const LcaNavLink = forwardRef<
  HTMLAnchorElement,
  Omit<NavLinkProps, 'innerRef'>
>((props, ref) => <NavLink exact innerRef={ref as any} {...props} />)

interface Props {
  to: string
  children: ReactNode
  exact?: boolean
  isActive?(_: {}, location: Location): boolean
  onClick?(): void
}

const NavLinkListItem = (props: Props) => (
  <ListItem button component={LcaNavLink} {...props} />
)

export default NavLinkListItem
