import type { ReactChildren } from 'react'

import { Divider, Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link as RouterLink } from 'react-router-dom'

import VERSION from '../../VERSION'

const Footer = ({ children }: { children?: ReactChildren }) => {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: (theme) => theme.spacing(6),
        textAlign: 'center',
      }}
    >
      <Divider variant="middle" />

      <Typography
        component="div"
        sx={{
          '& a': {
            color: (theme) => theme.palette.text.secondary,
            textDecorationColor: (theme) => theme.palette.text.secondary,
          },
          marginY: (theme) => theme.spacing(2),
          fontSize: '0.75rem',
        }}
      >
        <div>
          <a
            href={`https://github.com/makzu/lotcastingatemi/blob/master/CHANGELOG.md#${VERSION}`}
          >
            {VERSION}
          </a>
        </div>

        <div>Exalted is &copy; White Wolf AB and Onyx Path.</div>

        <div>
          <Link component={RouterLink} to="/privacy">
            Privacy Policy / Legal Notice
          </Link>
        </div>
      </Typography>
      {children}
    </Box>
  )
}

export default Footer
