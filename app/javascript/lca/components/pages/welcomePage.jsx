import React from 'react'
import Typography from 'material-ui/Typography'

export default function WelcomePage() {
  return(<div>
    <Typography variant="headline" gutterBottom>
      Lot-Casting Atemi
    </Typography>
    <Typography gutterBottom>
      <strong>Cost:</strong> 15m, 1wp, <strong>Mins:</strong> Essence 2<br />
      <strong>Type:</strong> Simple<br />
      <strong>Keywords:</strong> None<br />
      <strong>Duration:</strong> One scene
    </Typography>
    <Typography>
      The Solar Exalted have achieved such heights of skill that even their
      games become effortless.  When a Solar activates Lot-Casting Atemi she
      instantly becomes aware of her scores and those of the other players. She
      likewise never forgets the strength of her signature moves, or the number
      of dice required to play them. She can roll those dice with but a
      thought, and no matter how distant she is from the game, all participants
      become aware of her successes.
    </Typography>
  </div>)
}
