const request = async <T>(
  path: string,
  method: string,
  data?: unknown
): Promise<T> => {
  const options: RequestInit = {
    method,
  };

  if (data) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}${path}`,
    options
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const get = async <T>(path: string): Promise<T> => {
  return request<T>(path, "GET");
};

const post = async <T>(path: string, data?: unknown): Promise<T> => {
  return request<T>(path, "POST", data);
};

const put = async <T>(path: string, data?: unknown): Promise<T> => {
  return request<T>(path, "PUT", data);
};

const del = async <T>(path: string): Promise<T> => {
  return request<T>(path, "DELETE");
};

export { get, post, put, del };
