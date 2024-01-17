import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
        `Bearer ${localStorage.getItem('jwt') || ''}`,
      )
      headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Character'],
})
