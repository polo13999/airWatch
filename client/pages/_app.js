import React, { createContext } from 'react'
import App, { Container } from 'next/app'
import Layout from '../src/containers/layout'
import LoginBlock from '../src/containers/login'
import { LocaleProvider } from 'antd'
import withApolloClient from '../src/lib/withApolloClient'
import { ApolloProvider } from 'react-apollo'
import checkLoggedIn from '../src/lib/checkLoggedIn'
import 'moment/locale/zh-tw'
import zh_TW from 'antd/lib/locale-provider/zh_TW'
import 'antd/dist/antd.less'
import { Query } from 'react-apollo'
import { getUser } from '../src/containers/login/grapgql'

export const GlobalCtx = createContext(0)

class MyApp extends App {
  static async getInitialProps(ctx) {
    // console.log('ctx', ctx)
    const { Component } = ctx
    //check login
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps,
      permissionUrl: ctx.ctx.pathname,
      loggedInUser
    }
  }
  render() {
    const { Component, pageProps, apolloClient, loggedInUser } = this.props
    // console.log('apolloggedInUserloClient', loggedInUser)
    // console.log('_app')
    return (
      <ApolloProvider client={apolloClient}>
        <Query query={getUser}>
          {({ data }) => {
            console.log('====>')
            // if (loading) {
            //   return <div>loading</div>
            // }
            // if (error) {
            //   return <div>error</div>
            // }
            console.log('data', data)
            return (
              <GlobalCtx.Provider value={{ data: 'test' }}>
                {loggedInUser === null ? (
                  <LoginBlock />
                ) : (
                  <Layout>
                    <Container>
                      <LocaleProvider locale={zh_TW}>
                        <Component {...pageProps} />
                      </LocaleProvider>
                    </Container>
                  </Layout>
                )}
              </GlobalCtx.Provider>
            )
          }}
        </Query>
      </ApolloProvider>
    )
  }
}

export default withApolloClient(MyApp)
