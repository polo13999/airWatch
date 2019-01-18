import gql from 'graphql-tag'

export default apolloClient => {
  console.log('apolloClient', apolloClient)
  return apolloClient
    .query({
      query: gql`
        query getUser {
          user {
            _id
            account
            permission
            userCode
            name
          }
        }
      `
    })
    .then(({ data }) => {
      // console.log('data', data)
      return { loggedInUser: data }
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('checkLoggedIn', err)
      return { loggedInUser: null }
    })
}
