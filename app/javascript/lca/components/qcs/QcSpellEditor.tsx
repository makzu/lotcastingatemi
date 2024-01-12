import * as React from 'react'
import { connect } from 'react-redux'

import { Button, Grid, Typography } from '@material-ui/core'
import { WithStyles } from '@material-ui/core/styles'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import SortableGridList from 'components/generic/SortableGridList'

import Checkbox from 'components/shared/inputs/Checkbox'
import { State } from 'ducks'
import { createSpell, destroySpell, updateSpell } from 'ducks/actions'
import { getSpellsForQc } from 'ducks/selectors'
import commonStyles from 'styles'
import { QC, Spell } from 'types'
import QcSpellFields from './QcSpellFields'
import SortableItem from 'components/generic/SortableItem'

interface StateProps {
  spells: Spell[]
}
interface DispatchProps {
  create(): void
  destroy(id: number): void
  update: $TSFixMeFunction
}
interface OuterProps {
  qc: QC
  changeQc: $TSFixMeFunction
}
interface Props
  extends OuterProps,
    StateProps,
    DispatchProps,
    WithStyles<typeof commonStyles> {}

const QcSpellEditor = (props: Props) => {
  // This should go away on migrating to hooks
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { qc, classes, create, spells, update, destroy, changeQc } = props
  const handleSort = () => undefined

  const spellList = spells.map((spell, i) => (
    <SortableItem key={spell.id} index={i}>
      <Grid item xs={12} md={6} lg={4}>
        <QcSpellFields
          key={spell.id}
          spell={spell}
          handleChange={update}
          handleDestroy={destroy}
          classes={classes}
        />
      </Grid>
    </SortableItem>
  ))

  return (
    <>
      <Typography variant="h6" component="div">
        Sorcery&nbsp;&nbsp;
        <Checkbox
          label="Is Sorcerer"
          labelPlacement="end"
          value={qc.is_sorcerer}
          name="is_sorcerer"
          onChange={changeQc}
        />
        &nbsp;&nbsp;
        {qc.is_sorcerer && (
          <Button onClick={create}>
            Add Spell
            <ContentAddCircle />
          </Button>
        )}
      </Typography>
      {qc.is_sorcerer && (
        <SortableGridList
          items={spellList}
          classes={classes}
          onSortEnd={handleSort}
          useDragHandle
          axis="x"
        />
      )}
    </>
  )
}

const mapState = (state: State, { qc }: OuterProps): StateProps => ({
  spells: getSpellsForQc(state, qc.id),
})

const mapDispatch = (dispatch, { qc }: OuterProps): DispatchProps => ({
  create: () => dispatch(createSpell(qc.id, { parent: 'qc' })),
  destroy: (id) => dispatch(destroySpell(id, qc.id, 'qc')),
  update: (id, trait) => dispatch(updateSpell(id, qc.id, trait, 'qc')),
})

export default connect(mapState, mapDispatch)(QcSpellEditor)
