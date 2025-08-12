import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { Publish } from '@material-ui/icons'

import { State } from 'ducks'
import { update } from 'ducks/actions/ByType'
import { getCharacterAsCharacter } from '../../../selectors/characters'
import { Character } from 'types'
import { MenuItemProps } from './CharacterMenuItem'
import CharacterDiff from './CharacterDiff' // This component will be created next

interface StateProps {
  character: Character
}

interface DispatchProps {
  updateCharacter(character: Character): void
}

interface InnerProps extends StateProps, DispatchProps {
  characterType: string
}

const ImportButton = ({ character, updateCharacter, characterType }: InnerProps) => {
  const [diffing, setDiffing] = useState(false)
  const [importedCharacter, setImportedCharacter] = useState<Character | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result
        if (typeof text === 'string') {
          const imported = JSON.parse(text)
          // Basic validation
          if (imported.name && imported.type) {
            setImportedCharacter(imported)
            setDiffing(true)
          } else {
            alert('Invalid character file.')
          }
        }
      } catch (error) {
        alert('Failed to parse character file.')
        console.error(error)
      }
    }
    reader.readAsText(file)
    // Reset file input
    if(fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleConfirm = () => {
    if (importedCharacter) {
      // The update action expects the full character object.
      // The backend will handle stripping out read-only fields.
      // We need to make sure the ID of the current character is used.
      updateCharacter({ ...importedCharacter, id: character.id })
    }
    setDiffing(false)
    setImportedCharacter(null)
  }

  const handleCancel = () => {
    setDiffing(false)
    setImportedCharacter(null)
  }

  if (characterType !== 'character') {
    return null
  }

  return (
    <>
      <MenuItem button onClick={handleImportClick}>
        <ListItemIcon>
          <Publish />
        </ListItemIcon>
        <ListItemText primary="Import" />
      </MenuItem>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".json,.txt"
      />
      {diffing && importedCharacter && (
        <CharacterDiff
          oldCharacter={character}
          newCharacter={importedCharacter}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  )
}

const mapState = (state: State, { id, characterType }: MenuItemProps): StateProps => ({
  character:
    characterType === 'character' ? getCharacterAsCharacter(state, id) : null,
})

const mapDispatch = (dispatch): DispatchProps => ({
  updateCharacter: (character) => dispatch(update.character(character)),
})

export default connect<StateProps, DispatchProps, MenuItemProps>(
  mapState,
  mapDispatch
)(ImportButton)
