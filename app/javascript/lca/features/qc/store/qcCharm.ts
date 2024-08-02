import {
  type APIPartial,
  DELETE,
  PATCH,
  POST,
  type SortPartial,
} from '@/features/api'
import type { QcCharm } from '../types'
import { qcApi } from './qc'

type QcCharmPartial = APIPartial<QcCharm> & Pick<QcCharm, 'qc_id'>

export const qcCharmApi = qcApi.injectEndpoints({
  endpoints: (build) => ({
    updateQCCharm: build.mutation<void, QcCharmPartial>({
      query: ({ id, qc_id, ...patch }) => ({
        url: `qcs/${qc_id}/qc_charms/${id}`,
        method: PATCH,
        body: patch,
      }),
      // optimistic update
      async onQueryStarted(
        { id, qc_id, ...patch },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          qcCharmApi.util.updateQueryData('getQc', qc_id, (draft) => {
            const charm = draft.qc_charms.find((a) => a.id === id)
            if (charm) {
              Object.assign(charm, patch)
            }
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (_result, _error, { qc_id }) => [
        { type: 'qc', id: qc_id },
      ],
    }),

    createQCCharm: build.mutation<QcCharm, Partial<QcCharm>>({
      query: (qc_charm) => ({
        url: `qcs/${qc_charm.qc_id}/qc_charms`,
        method: POST,
        body: qc_charm,
      }),
      invalidatesTags: (_result, _error, { qc_id }) => [
        { type: 'qc', id: qc_id },
      ],
    }),

    updateQCCharmSort: build.mutation<
      QcCharm,
      SortPartial<QcCharm> & Pick<QcCharm, 'qc_id'>
    >({
      query: ({ id, qc_id, sorting_position }) => ({
        url: `qcs/${qc_id}/qc_charms/${id}`,
        method: PATCH,
        body: { qc_charm: { sorting_position } },
      }),
      invalidatesTags: (_result, _error, { qc_id }) => [
        { type: 'qc', id: qc_id },
      ],
    }),

    deleteQCCharm: build.mutation<void, QcCharmPartial>({
      query: ({ id, qc_id }) => ({
        url: `qcs/${qc_id}/qc_charms/${id}`,
        method: DELETE,
      }),
      invalidatesTags: (_result, _error, { qc_id }) => [
        { type: 'qc', id: qc_id },
      ],
    }),
  }),
})

export const {
  useCreateQCCharmMutation,
  useUpdateQCCharmMutation,
  useUpdateQCCharmSortMutation,
  useDeleteQCCharmMutation,
} = qcCharmApi
