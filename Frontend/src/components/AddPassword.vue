<template>
  <div class="form-panel two">
    <div class="form-header">
      <h1>Add Account</h1>
    </div>
    <div class="form-content">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="password.login"
            required
            placeholder="Enter username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password.passwordValue"
            required
            placeholder="Enter password"
          />
        </div>
        <div class="form-group">
          <label for="purpose">URL address</label>
          <input
            type="text"
            id="purpose"
            v-model="password.purpose"
            required
            placeholder="Account URL address"
          />
        </div>
        <div class="form-group">
          <label for="folderName">Folder Name:</label>
          <select
            id="folderName"
            v-model="selectedFolder"
            required
            class="input-field"
          >
            <option value="" disabled>Select a folder or create one</option>
            <option
              v-for="folder in folders"
              :key="folder.toString()"
              :value="folder"
            >
              {{ folder }}
            </option>
            <option value="other">Create folder</option>
          </select>
        </div>
        <div v-if="selectedFolder === 'other'" class="form-group">
          <input
            type="text"
            v-model="password.folderName"
            placeholder="Type new folder name"
            class="input-field"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="submit-button">Add Password</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { PersonData } from '@/modules/persondata';
import { usePeopleStore } from '@/stores/peopleStore';
import { useMasterKeyStore } from '@/stores/masterKeyStore';
import { encryptData } from '@/crypto/encryption';

export default defineComponent({
  setup() {
    const password = ref<PersonData>({
      id: 0,
      login: '',
      passwordValue: '',
      purpose: '',
      userid: '',
      folderName: '',
    });
    const selectedFolder = ref('');
    const store = usePeopleStore();
    const router = useRouter();
    const masterKeyStore = useMasterKeyStore();

    const handleSubmit = async () => {
      if (selectedFolder.value === 'other') {
        password.value.folderName = password.value.folderName;
      } else {
        password.value.folderName = selectedFolder.value;
      }

      try {
        const masterKey = masterKeyStore.masterKey;

        const encryptedLogin = await encryptData(
          password.value.login,
          masterKey,
        );
        const encryptedPasswordValue = await encryptData(
          password.value.passwordValue,
          masterKey,
        );

        const encryptedPasswordData = {
          id: password.value.id,
          login: encryptedLogin,
          passwordValue: encryptedPasswordValue,
          purpose: password.value.purpose,
          userid: password.value.userid,
          folderName: password.value.folderName,
        };

        await store.addPassword(encryptedPasswordData);

        router.push({ name: 'List', query: { success: 'true' } });
      } catch (error) {
        console.error('Error encrypting data:', error);
      }
    };

    return {
      password,
      handleSubmit,
      folders: store.folders,
      selectedFolder,
    };
  },
});
</script>

<style scoped>
.form-panel.two {
  padding: 60px;
  box-sizing: border-box;
  background: #ffffff;
  color: rgba(0, 0, 0, 0.6);
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-content > button {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 15px;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.modal-content > button:hover {
  background-color: #3068c4;
}

.modal-content > p {
  margin-top: 15px;
  color: #333;
  font-size: 14px;
}
.form-header h1 {
  padding: 4px 0;
  color: #4285f4;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
}

.form-content form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.form-group input {
  outline: none;
  display: block;
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  border: 0;
  border-radius: 4px;
  padding: 12px 20px;
  color: #4285f4;
  font-weight: 500;
  transition: 0.3s ease;
}

.form-group input:focus {
  color: #4285f4;
}

button {
  outline: none;
  background: #4285f4;
  width: 100%;
  border: 0;
  border-radius: 4px;
  padding: 12px 20px;
  color: #ffffff;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
