import React from 'react'

export function EditorBlock(props) {
  const type = props.type || "text"

  let extraProps = {}

  if (type == "number")
    extraProps.min = props.min || 0

  if (type == "number" && ! props.noMax )
    extraProps.max = props.max || 5

  return(<div>
    <label htmlFor={ props.trait }>{ props.prettyName }:</label>
    <input type={ type } name={ props.trait } value={ props.value }
      onChange={ props.onChange } onBlur={ props.onBlur } {...extraProps} />
  </div>)
}

