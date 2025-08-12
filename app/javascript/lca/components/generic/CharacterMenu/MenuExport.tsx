import * as React from 'react'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { GetApp } from '@material-ui/icons'

import { State } from 'ducks'
import { getCharacterAsCharacter } from '../../../selectors/characters'
import { Character } from 'types'
import { MenuItemProps } from './CharacterMenuItem'

interface StateProps {
  character: Character
}

interface InnerProps extends StateProps {
  characterType: string
}

const ExportButton = ({ character, characterType }: InnerProps) => {
  if (!character) {
    return null
  }

  const handleExport = () => {
    const characterJson = JSON.stringify(character, null, 2)
    const blob = new Blob([characterJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const timestamp = new Date().toISOString()
    link.download = `${timestamp}-${character.name}.json.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <MenuItem button onClick={handleExport}>
      <ListItemIcon>
        <GetApp />
      </ListItemIcon>
      <ListItemText primary="Export" />
    </MenuItem>
  )
}

const mapState = (state: State, { id, characterType }: MenuItemProps): StateProps => ({
  character:
    characterType === 'character' ? getCharacterAsCharacter(state, id) : null,
})

export default connect<StateProps, {}, MenuItemProps>(mapState)(ExportButton)
