import validator from 'validator';

// check if string has any spaces
function hasSpace(strings) {
  for (let i = 0, l = strings.length; i < l; i++) {
    if (validator.matches(strings[i], ' ')) {
      return true;
    }
  }
  return false;
}

function validLength(username, password) {
  if (!validator.isLength(username, {min: 5, max: 50})) {
    return 'Username must be within 5-50 characters.'
  }
  if (!validator.isLength(password, {min: 6, max: 50})) {
    return 'Password must be within 6-50 characters.'
  }
}

// expected output is an error string

function checkLogin(username, password) {
  if (hasSpace([username, password])) {
    return `Input does not accept spaces`;
  }
  var checkLength = validLength(username, password);
  if (checkLength) {
    return checkLength;
  }
}

function checkRegister(username, password, confirm) {
  if (hasSpace([username, password, confirm])) {
    return `Input does not accept spaces.`;
  }
  if (password !== confirm) {
    return `Password confirmation does not match.`;
  }
  var checkLength = validLength(username, password);
  if (checkLength) {
    return checkLength;
  }
}


export { checkLogin, checkRegister };
