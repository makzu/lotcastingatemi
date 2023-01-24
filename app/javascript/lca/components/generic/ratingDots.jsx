// @flow
import withStyles from '@mui/styles/withStyles'

// TODO: Replace with SVG icons or something?
const dot = {
  display: 'inline-block',
  color: 'transparent',
  overflow: 'hidden',
  width: '0.75em',
  height: '0.75em',
  borderRadius: '0.45em',
  border: '0.125em solid black',
  marginLeft: '1px',
}

const styles = () => ({
  emptyDot: {
    ...dot,
    backgroundColor: 'transparent',
  },
  fullDot: {
    ...dot,
    backgroundColor: 'black',
  },
})

type Props = {
  rating: number,
  fillTo?: number,
  dontFill?: boolean,
  classes: Object,
}
function RatingDots(props: Props) {
  const emptyCount = (props.fillTo || 5) - props.rating

  const fc = new Array(props.rating).fill('●')
  const fullDots = fc.map((dot, index) => (
    <div key={index} className={props.classes.fullDot}>
      {dot}
    </div>
  ))

  let emptyDots = ''
  if (props.dontFill == null && emptyCount >= 0) {
    let ec = new Array(emptyCount).fill('○')
    emptyDots = ec.map((dot, index) => (
      <div key={index} className={props.classes.emptyDot}>
        {dot}
      </div>
    ))
  }
  return (
    <div aria-label={props.rating}>
      {fullDots}
      {emptyDots}
      {!props.dontFill && props.fillTo && props.rating > props.fillTo && (
        <strong> +</strong>
      )}
    </div>
  )
}
export default withStyles(styles)(RatingDots)
