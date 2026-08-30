function validateAddToWishlist(req) {
  const { id, media_type } = req.body || {};
  if (!id || !media_type) {
    return "Media ID and media_type are required";
  }
  return null;
}

module.exports = {
  validateAddToWishlist
};
