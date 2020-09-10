import unfetch from "isomorphic-unfetch";

export async function fetch(url, options) {
  const response = await unfetch(url, options);
  if (options.noJSON) {
    return response;
  }
  return response.json();
}

export async function fetchWithToken(url, getToken, options) {
  const token = await getToken();
  const response = await unfetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status >= 400 && response.status < 600) {
    throw new Error(response.error_description);
  }
  return response.json();
}
