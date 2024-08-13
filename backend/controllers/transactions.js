// @desc get all transactions
// @route GET /api/transactions
// @access Public

export function getTransactions(req, res, next) {
  res.send("GET transactions");
}
// @desc add transaction
// @route POST /api/transactions
// @access Public

export function addTransactions(req, res, next) {
  res.send("POST transactions");
}
// @desc delete transaction
// @route DELETE /api/transactions
// @access Public

export function deleteTransactions(req, res, next) {
  res.send("DELETE transactions");
}
