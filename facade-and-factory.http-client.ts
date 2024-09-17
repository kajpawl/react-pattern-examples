import axios from 'axios';

const API_URL = 'http://my.api.url';

// interfaces - client will have no knowledge of underlying implementation
interface RequestData<TRequestBody> {
  path: string;
  method: string;
  body?: TRequestBody;
  options?: RequestInit;
}

interface HttpClient {
  get<TResponse>(url: string, options?: Record<string, unknown>): Promise<TResponse>;
  post<TResponse, TData>(url: string, data: TData): Promise<TResponse>;
  put<TResponse, TData>(url: string, data: TData): Promise<TResponse>;
  patch<TResponse, TData>(url: string, data: TData): Promise<TResponse>;
  delete<TResponse>(url: string): Promise<TResponse>;
}

// facade over axios implementation
const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.response.use((response) => response.data);

export const axiosHttpClient: HttpClient = {
  get: async (url, options) => instance.get(url, options),
  post: async (url, body) => instance.post(url, body),
  put: async (url, body) => instance.put(url, body),
  patch: async (url, body) => instance.patch(url, body),
  delete: async (url) => instance.patch(url),
};

// facade over fetch implementation - lower-level + Factory usage
const validateResponse = async (res: Response) => {
  if (res.ok) return res;
  throw new Error(res.status + ': ' + res.statusText);
};

const parseResponse = async (res: Response) => {
  if (res.status === 204) return '';
  if (res.headers.get('content-type')?.includes('application/json'))
    return await res.json();

  return await res.text();
};

const makeRequest = async <TBody>({ path, method, body, options }: RequestData<TBody>) => {
  const config = {
    method,
    body: JSON.stringify(body),
    ...options,
  };
  return await fetch(path, config)
    .then(validateResponse)
    .then(parseResponse)
    .catch((error) => Promise.reject(error));
};

const httpClientFactory = (baseUrl = '', defaultOptions): HttpClient => {
  const getPath = (path) => `${baseUrl}${path}`;
  const getOptions = (options) => ({
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions?.headers, ...options?.headers },
  });

  return {
    get: (url, options) =>
      makeRequest({ path: getPath(url), method: 'get', options: getOptions(options) }),
    post: (url, body) =>
      makeRequest({ path: getPath(url), method: 'post', body }),
    put: (url, body) =>
      makeRequest({ path: getPath(url), method: 'put', body }),
    patch: (url, body) =>
      makeRequest({ path: getPath(url), method: 'patch', body }),
    delete: (url) => makeRequest({ path: getPath(url), method: 'delete' }),
  };
};

export const fetchHttpClient: HttpClient = httpClientFactory(API_URL, {
  credentials: 'include',
});

// usage
const reportsAxios = axiosHttpClient.get<string[]>('/reports');
const reportsFetch = fetchHttpClient.get<string[]>('/reports');
