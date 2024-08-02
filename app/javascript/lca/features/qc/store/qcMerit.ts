import {
  type APIPartial,
  DELETE,
  PATCH,
  POST,
  type SortPartial,
} from '@/features/api'
import type { QcMerit } from '../types'
import { qcApi } from './qc'

type QcMeritPartial = APIPartial<QcMerit> & Pick<QcMerit, 'qc_id'>

export const qcMeritApi = qcApi.injectEndpoints({
  endpoints: (build) => ({
    updateQCMerit: build.mutation<void, QcMeritPartial>({
      query: ({ id, qc_id, ...patch }) => ({
        url: `qcs/${qc_id}/qc_merits/${id}`,
        method: PATCH,
        body: patch,
      }),
      // optimistic update
      async onQueryStarted(
        { id, qc_id, ...patch },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          qcMeritApi.util.updateQueryData('getQc', qc_id, (draft) => {
            const merit = draft.qc_merits.find((a) => a.id === id)
            if (merit) {
              Object.assign(merit, patch)
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

    createQCMerit: build.mutation<QcMerit, Partial<QcMerit>>({
      query: (qc_merit) => ({
        url: `qcs/${qc_merit.qc_id}/qc_merits`,
        method: POST,
        body: qc_merit,
      }),
      invalidatesTags: (_result, _error, { qc_id }) => [
        { type: 'qc', id: qc_id },
      ],
    }),

    updateQCMeritSort: build.mutation<
      QcMerit,
      SortPartial<QcMerit> & Pick<QcMerit, 'qc_id'>
    >({
      query: ({ id, qc_id, sorting_position }) => ({
        url: `qcs/${qc_id}/qc_merits/${id}`,
        method: PATCH,
        body: { qc_merit: { sorting_position } },
      }),
      invalidatesTags: (_result, _error, { qc_id }) => [
        { type: 'qc', id: qc_id },
      ],
    }),

    deleteQCMerit: build.mutation<void, QcMeritPartial>({
      query: ({ id, qc_id }) => ({
        url: `qcs/${qc_id}/qc_merits/${id}`,
        method: DELETE,
      }),
      invalidatesTags: (_result, _error, { qc_id }) => [
        { type: 'qc', id: qc_id },
      ],
    }),
  }),
})

export const {
  useCreateQCMeritMutation,
  useUpdateQCMeritMutation,
  useUpdateQCMeritSortMutation,
  useDeleteQCMeritMutation,
} = qcMeritApi
