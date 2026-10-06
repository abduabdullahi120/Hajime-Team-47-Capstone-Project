export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found`, data: null });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.name === 'ValidationError') return res.status(400).json({ success: false, message: 'Validation failed', data: err.errors });
  if (err.code === 11000) return res.status(409).json({ success: false, message: 'A record with that unique value already exists', data: null });
  return res.status(err.status || 500).json({ success: false, message: err.message || 'Something went wrong on the server', data: null });
}
