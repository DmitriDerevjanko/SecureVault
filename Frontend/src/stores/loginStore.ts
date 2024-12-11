import { LoginData } from '@/modules/login';
import { defineStore } from 'pinia';
import useApi from '@/modules/api';

export const useLoginStore = defineStore('loginStore', () => {
  const addLogin = async (login: LoginData) => {
    try {
      const apiAddLogin = useApi<{ token: string; expiration: Date }>(
        'Authenticate/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(login),
        },
      );
      await apiAddLogin.request();
      if (apiAddLogin.response.value) {
        const { token } = apiAddLogin.response.value;
        return { success: true, message: 'Login successful!', token: token };
      } else {
        return {
          success: false,
          message: 'Login failed. Please try again.',
        };
      }
    } catch (error) {
      let errorMessage = 'An error occurred during login.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return {
        success: false,
        message: errorMessage,
      };
    }
  };
  return { addLogin };
});
