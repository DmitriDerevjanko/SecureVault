import { PersonData } from '@/modules/persondata';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import useApi from '@/modules/api';

export const usePeopleStore = defineStore('peopleStore', () => {
  const apiGetPasswords = useApi<PersonData[]>('password');
  const passwords = ref<PersonData[]>([]);

  const loadExercises = async () => {
    await apiGetPasswords.request();

    if (apiGetPasswords.response.value) {
      return apiGetPasswords.response.value!;
    }

    return [];
  };

  const load = async () => {
    passwords.value = await loadExercises();
    console.log(passwords.value);
  };

  const addPassword = async (password: PersonData) => {
    const apiAddPassword = useApi<PersonData>('password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(password),
    });
    await apiAddPassword.request();
    if (apiAddPassword.response.value) {
      passwords.value.push(apiAddPassword.response.value!);
    }
  };

  const deletePasswordById = async (id: number) => {
    const apiDeletePassword = useApi<void>(`password/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    await apiDeletePassword.request();
    if (!apiDeletePassword.error.value) {
      const index = passwords.value.findIndex((p) => p.id === id);
      if (index > -1) {
        passwords.value.splice(index, 1);
      }
    }
  };
  const updatePassword = async (id: number, password: PersonData) => {
    const apiUpdatePassword = useApi<PersonData>(`password/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(password),
    });
    await apiUpdatePassword.request();
    if (apiUpdatePassword.response.value) {
      const index = passwords.value.findIndex((p) => p.id === id);
      if (index > -1) {
        passwords.value[index] = apiUpdatePassword.response.value!;
      }
    }
  };
  const folders = ref<PersonData[]>([]);

  const foldersLoaded = ref(false);

  const loadFolders = async () => {
    const apiGetFolders = useApi<PersonData[]>('password/folders');
    await apiGetFolders.request();

    if (apiGetFolders.response.value) {
      folders.value = apiGetFolders.response.value;
      foldersLoaded.value = true; // Установка флага загрузки папок
    } else {
      console.error('Received invalid data format from API');
    }
  };
  loadFolders();

  return {
    passwords,
    load,
    addPassword,
    deletePasswordById,
    updatePassword,
    loadFolders,
    folders,
    foldersLoaded,
  };
});
