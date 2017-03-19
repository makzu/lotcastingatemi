import React from 'react'

function RatingDots(props) {
  const fullCount = props.rating
  const emptyCount = ( props.fillTo || 5 ) - fullCount

  const fullDots = "●".repeat( fullCount );
  let emptyDots = "";

  if (props.dontFill == null && emptyCount >= 0) {
    emptyDots = "○".repeat( emptyCount );
  }
  return <span>{ fullDots }{ emptyDots }</span>;
}

export default RatingDots
