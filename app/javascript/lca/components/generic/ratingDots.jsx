import React from 'react'

function RatingDots(props) {
  const emptyCount = ( props.fillTo || 5 ) - props.rating

  const fullDots = new Array(props.rating).fill("●")
  const fullDivs = fullDots.map((dot, index) =>
    <div key={ index } className="ratingDot ratingDotFull">{dot}</div>
  )
  let emptyDivs = "";

  if (props.dontFill == null && emptyCount >= 0) {
    let emptyDots = new Array(emptyCount).fill("○")
    emptyDivs = emptyDots.map((dot, index) =>
      <div key={ index } className="ratingDot ratingDotEmpty">{dot}</div>
    )
  }
  return <span className="ratingDotContainer">{ fullDivs }{ emptyDivs }</span>;
}

RatingDots.propTypes = {
  rating: React.PropTypes.number.isRequired,
  fillTo: React.PropTypes.number,
  dontFill: React.PropTypes.bool
}

export default RatingDots
