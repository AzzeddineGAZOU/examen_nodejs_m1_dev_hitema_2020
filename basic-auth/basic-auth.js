const crypto = require("crypto");
const HttpStatus = require("http-status-codes");

function sha1Encode(data) {
  return crypto.createHash("sha1").update(data).digest("hex");
}

module.exports.digestAuth = (request, response, next) => {
  const authorization = request.headers.authorization;

  if (!authorization) response.sendStatus(HttpStatus.UNAUTHORIZED);

  const encoded = authorization.replace("Basic", "");
  const token = Buffer.from(encoded, "base64").toString("utf8");
  const authentication = token.split(":");

  const isAuthorizationValid =
    authorization &&
    authentication[0] === "node" &&
    authentication[1] === sha1Encode("password");

  if (isAuthorizationValid) {
    next();
  } else {
    response.sendStatus(HttpStatus.UNAUTHORIZED);
  }
};
