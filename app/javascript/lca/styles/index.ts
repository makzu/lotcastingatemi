import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'

// Common styling and theming elements used by most things
const commonStyles = (theme: Theme) =>
  createStyles({
    stickyHeader: {
      position: 'sticky',
      top: '0px',
      zIndex: 2,
      backgroundColor: theme.palette.background.default,
    },
    markdown: {
      '& a': {
        color: 'unset',
      },
      '& img': {
        maxWidth: '100%',
      },
      '& code': {
        opacity: 0.7,
      },
    },
    flexContainer: {
      display: 'flex',
    },
    flexContainerWrap: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    flexContainerSpread: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    flexCol: {
      display: 'flex',
      flex: 1,
    },
    fieldSeparator: {
      alignSelf: 'flex-end',
      marginRight: theme.spacing(),
      marginBottom: theme.spacing(),
    },
  })

export default commonStyles
