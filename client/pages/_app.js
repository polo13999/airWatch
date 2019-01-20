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
// import { Query } from 'react-apollo'
// import { getUser } from '../src/containers/login/grapgql'

export const GlobalCtx = createContext(0)

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)
    console.log('getInitialPropsloggedInUser', loggedInUser)
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
  constructor(props) {
    super(props)
    console.log('constructorloggedInUser', props.loggedInUser)
    this.state = { login: null }
  }
  render() {
    const { Component, pageProps, apolloClient, loggedInUser } = this.props
    const setState = data => {
      this.setState({ login: data })
    }
    return (
      <ApolloProvider client={apolloClient}>
        <GlobalCtx.Provider value={{ loginUser: loggedInUser }}>
          {this.state.login == null ? (
            <LoginBlock setState={setState} />
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
      </ApolloProvider>
    )
  }
}

export default withApolloClient(MyApp)
