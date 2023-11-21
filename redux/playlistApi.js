import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const playlistApi = createApi({
    reducerPath: "playlistApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState()).auth.user.token

        if(token){
            headers.set('authorization', `Bearer ${token}`)
            return headers
        }
    }
    }),
    tagTypes: ['Playlist'],
    endpoints: (builder) => ({
        getUserPlaylists: builder.query({
            query: (id)=> ({
                
                url: `/api/playlists/user/${id}`,
                method: 'GET'
            }),
            providesTags: ['Playlist']
        }),
        getPlaylist: builder.query({
            query: (id)=> ({
                url: `/api/playlists/${id}`,
                method: 'GET'
            }),
            providesTags: ['Playlist']
        }),
        addSong: builder.mutation({
            query: ({playlistId, songId})=> ({
                url: `/api/playlists/${playlistId}/addsong/${songId}`,
                method: 'PUT',
                body: {playlistId, songId}
            }),
            invalidatesTags: ['Playlist']
        }),
        createPlaylist: builder.mutation({
            query: (formData)=> ({
                url: '/api/playlists/create',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Playlist']
        })
    })
})

export const { useGetUserPlaylistsQuery, useGetPlaylistQuery, useAddSongMutation, useCreatePlaylistMutation } = playlistApi