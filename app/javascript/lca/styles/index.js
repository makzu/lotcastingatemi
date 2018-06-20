// @flow
// Common styling and theming elements used by most things
const commonStyles = (theme: Object) => ({
  stickyHeader: {
    position: 'sticky',
    top: '-10px',
    zIndex: '2',
    backgroundColor: theme.palette.background.default,
  },
  markdown: {
    '& a': {
      color: theme.typography.body1.color,
    },
    '& img': {
      maxWidth: '100%',
    },
  },
})

export default commonStyles
