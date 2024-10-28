import { type APIPartial, emptySplitApi, providesList } from '@/features/api'
import type { Character } from '../types'

export const characterApi = emptySplitApi
  .enhanceEndpoints({ addTagTypes: ['character'] })
  .injectEndpoints({
    endpoints: (build) => ({
      getCharacter: build.query<Character, Character['id']>({
        query: (id) => ({ url: `characters/${id}` }),
        providesTags: (_result, _error, id) => [{ type: 'character', id }],
      }),

      createCharacter: build.mutation<Character, Partial<Character>>({
        query: (character) => ({
          url: 'characters',
          method: 'POST',
          body: character,
        }),
        invalidatesTags: [{ type: 'character', id: 'LIST' }],
      }),

      duplicateCharacter: build.mutation<Character, Character['id']>({
        query: (id) => ({ url: `characters/${id}/duplicate`, method: 'POST' }),
        invalidatesTags: [{ type: 'character', id: 'LIST' }],
      }),

      updateCharacter: build.mutation<void, APIPartial<Character>>({
        query: (character) => ({
          url: `characters/${character.id}`,
          method: 'PATCH',
          body: character,
        }),
        onQueryStarted(character, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            characterApi.util.updateQueryData(
              'getCharacter',
              character.id,
              (draft) => {
                Object.assign(draft, character)
              },
            ),
          )

          queryFulfilled.catch(patchResult.undo)
        },
      }),

      updateCharacterSort: build.mutation<
        Character,
        { id: number; sorting_position: number }
      >({
        query: ({ id, sorting_position }) => ({
          url: `characters/${id}`,
          method: 'PATCH',
          body: { character: { sorting_position } },
        }),
        invalidatesTags: (_result, _error, { id }) => [
          { type: 'character', id: 'LIST' },
          { type: 'character', id },
        ],
      }),

      deleteCharacter: build.mutation<void, Character['id']>({
        query: (id) => ({ url: `characters/${id}`, method: 'DELETE' }),
        invalidatesTags: (_result, _error, id) => [{ type: 'character', id }],
      }),

      listCharacters: build.query<Character[], number>({
        query: (page = 1) => `characters?page=${page}`,
        providesTags: (result) => providesList(result, 'character'),
      }),
    }),
  })

export const {
  useCreateCharacterMutation,
  useDeleteCharacterMutation,
  useDuplicateCharacterMutation,
  useGetCharacterQuery,
  useListCharactersQuery,
  useUpdateCharacterMutation,
  useUpdateCharacterSortMutation,
} = characterApi
