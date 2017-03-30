import { createSelector } from 'reselect'

const character = (state) => state.characters.characters

export const computedValues = createSelector([character], (character) => {
})
