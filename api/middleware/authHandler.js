/* Dependency used to read .env files, in NODE v20.6.0 it is integrated, but we are using v18.17.1LTS and it is not */
require("dotenv").config()

/* JSONWebToken
 * Self-contained way for securely transmitting information between parties as a JSON object*/
const jwt = require("jsonwebtoken") // import
const jwtSecret = process.env.JWT_SECRET;
// jwt.verify return a promise
const verifyTokenAsync = util.promisify(jwt.verify);

// async function verifyToken(token) {
//     return new Promise((resolve, reject) => {
//       jwt.verify(token, // token: string,
//         jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
//         {}, // options?: VerifyOptions & { complete?: false },
//         (err, userData) => {
//         if (err) {
//           reject(err); // If there's an error we send it
//         } else {
//           resolve(userData);
//         }
//       });
//     });
//   }

async function verifyToken(token) {
  try {
    const userData = await verifyTokenAsync(token, jwtSecret);
    return userData;
  } catch (err) {
    reject(err); // If there's an error we send it
  }
}

module.exports = { verifyToken };