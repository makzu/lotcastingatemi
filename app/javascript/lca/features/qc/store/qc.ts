import {
  DELETE,
  PATCH,
  POST,
  emptySplitApi,
  listTag,
  providesList,
  type APIPartial,
  type SortPartial,
} from '@/features/api'
import type { QC as iQC } from '../types'

const qcListTag = listTag('qc')

export const qcApi = emptySplitApi
  .enhanceEndpoints({ addTagTypes: ['qc'] })
  .injectEndpoints({
    endpoints: (build) => ({
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
        onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            qcApi.util.updateQueryData('getQc', id, (draft) => {
              Object.assign(draft, patch)
            }),
          )

          queryFulfilled.catch(patchResult.undo)
        },
      }),

      updateQcSort: build.mutation<iQC, SortPartial<iQC>>({
        query: ({ id, sorting_position }) => ({
          url: `qcs/${id}`,
          method: PATCH,
          body: { qc: { sorting_position } },
        }),
        invalidatesTags: (_result, _error, { id }) => [
          qcListTag,
          { type: 'qc', id },
        ],
      }),

      deleteQc: build.mutation<void, iQC['id']>({
        query: (id) => ({ url: `qcs/${id}`, method: DELETE }),
        invalidatesTags: (_result, _error, id) => [{ type: 'qc', id }],
      }),

      listQcs: build.query<iQC[], number>({
        query: (page = 1) => `qcs?page=${page}`,
        providesTags: (result) => providesList(result, 'qc'),
      }),
    }),
    overrideExisting: false,
  })

export const {
  useCreateQcMutation,
  useDeleteQcMutation,
  useDuplicateQcMutation,
  useGetQcQuery,
  useListQcsQuery,
  useUpdateQcMutation,
  useUpdateQcSortMutation,
} = qcApi
