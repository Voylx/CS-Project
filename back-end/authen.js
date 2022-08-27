var jwt = require("jsonwebtoken");
const secert = "secret-password101";

const authen = (token) => {
  try {
    const decode = jwt.verify(token, secert);
    return { status: "ok", decode };
  } catch (error) {
    return { status: "error", message: "Token invalid" };
  }
};

module.exports = authen;
