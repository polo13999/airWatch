import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../src/components/layout'
import { LocaleProvider } from 'antd'
import withApolloClient from '../src/lib/withApolloClient'
import { ApolloProvider } from 'react-apollo'
import checkLoggedIn from '../src/lib/checkLoggedIn'

import 'moment/locale/zh-tw'
import zh_TW from 'antd/lib/locale-provider/zh_TW'
import 'antd/dist/antd.less'

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
    const { Component, pageProps, apolloClient } = this.props
    // console.log('apolloClient', apolloClient)
    return (
      <Layout>
        <Container>
          <ApolloProvider client={apolloClient}>
            <LocaleProvider locale={zh_TW}>
              <Component {...pageProps} />
            </LocaleProvider>
          </ApolloProvider>
        </Container>
      </Layout>
    )
  }
}

export default withApolloClient(MyApp)
