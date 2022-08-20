/* eslint-disable */
module.exports = (target) => (next) => (step) => {
  step += 1
  return next(step)
}
