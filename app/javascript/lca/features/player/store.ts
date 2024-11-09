import { type APIPartial, DELETE, PATCH, emptySplitApi } from '@/features/api'
import type { Player } from '@/types'

const PLAYER = 'PLAYER'

export const playerApi = emptySplitApi
  .enhanceEndpoints({ addTagTypes: [PLAYER] })
  .injectEndpoints({
    endpoints: (build) => ({
      getCurrentPlayer: build.query<Player, void>({
        query: () => ({ url: 'players' }),
      }),

      updatePlayer: build.mutation<Player, APIPartial<Player>>({
        query: ({ id, ...patch }) => ({
          url: `players/${id}`,
          method: PATCH,
          body: { player: patch },
        }),
      }),

      destroyPlayer: build.mutation<void, number>({
        query: () => ({ url: 'players', method: DELETE }),
      }),
    }),
  })

export const {
  useGetCurrentPlayerQuery,
  useUpdatePlayerMutation,
  useDestroyPlayerMutation,
} = playerApi
