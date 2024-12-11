import { RegisterData } from '@/modules/register';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import useApi from '@/modules/api';

export const useRegisterStore = defineStore('registerStore', () => {
  const registers = ref<RegisterData[]>([]);

  const addRegister = async (register: RegisterData) => {
    const { response, error, request } = useApi<RegisterData>(
      'Authenticate/register-user',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(register),
      },
    );

    await request();

    if (response.value) {
      registers.value.push(response.value);
      return { success: true, message: 'Registration successful!' };
    } else {
      return {
        success: false,
        message: error.value || 'Registration failed. Please try again.',
      };
    }
  };

  return { registers, addRegister };
});
