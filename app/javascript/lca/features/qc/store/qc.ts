import { APIPartial, DELETE, PATCH, POST, emptySplitApi } from '@/features/api'
import type { QC } from '@/types'

export const qcApi = emptySplitApi
  .enhanceEndpoints({ addTagTypes: ['QC'] })
  .injectEndpoints({
    endpoints: (build) => ({
      getQc: build.query<QC, QC['id']>({
        query: (id) => ({ url: `qcs/${id}` }),
        providesTags: (_result, _error, id) => [{ type: 'QC', id }],
      }),

      createQc: build.mutation<QC, Partial<QC>>({
        query: (qc) => ({
          url: 'qcs',
          method: POST,
          body: qc,
        }),
        invalidatesTags: [{ type: 'QC', id: 'LIST' }],
      }),

      updateQc: build.mutation<void, APIPartial<QC>>({
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

      deleteQc: build.mutation<void, QC['id']>({
        query: (id) => ({ url: `qcs/${id}`, method: DELETE }),
        invalidatesTags: (_result, _error, id) => [{ type: 'QC', id }],
      }),
    }),
    overrideExisting: false,
  })
