export default {
  serverURL() {
    return !process.browser ? "http://server:8080" : "http://nextto.tw:8080";
  }
};
