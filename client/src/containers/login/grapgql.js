import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
//import { adopt } from 'react-adopt'
import PropTypes from 'prop-types'

export const login = gql`
  mutation login($account: String!, $password: String!) {
    login(account: $account, password: $password) {
      _id
    }
  }
`
export const userAllQuery = gql`
  query userAllQuery {
    userAllQuery {
      _id
      email
    }
  }
`

export const logout = gql`
  mutation logout {
    logout {
      token
    }
  }
`

export const isUserLoggedIn = gql`
  query isUserLoggedIn {
    isUserLoggedIn
  }
`

export const getFileName = gql`
  query getFileName($mapFile: String) {
    getFileName(mapFile: $mapFile) {
      allFile
      mapFile
    }
  }
`

export const getUser = gql`
  query getUser {
    user {
      _id
      account
      permission
      userCode
      isAdmin
      active
    }
  }
`

export const checkUser = () => <Query query={isUserLoggedIn} />

export const loginAction = ({ render }) => (
  <Mutation mutation={login}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

export const logoutAction = ({ render }) => (
  <Mutation mutation={logout}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

loginAction.propTypes = {
  render: PropTypes.func
}
logoutAction.propTypes = {
  render: PropTypes.func
}

// export const ActionContainer = adopt({
//   getUser: <Query query={getUser} fetchPolicy="network-only" />,
//   loginAction,
//   logoutAction
// })
