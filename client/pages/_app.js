import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../src/components/layout'
import { LocaleProvider } from 'antd'
import 'moment/locale/zh-tw'
import zh_TW from 'antd/lib/locale-provider/zh_TW'
import 'antd/dist/antd.less'

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps,
      permissionUrl: ctx.ctx.pathname
    }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <Container>
          <LocaleProvider locale={zh_TW}>
            <Component {...pageProps} />
          </LocaleProvider>
        </Container>
      </Layout>
    )
  }
}

export default MyApp
