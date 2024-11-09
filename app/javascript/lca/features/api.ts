import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { WithId } from '@/types/_lib'

export type APIPartial<T extends WithId> = Pick<T, 'id'> & Partial<T>
export type SortPartial<T extends WithId> = Pick<T, 'id'> & {
  sorting_position: number
}
export type ChSortPartial<T extends WithId> = Pick<T, 'id'> & {
  chronicle_sorting_position: number
}

export const GET = 'GET'
export const PATCH = 'PATCH'
export const POST = 'POST'
export const DELETE = 'DELETE'
export const LISTid = 'LIST'

export const CHARACTER = 'character'
export const QC = 'qc'
export const BATTLEGROUP = 'battlegroup'

export function providesList<R extends WithId[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T,
) {
  return resultsWithIds
    ? [
        listTag(tagType),
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [listTag(tagType)]
}

export function listTag<T extends string>(tagType: T) {
  return { type: tagType, id: LISTid } as const
}

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers) => {
      headers.append(
        'AUTHORIZATION',
        `Bearer ${localStorage.getItem('jwt') ?? ''}`,
      )
      headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')
    },
  }),
  endpoints: () => ({}),
  tagTypes: [CHARACTER, QC, BATTLEGROUP],
})
