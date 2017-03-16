import React from 'react'
import { ATTRIBUTES, ABILITIES } from '../../utils/constants'

import { EditorBlock } from './editorBlock.jsx'

export function AttributeFieldset(props) {
  const { character, handleChange, handleBlur } = props

  const blox = ATTRIBUTES.map((attr) =>
    <EditorBlock key={ attr.attr } value={ character[attr.attr] }
      trait={ attr.attr } prettyName={ attr.pretty } min={ 1 }
      type="number" onChange={ handleChange } onBlur={ handleBlur } />
  )

  return(
    <fieldset>
      <legend>Attributes</legend>
      { blox }
      { props.children }
    </fieldset>
  )
}
