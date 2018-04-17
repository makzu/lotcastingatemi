// @flow
// Common styling and theming elements used by most things
const commonStyles = (theme: Object) => ({
  stickyHeader: {
    position: 'sticky',
    top: '-10px',
    zIndex: '2',
    backgroundColor: theme.palette.background.default,
  },
})

export default commonStyles
