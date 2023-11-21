import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const songApi = createApi({
    reducerPath: "songApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    tagTypes: ['Songs'],
    endpoints: (builder) => ({
        getAllSongs: builder.query({
            query: ()=> ({
                url: '/api/songs',
                method: 'GET'
            }),
            providesTags: ['Songs']
        }),
        getSong: builder.query({
            query: ()=> ({
                url: `/api/songs/${id}`,
                method: 'GET'
            }),
            providesTags: ['Songs']
        }),
        createSong: builder.mutation({
            query: ()=> ({
                url: '/api/songs',
                method: 'POST',
                body: formData
            }),
           invalidatesTags: ['Songs']
        })
    }) 
})

export const { useGetAllSongsQuery, useGetSongQuery, useCreateSongMutation } = songApi