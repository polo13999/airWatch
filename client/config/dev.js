export default {
  serverURL() {
    return !process.browser ? 'http://localhost:8080' : 'http://localhost:8080'
  }
}
