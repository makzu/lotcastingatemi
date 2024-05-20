import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { type WithId } from '@/types/_lib'

export type APIPartial<T extends WithId> = Pick<T, 'id'> & Partial<T>
export type SortPartial<T extends WithId> = Pick<T, 'id'> & {
  sorting_position: number
}

export const GET = 'GET'
export const PATCH = 'PATCH'
export const POST = 'POST'
export const DELETE = 'DELETE'
export const LISTid = 'LIST'

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
  tagTypes: ['Character'],
})
