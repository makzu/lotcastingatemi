import {
  type APIPartial,
  DELETE,
  PATCH,
  POST,
  type SortPartial,
} from '@/features/api'
import type { QcAttack } from '../types'
import { qcApi } from './qc'

type QcAttackPartial = APIPartial<QcAttack> & Pick<QcAttack, 'qc_attackable_id'>

export const qcAttackApi = qcApi.injectEndpoints({
  endpoints: (build) => ({
    updateQCAttack: build.mutation<void, QcAttackPartial>({
      query: ({ id, qc_attackable_id, ...patch }) => ({
        url: `qcs/${qc_attackable_id}/qc_attacks/${id}`,
        method: PATCH,
        body: patch,
      }),
      // optimistic update
      async onQueryStarted(
        { id, qc_attackable_id, ...patch },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          qcAttackApi.util.updateQueryData(
            'getQc',
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
        { type: 'qc', id: qc_attackable_id },
      ],
    }),

    createQCAttack: build.mutation<QcAttack, Partial<QcAttack>>({
      query: (qc_attack) => ({
        url: `qcs/${qc_attack.qc_attackable_id}/qc_attacks`,
        method: POST,
        body: qc_attack,
      }),
      invalidatesTags: (_result, _error, { qc_attackable_id }) => [
        { type: 'qc', id: qc_attackable_id },
      ],
    }),

    updateQCAttackSort: build.mutation<
      QcAttack,
      SortPartial<QcAttack> & Pick<QcAttack, 'qc_attackable_id'>
    >({
      query: ({ id, qc_attackable_id, sorting_position }) => ({
        url: `qcs/${qc_attackable_id}/qc_attacks/${id}`,
        method: PATCH,
        body: { qc_attack: { sorting_position } },
      }),
      invalidatesTags: (_result, _error, { qc_attackable_id }) => [
        { type: 'qc', id: qc_attackable_id },
      ],
    }),

    deleteQCAttack: build.mutation<void, QcAttackPartial>({
      query: ({ id, qc_attackable_id }) => ({
        url: `qcs/${qc_attackable_id}/qc_attacks/${id}`,
        method: DELETE,
      }),
      invalidatesTags: (_result, _error, { qc_attackable_id }) => [
        { type: 'qc', id: qc_attackable_id },
      ],
    }),
  }),
})

export const {
  useCreateQCAttackMutation,
  useUpdateQCAttackMutation,
  useUpdateQCAttackSortMutation,
  useDeleteQCAttackMutation,
} = qcAttackApi
