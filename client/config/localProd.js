export default {
  serverURL() {
    return !process.browser ? "http://server:8080" : "http://localhost:8080";
  }
};
