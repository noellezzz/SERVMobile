/* eslint-disable no-unused-vars */
// Hooks Naming Convention:
// mutation: use{Resource}Mutation
// query: use{Resource}Query
// subscription: use{Resource}Subscription
//
//
// ex: useLoginMutation, useLoginQuery, useLoginSubscription
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// IP Address of the backend server 
const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.72.139:5000';
const baseQuery = fetchBaseQuery({ baseUrl: API_URL + '/api/v1/' });

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['User'],

    endpoints: (builder) => ({}),
});
