// @flow
// Common styling and theming elements used by most things
const commonStyles = (theme: Object) => ({
  stickyHeader: {
    position: 'sticky',
    top: '0px',
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
  flexCol: {},
  fieldSeparator: {
    alignSelf: 'flex-end',
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
})

export default commonStyles
