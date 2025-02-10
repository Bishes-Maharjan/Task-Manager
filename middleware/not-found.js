const notFound = (req, res) => res.status(400).send("Route doesnt not exist");
const errorHandler = (err, req, res, next) =>
  res.status(404).json({ err: err });
module.exports = { notFound, errorHandler };
