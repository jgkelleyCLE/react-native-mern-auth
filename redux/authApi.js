import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (formData)=> ({
                url: '/api/users',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation({
            query: (formData) => ({
                url: '/api/users/login',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['User']
        }),
        getUser: builder.query({
            query: (id)=> ({
                url: `/api/users/${id}`,
                method: 'GET'
            }),
            providesTags: ['User']
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserQuery } = authApi