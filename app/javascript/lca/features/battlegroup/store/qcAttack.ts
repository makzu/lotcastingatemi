import { type APIPartial, PATCH, POST } from '@/features/api'
import type { QcAttack } from '@/types/qc'
import { BATTLEGROUP, battlegroupApi } from './battlegroup'

type QcAttackPartial = APIPartial<QcAttack> & Pick<QcAttack, 'qc_attackable_id'>

export const bgAttackApi = battlegroupApi.injectEndpoints({
  endpoints: (build) => ({
    updateBattlegroupAttack: build.mutation<void, QcAttackPartial>({
      query: ({ id, qc_attackable_id, ...patch }) => ({
        url: `battlegroups/${qc_attackable_id}/qc_attacks/${id}`,
        method: PATCH,
        body: patch,
      }),
      async onQueryStarted(
        { id, qc_attackable_id, ...patch },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          bgAttackApi.util.updateQueryData(
            'getBattlegroup',
            qc_attackable_id,
            (draft) => {
              const attack = draft.qc_attacks.find((a) => a.id === id)
              if (attack) {
                Object.assign(attack, patch)
              }
            },
          ),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (_result, _error, { qc_attackable_id }) => [
        { type: BATTLEGROUP, id: qc_attackable_id },
      ],
    }),

    createBattlegroupAttack: build.mutation<QcAttack, Partial<QcAttack>>({
      query: (qc_attack) => ({
        url: `battlegroups/${qc_attack.qc_attackable_id}/qc_attacks`,
        method: POST,
        body: qc_attack,
      }),
      invalidatesTags: (_result, _error, { qc_attackable_id }) => [
        { type: BATTLEGROUP, id: qc_attackable_id },
      ],
    }),

    deleteBattlegroupAttack: build.mutation<void, QcAttackPartial>({
      query: ({ id }) => ({ url: `qc_attacks/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, { qc_attackable_id }) => [
        { type: BATTLEGROUP, id: qc_attackable_id },
      ],
    }),
  }),
})
