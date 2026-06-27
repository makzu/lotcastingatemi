import type { ChangeEventHandler } from 'react'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from '@lca/components/generic/ListAttributeEditor.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import Checkbox from '@lca/components/shared/inputs/Checkbox.tsx'
import type { WithSharedStats } from '@lca/types/shared.ts'
import {
  INTIMACY_RATING_MAX as MAX,
  INTIMACY_RATING_MIN as MIN,
} from '@lca/utils/constants.ts'
import RatingField from './RatingField.tsx'

function IntimacyFields({ trait, onChange, classes }: ListAttributeFieldTypes) {
  const { subject, rating, hidden } = trait

  return (
    <>
      <TextField
        name="subject"
        value={subject}
        className={classes.nameField}
        label="Subject"
        margin="dense"
        onChange={onChange}
        style={{ flex: 1 }}
        inputProps={{ 'data-cy': 'intimacy-subject' }}
      />
      <RatingField
        trait="rating"
        value={rating}
        label="Rating"
        min={MIN}
        max={MAX}
        margin="dense"
        narrow
        onChange={onChange}
      />

      <Checkbox
        name="hidden"
        label="Hidden"
        value={hidden || false}
        onChange={onChange}
      />
    </>
  )
}

type Props = { character: WithSharedStats; onChange: ChangeEventHandler }
const IntimacyEditor = ({ character, onChange }: Props) => {
  return (
    <div>
      <ListAttributeEditor
        label="Principles"
        traitName="principles"
        trait={character.principles}
        Fields={IntimacyFields}
        newObject={{
          subject: `New Principle ${character.principles.length + 1}`,
          rating: 1,
        }}
        onChange={onChange}
      />
      <ListAttributeEditor
        label="Ties"
        traitName="ties"
        trait={character.ties}
        Fields={IntimacyFields}
        newObject={{
          subject: `New Tie ${character.ties.length + 1}`,
          rating: 1,
        }}
        onChange={onChange}
      />
    </div>
  )
}

export default IntimacyEditor
