import type { ReactNode } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import {
  createQcAttack,
  destroyQcAttack,
  updateQcAttack,
} from '@lca/ducks/actions.ts'
import { useAppDispatch, useAppSelector } from '@lca/hooks/index.ts'
import {
  getAttacksForBattlegroup,
  getAttacksForQc,
} from '@lca/selectors/index.ts'
import type { Battlegroup, QC } from '@lca/types/index.ts'
import QcAttackFields from './QcAttackFields.tsx'

interface SortableProps {
  id: number
  index: number
  children: ReactNode
}
const Sortable = ({ id, index, children }: SortableProps) => {
  const { ref } = useSortable({ id, index })

  return <div ref={ref}>{children}</div>
}

type ExposedProps = {
  qc: QC | Battlegroup
  battlegroup?: boolean
}

const QcAttackEditor = (props: ExposedProps) => {
  const dispatch = useAppDispatch()
  const { qc, battlegroup } = props
  const type = battlegroup ? 'battlegroup' : 'qc'

  const qc_attacks = useAppSelector((state) =>
    battlegroup
      ? getAttacksForBattlegroup(state, qc.id)
      : getAttacksForQc(state, qc.id),
  )

  const handleAdd = () => {
    dispatch(createQcAttack(qc.id, { parent: type }))
  }

  const handleChange = (id: number, trait) => {
    dispatch(updateQcAttack(id, qc.id, trait, type))
  }

  const handleRemove = (id: number) => {
    dispatch(destroyQcAttack(id, qc.id, type))
  }

  const qcAttacks = qc_attacks.map((attack, i) => (
    <Sortable id={attack.id} index={i} key={attack.id}>
      <QcAttackFields
        attack={attack}
        qc={qc}
        onAttackChange={handleChange}
        onRemoveClick={handleRemove}
        battlegroup={battlegroup}
      />
    </Sortable>
  ))

  return (
    <div>
      <Typography variant="subtitle1">
        Attacks
        <Button onClick={handleAdd}>
          Add Attack&nbsp;
          <ContentAddCircle />
        </Button>
      </Typography>

      <DragDropProvider
        onDragEnd={(event) => {
          const { source } = event.operation

          if (isSortable(source)) {
            if (source.index === source.initialIndex) {
              return
            }

            dispatch(
              updateQcAttack(
                source.id as number,
                qc.id,
                {
                  sorting_position: source.index,
                },
                type,
              ),
            )
          }
        }}
      >
        {qcAttacks}
      </DragDropProvider>
    </div>
  )
}

export default QcAttackEditor
