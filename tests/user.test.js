const test = require("node:test");
const assert = require("node:assert");
const { validateAddToWishlist } = require("../src/validators/user.validator");

test("User Wishlist Validator", () => {
  const invalidPayload = validateAddToWishlist({ body: { id: "123" } });
  assert.strictEqual(typeof invalidPayload, "string");

  const validPayload = validateAddToWishlist({ body: { id: "123", media_type: "movie" } });
  assert.strictEqual(validPayload, null);
});
