const test = require("node:test");
const assert = require("node:assert");
const { hashPassword, comparePassword } = require("../src/utils/password");
const { validateSignUp, validateLogin } = require("../src/validators/auth.validator");

test("Password Hashing & Verification", async () => {
  const plainPassword = "MySecretPassword123";
  const hashed = await hashPassword(plainPassword);
  
  assert.strictEqual(typeof hashed, "string");
  assert.notStrictEqual(hashed, plainPassword);
  
  const isValid = await comparePassword(plainPassword, hashed);
  assert.strictEqual(isValid, true);
  
  const isInvalid = await comparePassword("WrongPassword", hashed);
  assert.strictEqual(isInvalid, false);
});

test("Auth Validators", () => {
  const invalidSignUp = validateSignUp({ body: { email: "test@example.com" } });
  assert.strictEqual(typeof invalidSignUp, "string");

  const validSignUp = validateSignUp({ body: { name: "John", email: "test@example.com", password: "123" } });
  assert.strictEqual(validSignUp, null);

  const invalidLogin = validateLogin({ body: { email: "" } });
  assert.strictEqual(typeof invalidLogin, "string");
});
