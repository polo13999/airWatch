import React from 'react'
import initApollo from './initApollo'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'

const getCookie = req => (req ? req.headers.cookie || '' : document.cookie)

export default App => {
  return class Apollo extends React.Component {
    //static displayName = 'withApollo(App)'
    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { req }
      } = ctx

      const apollo = initApollo({}, { getToken: () => getCookie(req) })
      ctx.apolloClient = apollo

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState
      }
    }

    constructor(props) {
      super(props)
      /* eslint-disable */
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => getCookie()
      })
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
