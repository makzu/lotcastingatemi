import commonStyles from 'styles'

const styles = (theme: Record<string, $TSFixMe>) => ({
  ...commonStyles(theme),
  summaryWrap: {
    position: 'relative',
  },
  charmAnchor: {
    display: 'hidden',
    position: 'absolute',
    top: '-5.55em',
  },
  detailsWrap: {
    width: '100%',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  expandedSummary: {
    marginBottom: '-20px',
  },
  expandedEditSummary: {
    marginBottom: '-60px',
  },
  meritName: { ...theme.typography.caption, textTransform: 'capitalize' },
  maStyleLine: {},
  charmBody: {
    whiteSpace: 'pre-line',
  },
})

export default styles
