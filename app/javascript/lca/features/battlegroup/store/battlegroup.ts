import {
  DELETE,
  LISTid,
  PATCH,
  POST,
  emptySplitApi,
  type APIPartial,
} from '@/features/api'
import type { Battlegroup } from '../types'
import { createEntityAdapter } from '@reduxjs/toolkit'
import { sortOrderSort } from '@/utils'

export const BATTLEGROUP = 'BATTLEGROUP' as const

const bgListTag = { type: BATTLEGROUP, id: LISTid }

const battlegroupAdapter = createEntityAdapter<Battlegroup>({
  sortComparer: sortOrderSort,
})

export const battlegroupApi = emptySplitApi
  .enhanceEndpoints({ addTagTypes: [BATTLEGROUP] })
  .injectEndpoints({
    endpoints: (build) => ({
      getBattlegroup: build.query<Battlegroup, Battlegroup['id']>({
        query: (id) => ({ url: `battlegroups/${id}` }),
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

      updateBattlegroup: build.mutation<void, APIPartial<Battlegroup>>({
        query: ({ id, ...patch }) => ({
          url: `battlegroups/${id}`,
          method: PATCH,
          body: patch,
        }),
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
        // invalidatesTags: (_result, _error, { id }) => [
        //   { type: BATTLEGROUP, id },
        // ],
      }),

      destroyBattlegroup: build.mutation<void, Battlegroup['id']>({
        query: (id) => ({ url: `battlegroups/${id}`, method: DELETE }),
        invalidatesTags: (_result, _error, id) => [
          { type: BATTLEGROUP, id },
          bgListTag,
        ],
      }),

      // TODO make this a separate reducer that hits an endpoint and only gets IDs of things to fetch later
      listBattlegroups: build.query<Battlegroup[], number>({
        query: (page = 1) => ({ url: `battlegroups?page=${page}` }),
        providesTags: (result, _error, _page) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: BATTLEGROUP, id })),
                bgListTag,
              ]
            : [bgListTag],
      }),
    }),
    overrideExisting: false,
  })

export const {
  useGetBattlegroupQuery,
  useUpdateBattlegroupMutation,
  useListBattlegroupsQuery,
} = battlegroupApi
