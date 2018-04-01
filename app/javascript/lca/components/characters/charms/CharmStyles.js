import commonStyles from '../../../styles'

const styles = theme => ({
  ...commonStyles(theme),
  summaryWrap: {
    position: 'relative',
  },
  charmAnchor: {
    display: 'hidden',
    position: 'absolute',
    top: '-5em',
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
  meritName: { ...theme.typography.caption,
    textTransform: 'capitalize',
  },
  maStyleLine: {

  },
  charmBody: {
    whiteSpace: 'pre-line',
  },
})

export default styles
