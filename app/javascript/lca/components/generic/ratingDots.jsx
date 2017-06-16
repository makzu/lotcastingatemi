import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// TODO: Replace with SVG icons or something?
const RatingDotContainer = styled.div`
  float: right;
  clear: right;
`
const RatingDot = styled.div`
  display: inline-block;
  color: transparent;
  width: 0.75em;
  height: 0.75em;
  border-radius: 0.45em;
  border: 0.125em solid black;
  margin-left: 1px;
  background-color: white;
`
const EmptyRatingDot = styled(RatingDot)``
const FullRatingDot = styled(RatingDot)`
  background-color: black;
`

function RatingDots(props) {
  const emptyCount = ( props.fillTo || 5 ) - props.rating

  const fullDots = new Array(props.rating).fill('●')
  const fullDivs = fullDots.map((dot, index) =>
    <FullRatingDot key={ index }>{dot}</FullRatingDot>
  )
  let emptyDivs = ''

  if (props.dontFill == null && emptyCount >= 0) {
    let emptyDots = new Array(emptyCount).fill('○')
    emptyDivs = emptyDots.map((dot, index) =>
      <EmptyRatingDot key={ index }>{dot}</EmptyRatingDot>
    )
  }
  return <RatingDotContainer>{ fullDivs }{ emptyDivs }</RatingDotContainer>
}

RatingDots.propTypes = {
  rating: PropTypes.number.isRequired,
  fillTo: PropTypes.number,
  dontFill: PropTypes.bool
}

export default RatingDots
