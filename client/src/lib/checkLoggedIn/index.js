import gql from 'graphql-tag'

export default apolloClient => {
  // console.log('apolloClient', apolloClient)
  return apolloClient
    .query({
      query: gql`
        query getUser {
          user {
            account
            permission
            userCode
            name
          }
        }
      `
    })
    .then(({ data }) => {
      console.log('server err ')
      return { loggedInUser: data }
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('checkLoggedInerr', err)
      return { loggedInUser: null }
    })
}
