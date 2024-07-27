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
// import type { Battlegroup } from '../types'
import { type Battlegroup } from '../types'

export const BATTLEGROUP = 'battlegroup'

const bgListTag = listTag(BATTLEGROUP)

export const battlegroupApi = emptySplitApi
  .enhanceEndpoints({ addTagTypes: [BATTLEGROUP] })
  .injectEndpoints({
    endpoints: (build) => ({
      getBattlegroup: build.query<Battlegroup, Battlegroup['id']>({
        query: (id) => ({ url: `battlegroups/${id}` }),
        // transformResponse: (response) => {
        //   return normalize(response, bgSchema)
        // },
        providesTags: (_result, _error, id) => [{ type: BATTLEGROUP, id }],
      }),

      createBattlegroup: build.mutation<Battlegroup, Partial<Battlegroup>>({
        query: (battlegroup) => ({
          url: 'battlegroups',
          method: POST,
          body: battlegroup,
        }),
        invalidatesTags: [bgListTag],
      }),

      duplicateBattlegroup: build.mutation<Battlegroup, Battlegroup['id']>({
        query: (id) => ({ url: `battlegroups/${id}/duplicate`, method: POST }),
        invalidatesTags: [bgListTag],
      }),

      updateBattlegroup: build.mutation<Battlegroup, APIPartial<Battlegroup>>({
        query: ({ id, ...patch }) => ({
          url: `battlegroups/${id}`,
          method: PATCH,
          body: { battlegroup: patch },
        }),
        // optimistic update
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            battlegroupApi.util.updateQueryData(
              'getBattlegroup',
              id,
              (draft) => {
                Object.assign(draft, patch)
              },
            ),
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: (_result, _error, { id }) => [
          { type: BATTLEGROUP, id },
        ],
      }),

      updateBattlegroupSort: build.mutation<
        Battlegroup,
        SortPartial<Battlegroup>
      >({
        query: ({ id, sorting_position }) => ({
          url: `battlegroups/${id}`,
          method: PATCH,
          body: { battlegroup: { sorting_position } },
        }),
        invalidatesTags: (_result, _error, { id }) => [
          bgListTag,
          { type: BATTLEGROUP, id },
        ],
      }),

      destroyBattlegroup: build.mutation<void, Battlegroup['id']>({
        query: (id) => ({ url: `battlegroups/${id}`, method: DELETE }),
        invalidatesTags: (_result, _error, id) => [{ type: BATTLEGROUP, id }],
      }),

      // TODO make this a separate reducer that hits an endpoint and only gets IDs of things to fetch later
      listBattlegroups: build.query<Battlegroup[], number>({
        query: (page = 1) => ({ url: `battlegroups?page=${page}` }),
        providesTags: (result) => providesList(result, BATTLEGROUP),
      }),
    }),
    overrideExisting: false,
  })

export const {
  useGetBattlegroupQuery,
  useCreateBattlegroupMutation,
  useUpdateBattlegroupMutation,
  useUpdateBattlegroupSortMutation,
  useListBattlegroupsQuery,
} = battlegroupApi
