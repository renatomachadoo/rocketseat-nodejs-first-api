module.exports = {
  jwt : {
    secret : process.env.AUTH_TOKEN || "default",
    expiresIn : "1d",
  }
}