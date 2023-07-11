const admin = require("../config/firebase-config");
class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token-", token);
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      console.log("decodeValue", decodeValue);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      return res.json({ message: "Unauthorized" });
    } catch (error) {
      return res.json({ message: "Internal Error" });
    }
  }
}

module.exports = new Middleware();
