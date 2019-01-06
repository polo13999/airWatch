const jwt = require("jsonwebtoken");

const config = require("../config");

function getUserId(ctx, throwError = true) {
  const userToken = ctx.req.session.userToken;

  if (userToken) {
    try {
      const { _id } = jwt.verify(userToken, config.secret);
      return _id;
    } catch (err) {
      console.log("err", err);
      console.log("throwError", throwError);
      return {};
      //if (throwError) throw new Error('Not authenticated')
    }
  }
  return {};
}

module.exports = {
  getUserId
};
