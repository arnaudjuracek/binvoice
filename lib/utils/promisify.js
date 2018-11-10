module.exports = callable => (...args) => new Promise((resolve, reject) =>
  callable(...args, (err, res) => err ? reject(err) : resolve(res))
)
