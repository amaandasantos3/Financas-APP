import api from './api';

export function signIn(email) {
  console.log(email);

  return api.get(`start/${email}`);
}
