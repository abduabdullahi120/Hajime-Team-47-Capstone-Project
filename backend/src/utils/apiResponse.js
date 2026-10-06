export const success = (res, status, message, data = null, meta = undefined) => {
  const body = { success: true, message, data };
  if (meta) body.meta = meta;
  return res.status(status).json(body);
};

export const failure = (res, status, message, data = null) =>
  res.status(status).json({ success: false, message, data });
