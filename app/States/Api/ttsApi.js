import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000/api/v1/tts/' })

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['TTS'],
  endpoints: builder => ({
    getTextToSpeech: builder.mutation({
      query: ({ text, lang }) => ({
        url: 'tts/',
        method: 'GET',
        params: { text, lang },
        responseHandler: response => response.blob(),
      }),
      transformResponse: response => URL.createObjectURL(response),
    }),
  }),
})

export const { useGetTextToSpeechMutation } = apiSlice
