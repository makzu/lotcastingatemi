import {
  type APIPartial,
  DELETE,
  PATCH,
  POST,
  type SortPartial,
} from '@/features/api'
import type { Spell } from '@/types'
import { qcApi } from './qc'

type SpellPartial = APIPartial<Spell> & Pick<Spell, 'sorcerer_id'>

export const bgAttackApi = qcApi.injectEndpoints({
  endpoints: (build) => ({
    updateSpell: build.mutation<void, SpellPartial>({
      query: ({ id, sorcerer_id, ...patch }) => ({
        url: `qcs/${sorcerer_id}/spells/${id}`,
        method: PATCH,
        body: patch,
      }),
      // optimistic update
      async onQueryStarted(
        { id, sorcerer_id, ...patch },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          bgAttackApi.util.updateQueryData('getQc', sorcerer_id, (draft) => {
            const attack = draft.spells.find((a) => a.id === id)
            if (attack) {
              Object.assign(attack, patch)
            }
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (_result, _error, { sorcerer_id }) => [
        { type: 'qc', id: sorcerer_id },
      ],
    }),

    createSpell: build.mutation<Spell, Partial<Spell>>({
      query: (spell) => ({
        url: `qcs/${spell.sorcerer_id}/spells`,
        method: POST,
        body: spell,
      }),
      invalidatesTags: (_result, _error, { sorcerer_id }) => [
        { type: 'qc', id: sorcerer_id },
      ],
    }),

    updateSpellSort: build.mutation<
      Spell,
      SortPartial<Spell> & Pick<Spell, 'sorcerer_id'>
    >({
      query: ({ id, sorcerer_id, sorting_position }) => ({
        url: `qcs/${sorcerer_id}/spells/${id}`,
        method: PATCH,
        body: { spell: { sorting_position } },
      }),
      invalidatesTags: (_result, _error, { sorcerer_id }) => [
        { type: 'qc', id: sorcerer_id },
      ],
    }),

    deleteSpell: build.mutation<void, SpellPartial>({
      query: ({ id, sorcerer_id }) => ({
        url: `qcs/${sorcerer_id}/spells/${id}`,
        method: DELETE,
      }),
      invalidatesTags: (_result, _error, { sorcerer_id }) => [
        { type: 'qc', id: sorcerer_id },
      ],
    }),
  }),
})

export const {
  useCreateSpellMutation,
  useUpdateSpellMutation,
  useUpdateSpellSortMutation,
  useDeleteSpellMutation,
} = bgAttackApi
