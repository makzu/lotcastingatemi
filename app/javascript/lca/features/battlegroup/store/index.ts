import { DELETE, LISTid, PATCH, POST, emptySplitApi } from '@/features/api'
import type { WithId } from '@/types/_lib'
import type { Battlegroup } from '@/types/battlegroup'

const BATTLEGROUP = 'BATTLEGROUP' as const
const api_base = 'battlegroups'

type APIPartial<T extends WithId> = Pick<T, 'id'> & Partial<T>

export const battlegroupApi = emptySplitApi
  .enhanceEndpoints({ addTagTypes: [BATTLEGROUP] })
  .injectEndpoints({
    endpoints: (build) => ({
      getBattlegroup: build.query<Battlegroup, Battlegroup['id']>({
        query: (id) => ({ url: `${api_base}/${id}` }),
        providesTags: (_result, _error, id) => [{ type: BATTLEGROUP, id }],
      }),

      createBattlegroup: build.mutation<Battlegroup, Partial<Battlegroup>>({
        query: (battlegroup) => ({
          url: api_base,
          method: POST,
          body: battlegroup,
        }),
        invalidatesTags: [{ type: BATTLEGROUP, id: LISTid }],
      }),

      duplicateBattlegroup: build.mutation<Battlegroup, Battlegroup['id']>({
        query: (id) => ({ url: `${api_base}/${id}/duplicate`, method: POST }),
        invalidatesTags: [{ type: BATTLEGROUP, id: LISTid }],
      }),

      updateBattlegroup: build.mutation<void, APIPartial<Battlegroup>>({
        query: ({ id, ...patch }) => ({
          url: `${api_base}/${id}`,
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
        query: (id) => ({ url: `${api_base}/${id}`, method: DELETE }),
        invalidatesTags: (_result, _error, id) => [
          { type: BATTLEGROUP, id },
          { type: BATTLEGROUP, id: LISTid },
        ],
      }),

      // TODO make this a separate reducer that hits an endpoint and only gets IDs of things to fetch later
      listBattlegroups: build.query<Battlegroup[], number>({
        query: (page = 1) => ({ url: `${api_base}?page=${page}` }),
        providesTags: (result, _error, _page) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: BATTLEGROUP, id })),
                { type: BATTLEGROUP, id: LISTid },
              ]
            : [{ type: BATTLEGROUP, id: LISTid }],
      }),
    }),
    overrideExisting: false,
  })

export const {
  useGetBattlegroupQuery,
  useUpdateBattlegroupMutation,
  useListBattlegroupsQuery,
} = battlegroupApi
