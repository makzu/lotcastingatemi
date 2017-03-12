import React from 'react'

function RatingDots(props) {
  const fullDots = "●".repeat( props.rating );
  let emptyDots = "";

  if (props.dontFill == null) {
    emptyDots = "○".repeat( (props.fillTo || 5) - props.rating );
  }
  return <span>{ fullDots }{ emptyDots }</span>;
}

export default RatingDots
