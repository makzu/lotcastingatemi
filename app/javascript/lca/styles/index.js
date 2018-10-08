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
  flexCol: {},
})

export default commonStyles
