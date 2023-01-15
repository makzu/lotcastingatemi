import * as React from 'react'
import { Link } from 'react-router-dom'

import { MenuItem } from '@mui/material'

const LcaLink = ({ to, ...props }: any) => <Link to={to} {...props} />
const LinkMenuItem = (props: { to: string; children: React.ReactNode }) => (
  <MenuItem button component={LcaLink} {...props} />
)

export default LinkMenuItem
