import * as React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import { Omit } from '@material-ui/types'

import { Location } from 'history'

const LcaNavLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<NavLinkProps, 'innerRef'>
>((props, ref) => <NavLink exact innerRef={ref as any} {...props} />)

interface Props {
  to: string
  children: React.ReactNode
  exact?: boolean
  isActive?(_: {}, location: Location): boolean
  onClick?(): void
}

const NavLinkListItem = (props: Props) => (
  <ListItem button component={LcaNavLink} {...props} />
)

export default NavLinkListItem
