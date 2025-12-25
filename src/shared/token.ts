const TOKEN_NAME = import.meta.env.PUBLIC_APP_TOKEN_NAME;

let _token = '';

export function getToken() {
  if (_token) return _token;
  _token = window.localStorage.getItem(TOKEN_NAME) || '';
  return _token;
}

export function saveToken(token: string) {
  window.localStorage.setItem(TOKEN_NAME, token);
  _token = token;
  return _token;
}

export function removeToken() {
  _token = '';
  window.localStorage.removeItem(TOKEN_NAME);
}
