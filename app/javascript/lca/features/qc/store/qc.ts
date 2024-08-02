import {
  type APIPartial,
  DELETE,
  PATCH,
  POST,
  listTag,
  providesList,
  emptySplitApi,
} from '@/features/api'
import type { QC as iQC } from '../types'

const qcListTag = listTag('qc')

export const qcApi = emptySplitApi
  .enhanceEndpoints({ addTagTypes: ['qc'] })
  .injectEndpoints({
    endpoints: (build) => ({
      getQcs: build.query<iQC[], void>({
        query: () => 'qcs',
        providesTags: (result) => providesList(result, 'qc'),
      }),

      getQc: build.query<iQC, iQC['id']>({
        query: (id) => ({ url: `qcs/${id}` }),
        providesTags: (_result, _error, id) => [{ type: 'qc', id }],
      }),

      createQc: build.mutation<iQC, Partial<iQC>>({
        query: (qc) => ({
          url: 'qcs',
          method: POST,
          body: qc,
        }),
        invalidatesTags: [qcListTag],
      }),

      duplicateQc: build.mutation<iQC, iQC['id']>({
        query: (id) => ({ url: `qcs/${id}/duplicate`, method: POST }),
        invalidatesTags: [qcListTag],
      }),

      updateQc: build.mutation<void, APIPartial<iQC>>({
        query: ({ id, ...patch }) => ({
          url: `qcs/${id}`,
          method: PATCH,
          body: patch,
        }),
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            qcApi.util.updateQueryData('getQc', id, (draft) => {
              Object.assign(draft, patch)
            }),
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
      }),

      deleteQc: build.mutation<void, iQC['id']>({
        query: (id) => ({ url: `qcs/${id}`, method: DELETE }),
        invalidatesTags: (_result, _error, id) => [{ type: 'qc', id }],
      }),
    }),
    overrideExisting: false,
  })

export const {
  useGetQcsQuery,
  useGetQcQuery,
  useCreateQcMutation,
  useDuplicateQcMutation,
  useUpdateQcMutation,
  useDeleteQcMutation,
} = qcApi
