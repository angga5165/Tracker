const { validateCredentials } = require('./auth.js');

const cases = [
  // valid cases
  ['user@domain.com', 'password123', true, []],
  ['a@b.co', '12345678', true, []],
  ['test@sub.domain.org', 'A'.repeat(72), true, []],
  // invalid email
  ['nodomain', 'password123', false, ['email']],
  ['@nodomain.com', 'password123', false, ['email']],
  ['user@', 'password123', false, ['email']],
  ['user@nodot', 'password123', false, ['email']],
  // invalid password
  ['user@domain.com', 'short', false, ['password']],
  ['user@domain.com', 'A'.repeat(73), false, ['password']],
  ['user@domain.com', '', false, ['password']],
  ['user@domain.com', 'seven77', false, ['password']],
  // both invalid
  ['bademail', 'short', false, ['email', 'password']],
];

let passed = 0, failed = 0;
cases.forEach(([email, pwd, expectedValid, expectedErrors]) => {
  const result = validateCredentials(email, pwd);
  const ok =
    result.valid === expectedValid &&
    JSON.stringify([...result.errors].sort()) === JSON.stringify([...expectedErrors].sort());
  if (ok) {
    passed++;
  } else {
    failed++;
    console.error('FAIL:', { email, pwd: pwd.length > 20 ? pwd.slice(0, 5) + '...' : pwd, expected: { valid: expectedValid, errors: expectedErrors }, got: result });
  }
});
console.log('Passed:', passed, '/ Failed:', failed);
process.exit(failed > 0 ? 1 : 0);
