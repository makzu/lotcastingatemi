import { connect } from 'react-redux'

import ContentAddCircle from '@mui/icons-material/AddCircle'
import { Button, Grid, Typography } from '@mui/material'

import SortableGridList from 'components/generic/SortableGridList'

import Checkbox from 'components/shared/inputs/Checkbox'
import { createSpell, destroySpell, updateSpell } from 'ducks/actions'
import { getSpellsForQc } from 'ducks/selectors'
import { useAppDispatch } from 'hooks'
import type { AppDispatch, RootState } from 'store'
import type { QC, Spell } from 'types'
import QcSpellFields from './QcSpellFields'
import SortableItem from 'components/generic/SortableItem'

interface StateProps {
  spells: Spell[]
}
interface DispatchProps {
  destroy(id: number): void
  update(id: number, trait: Partial<QC>): void
}
interface OuterProps {
  qc: QC
  changeQc: $TSFixMeFunction
}
interface Props extends OuterProps, StateProps, DispatchProps {}

const QcSpellEditor = (props: Props) => {
  const dispatch = useAppDispatch()
  const create = () => dispatch(createSpell(qc.id, { parent: 'qc' }))

  const { qc, spells, update, destroy, changeQc } = props
  const handleSort = () => undefined

  const spellList = spells.map((spell, i) => (
    <SortableItem key={spell.id} index={i}>
      <Grid item xs={12} md={6} lg={4}>
        <QcSpellFields
          key={spell.id}
          spell={spell}
          handleChange={update}
          handleDestroy={destroy}
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
            {' '}
            Add Spell <ContentAddCircle />{' '}
          </Button>
        )}
      </Typography>
      {qc.is_sorcerer && (
        <SortableGridList
          classes={{}}
          items={spellList}
          onSortEnd={handleSort}
          useDragHandle
          axis="x"
        />
      )}
    </>
  )
}

const mapState = (state: RootState, { qc }): StateProps => ({
  spells: getSpellsForQc(state, qc.id),
})

const mapDispatch = (dispatch: AppDispatch, { qc }: OuterProps) => ({
  destroy: (id) => dispatch(destroySpell(id, qc.id, 'qc')),
  update: (id, trait) => dispatch(updateSpell(id, qc.id, trait, 'qc')),
})

export default connect(mapState, mapDispatch)(QcSpellEditor)
