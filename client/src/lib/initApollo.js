import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { setContext } from 'apollo-link-context'

import fetch from 'isomorphic-unfetch'
import { createUploadLink } from 'apollo-upload-client'
import envs from '../../config/envs'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState, { getToken }) {
  let httpLink = createUploadLink({
    uri: `${envs.serverURL()}/graphql`
    //credentials: 'include'
  })
  const authLink = setContext((operation, inData) => {
    const { headers } = inData
    const token = getToken()
    // console.log('token', token)
    // console.log('operation', operation)
    if (token) {
      return operation[
        {
          headers: {
            ...headers,
            Cookie: token ? token : null
          }
        }
      ]
    }
    return operation
  })
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink), // Additional fetch() options like `credentials` or `headers`
    cache: new InMemoryCache({
      dataIdFromObject: object => object.key || null
    }).restore(initialState || {})
  })
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
