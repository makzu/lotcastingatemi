import React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import BlockPaper from 'components/generic/blockPaper'
import RatingField from 'components/generic/RatingField'
import TextField from 'components/generic/TextField'
import { canIDeleteCharacter } from 'selectors'
import { ESSENCE_MIN, ESSENCE_MAX } from 'utils/constants'
import type { Character } from 'utils/flow-types'
import { useAppSelector } from 'hooks'

interface Props {
  character: Character
  onChange: $TSFixMeFunction
  onRatingChange: $TSFixMeFunction
  onCheck: $TSFixMeFunction
}

const BasicsEditor = ({
  character,
  onChange,
  onRatingChange,
  onCheck,
}: Props) => {
  const showPublicCheckbox = useAppSelector((state) =>
    canIDeleteCharacter(state, character.id),
  )
  return (
    <>
      {/*
      // @ts-expect-error MUI v5 should fix this */}
      <BlockPaper>
        <div
          style={{
            display: 'flex',
          }}
        >
          <TextField
            name="name"
            value={character.name}
            label="Name"
            margin="dense"
            onChange={onChange}
            inputProps={{
              // @ts-expect-error FIXME
              autocomplete: 'off',
              'data-1p-ignore': 'true',
              'data-lp-ignore': 'true',
            }}
          />

          <RatingField
            trait="essence"
            value={character.essence}
            label="Essence"
            min={ESSENCE_MIN}
            max={ESSENCE_MAX}
            onChange={onRatingChange}
            margin="dense"
          />

          {showPublicCheckbox && (
            <FormControlLabel
              label="Publicly Viewable"
              control={
                <Checkbox
                  name="public"
                  checked={character.public}
                  onChange={onCheck}
                />
              }
            />
          )}
        </div>
        <TextField
          name="description"
          value={character.description}
          label="Description"
          margin="dense"
          multiline
          fullWidth
          rows={2}
          rowsMax={10}
          onChange={onChange}
        />
      </BlockPaper>
    </>
  )
}

export default BasicsEditor
