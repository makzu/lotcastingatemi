import React from 'react'

function RatingDots(props) {
  const fullCount = props.rating
  const emptyCount = ( props.fillTo || 5 ) - fullCount

  //const fullDots = "●".repeat( fullCount );
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

export default RatingDots
