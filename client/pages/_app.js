import React from "react";
import App, { Container } from "next/app";
//import { ApolloProvider } from 'react-apollo'
//import Layout from '../src/components/layout'
//import withApollo from '../src/lib/withApollo'
import { LocaleProvider } from "antd";
import "moment/locale/zh-tw";
import zh_TW from "antd/lib/locale-provider/zh_TW";
import "antd/dist/antd.less";

export const PagePermissionContext = React.createContext({
  pagePermission: {}
});
export const GlobalVariable = React.createContext({});

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    //  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      //  loggedInUser: loggedInUser.user,
      pageProps,
      permissionUrl: ctx.ctx.pathname
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      menuOpenStatus: true
    };
    this.globalPageState = {};
  }

  render() {
    const {
      Component,
      pageProps,
      // apolloClient,
      // loggedInUser,
      permissionUrl
    } = this.props;
    const setGlobalPageState = data => {
      this.globalPageState[permissionUrl] = data;
    };
    return (
      <GlobalVariable.Provider
        value={{
          menuOpenStatus: this.state.menuOpenStatus,
          toggleMenuOpen: () =>
            this.setState({ menuOpenStatus: !this.state.menuOpenStatus }),
          globalPageState: this.globalPageState[permissionUrl],
          setGlobalPageState: setGlobalPageState
        }}
      >
        <Container>
          <LocaleProvider locale={zh_TW}>
            <Component
              // pagePermission={pagePermission}
              // loginInfo={loginInfo}
              {...pageProps}
            />
          </LocaleProvider>
        </Container>
      </GlobalVariable.Provider>
    );
  }
}

export default MyApp;
