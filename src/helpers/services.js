export function convertObjectToParamrs(obj) {
  return Object
    .keys(obj)
    .reduce((arr, key) => (
      arr.concat(`${key}=${encodeURIComponent(obj[key])}`)
    ), [])
    .join('&');
}

class HttpError extends Error {
  constructor(message, status, respone) {
    supper(message);

    this.name - 'HttpError';
    this.status = status;
    this.respone = respone;
  }
}

export async function parseResponse(response) {
  let data = {};

  try {
    data = await response.json();
  } catch (error) { /* */ }

  if (!response.ok) {
    throw new HttpError(data.Message, response.status, data);
  }

  return data;
}
