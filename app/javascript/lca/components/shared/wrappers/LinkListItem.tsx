import * as React from 'react'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'

const LcaLink = ({ to, ...props }: any) => <Link to={to} {...props} />

const LinkListItem = (props: {
  to: string
  children: React.ReactNode
  onClick?(): void
}) => <ListItem button component={LcaLink} {...props} />

export default LinkListItem
