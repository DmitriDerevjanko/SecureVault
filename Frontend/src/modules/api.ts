import { ref, Ref } from 'vue';

export type ApiRequest = () => Promise<void>;

export interface UseableApi<T> {
  response: Ref<T | null>;
  error: Ref<string | null>;
  request: ApiRequest;
}

let apiUrl = '';

export function setApiUrl(url: string) {
  apiUrl = url;
}

export default function useApi<T>(
  endpoint: RequestInfo,
  options: RequestInit = {},
): UseableApi<T> {
  const response: Ref<T | null> = ref(null);
  const error: Ref<string | null> = ref(null);

  const request: ApiRequest = async () => {
    try {
      const token = localStorage.getItem('userToken');

      const headersWithAuth = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
      };

      const updatedOptions = { ...options, headers: headersWithAuth };

      console.log(
        `Making a request to ${apiUrl}${endpoint} with options:`,
        updatedOptions,
      );

      const res = await fetch(apiUrl + endpoint, updatedOptions);
      console.log(`Received response from ${apiUrl}${endpoint}:`, res);

      if (!res.ok) {
        console.error(
          `Request to ${apiUrl}${endpoint} failed with status: ${res.status}`,
        );
        throw new Error(`Failed with status: ${res.status}`);
      }

      const data: T = await res.json();
      response.value = data;
    } catch (err) {
      console.error(`Error in request to ${apiUrl}${endpoint}:`, err);
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'An unknown error occurred.';
      }
    }
  };

  return { response, error, request };
}
