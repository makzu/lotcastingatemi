import { Box, Divider, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import VERSION from '../../VERSION'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        marginTop: theme.spacing(6),
        textAlign: 'center',
      })}
    >
      <Divider variant="middle" />

      <Typography
        component="div"
        sx={(theme) => ({
          '& a': {
            color: theme.palette.text.secondary,
            textDecorationColor: theme.palette.text.secondary,
          },
          marginY: theme.spacing(2),
          fontSize: '0.75rem',
        })}
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
    </Box>
  )
}

export default Footer