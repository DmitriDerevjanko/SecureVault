<template>
  <div class="photo">
    <img src="@/assets/RedW.png" alt="Left" class="side-image left" />
    <img src="@/assets/PregantW.png" alt="Right" class="side-image right" />
    <div v-if="successMessage" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">Added successfully!</div>
        <div class="modal-footer">
          <button
            @click="closeSuccessMessage"
            class="bg-green-500 text-white p-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <div
      class="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-2xl w-full p-6 bg-white rounded-xl shadow-md space-y-8">
        <h1 class="text-center text-2xl font-extrabold text-gray-900 mb-4">
          {{ title }}
        </h1>

        <div class="flex justify-between space-x-4 mb-4">
          <div>
            <label
              for="filterValue"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Filter by:</label
            >

            <div class="relative">
              <div
                class="absolute inset-y-0 left-1/2 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>

              <input
                v-model="filterValue"
                id="filterValue"
                class="block w-1/2 pl-10 pr-2 py-2 rounded-r border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        <button
          @click="toggleAddPassword"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Account
        </button>

        <div v-if="showAddPassword" class="modal-overlay add-password-modal">
          <div class="modal-container">
            <div class="modal-header"></div>
            <add-password @close="toggleAddPassword" />
            <div class="modal-footer">
              <button @click="toggleAddPassword" class="btn-close-modal">
                Close
              </button>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label
            for="folderFilter"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Select Folder:</label
          >
          <select
            v-model="selectedFolder"
            id="folderFilter"
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option disabled value="">Select a folder</option>
            <option value="">All Folders</option>
            <option v-for="folder in folders" :key="folder" :value="folder">
              {{ folder }}
            </option>
          </select>
        </div>

        <DataTable
          v-if="isFolderSelected"
          :value="filteredPasswords"
          class="w-full"
        >
          <Column field="purpose">
            <template #header>
              <a href="#" @click.prevent="handleHeaderClick('purpose')"
                >Purpose</a
              >
            </template>
            <template #body="slotProps">
              <a
                :href="ensureFullUrl(slotProps.data.purpose)"
                target="_blank"
                class="text-blue-500 hover:text-blue-800"
              >
                {{ getSiteName(slotProps.data.purpose) }}
              </a>
            </template>
          </Column>

          <Column field="login">
            <template #header>
              <a
                href="#"
                class="header-description"
                @click.prevent="handleHeaderClick('login')"
                >Login</a
              >
            </template>
            <template #body="slotProps">
              {{ decryptedPasswords[slotProps.index]?.login }}
            </template>
          </Column>

          <Column field="Password">
            <template #header>
              <a href="#" class="header-description">Password</a>
            </template>
            <template #body="slotProps">
              <button
                @click="copyPassword(slotProps.index)"
                :class="{
                  'text-green-500': copyStatus[slotProps.index] === 'Copied!',
                }"
              >
                {{ copyStatus[slotProps.index] }}
              </button>
            </template>
          </Column>

          <Column header="">
            <template #body="slotProps">
              <button
                @click="editPassword(slotProps.index)"
                class="bg-green-500 text-white p-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(slotProps.index)"
                class="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </template>
          </Column>
        </DataTable>
        <div v-else>
          <p>Please select a folder to view passwords.</p>
        </div>

        <div v-if="showConfirmModal" class="modal-overlay">
          <div class="modal-container">
            <h2 class="modal-header">Confirm Delete</h2>
            <div class="modal-footer">
              <button
                @click="deletePasswordConfirmed"
                class="modal-button delete"
              >
                Delete
              </button>
              <button @click="closeConfirmModal" class="modal-button cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div v-if="showEditModal" class="modal-overlay">
          <div class="modal-container">
            <h2 class="modal-header">Edit Data</h2>
            <div class="modal-content">
              <label class="input-container">Login</label>
              <div class="modal-input-group">
                <input
                  :type="showEditLogin ? 'text' : 'password'"
                  v-model="editedPassword.login"
                  placeholder="Login"
                  class="modal-input"
                />
              </div>
              <label class="input-container">Password</label>
              <div class="modal-input-group">
                <input
                  :type="showEditPassword ? 'text' : 'password'"
                  v-model="editedPassword.passwordValue"
                  placeholder="Password"
                  class="modal-input"
                />
                <button
                  @click="showEditPassword = !showEditPassword"
                  class="modal-input-eye"
                >
                  👁️
                </button>
              </div>
              <label class="input-container">Purpose</label>
              <input
                v-model="editedPassword.purpose"
                placeholder="Purpose"
                class="modal-input"
              />
            </div>
            <div class="modal-footer">
              <button
                @click="prepareUpdatePassword"
                class="modal-button update"
              >
                Update
              </button>
              <button @click="closeModal" class="modal-button cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div v-if="showConfirmEditModal" class="modal-overlay">
          <div class="modal-container">
            <h2 class="modal-header">Are you sure you want to make changes?</h2>
            <div class="modal-footer">
              <button
                @click="confirmUpdatePassword"
                class="modal-button confirm"
              >
                Confirm
              </button>
              <button
                @click="closeConfirmEditModal"
                class="modal-button cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePeopleStore } from '@/stores/peopleStore';
import { useMasterKeyStore } from '@/stores/masterKeyStore';
import { decryptData } from '@/crypto/decryption';
import { encryptData } from '@/crypto/encryption';
import AddPassword from './AddPassword.vue';

const title = 'Password List';
const peopleStore = usePeopleStore();
const masterKeyStore = useMasterKeyStore();
const rawPasswords = computed(() => peopleStore.passwords);
const decryptedPasswords = ref<
  {
    login: string;
    passwordValue: string;
    purpose: string;
    id: number;
    userid: string;
    folderName: string;
  }[]
>([]);
const filterValue = ref<string>('');
const showConfirmModal = ref(false);
let deleteIndex = -1;
const copyLoginStatus = ref(rawPasswords.value.map(() => 'Copy login'));

const copyStatus = ref(rawPasswords.value.map(() => 'Copy password'));
const showEditModal = ref(false);
const editedPassword = ref({ login: '', passwordValue: '', purpose: '' });
let editIndex = -1;
const showAddPassword = ref(false);
const showConfirmEditModal = ref(false);
const showEditLogin = ref(true);
const showEditPassword = ref(false);
const route = useRoute();
const router = useRouter();
const selectedFolder = ref(null);
const folders: Ref<string[]> = ref([]);

const successMessage = computed(() => route.query.success === 'true');

defineProps({
  title: String,
});

const isFolderSelected = computed(() => selectedFolder.value !== null);

const loadFolders = () => {
  const folderSet = new Set(rawPasswords.value.map((p) => p.folderName));
  folders.value = Array.from(folderSet);
};

onMounted(async () => {
  await peopleStore.load();
  decryptPasswords();
  loadFolders();
  if (sessionStorage.getItem('successMessageClosed') === 'true') {
    router.replace({ query: { ...route.query, success: undefined } });
    sessionStorage.removeItem('successMessageClosed');
  }
});

watch(rawPasswords, () => {
  decryptPasswords();
  loadFolders();
});

const getSiteName = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url;
  }

  try {
    const hostname = new URL(url).hostname;
    const domainParts = hostname.replace('www.', '').split('.');

    const secondLevelDomains = [
      'co.uk',
      'com.au',
      'com.br',
      'co.jp',
      'co.nz',
      'co.za',
      'com.sg',
      'com.tr',
      'ee',
      'eu',
      'org',
    ];
    const slicedParts = domainParts.slice(0, domainParts.length - 1);
    const secondLevelDomain = slicedParts.slice(-2).join('.');

    if (secondLevelDomains.includes(secondLevelDomain)) {
      return slicedParts.slice(-3).join('.');
    } else if (slicedParts.length > 1) {
      return slicedParts.slice(-2).join('.');
    }

    return domainParts[0];
  } catch (e) {
    console.error('Invalid URL', e);
    return 'Invalid URL';
  }
};

const ensureFullUrl = (url) => {
  // Добавляем протокол https, если он отсутствует
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    url = 'https://' + url;
  }
  return url;
};

const decryptPasswords = async () => {
  try {
    console.log('Starting decryption process...');

    decryptedPasswords.value = await Promise.all(
      rawPasswords.value.map(async (password, index) => {
        console.log(`Decrypting password at index ${index}:`, password);

        try {
          const decryptedLogin = await decryptData(
            password.login,
            masterKeyStore.masterKey,
          );
          console.log(`Decrypted login for index ${index}:`, decryptedLogin);

          const decryptedPassword = await decryptData(
            password.passwordValue,
            masterKeyStore.masterKey,
          );
          console.log(
            `Decrypted password for index ${index}:`,
            decryptedPassword,
          );

          return {
            ...password,
            login: decryptedLogin,
            passwordValue: decryptedPassword,
            purpose: password.purpose,
          };
        } catch (error) {
          console.error(`Error decrypting data at index ${index}:`, error);
          throw error;
        }
      }),
    );

    console.log('Decryption completed:', decryptedPasswords.value);
  } catch (error) {
    console.error('Error during the decryption process:', error);
  }
  copyLoginStatus.value = decryptedPasswords.value.map(() => 'Copy login');
  copyStatus.value = decryptedPasswords.value.map(() => 'Copy password');
};

const isAscending = ref(true);
const sortBy = ref('');

const handleHeaderClick = (field: string) => {
  if (sortBy.value === field) {
    isAscending.value = !isAscending.value;
  } else {
    isAscending.value = true;
    sortBy.value = field;
  }
};

const copyLogin = (index: number) => {
  console.log('copyLogin called with index:', index);
  if (index >= 0 && index < decryptedPasswords.value.length) {
    const decryptedLogin = decryptedPasswords.value[index]?.login;
    console.log('Decrypted login:', decryptedLogin);
  }
};

const copyPassword = (index: number) => {
  console.log('copyPassword called with index:', index);
  if (index >= 0 && index < decryptedPasswords.value.length) {
    const decryptedPassword = decryptedPasswords.value[index]?.passwordValue;
    console.log('Decrypted password:', decryptedPassword);
    if (decryptedPassword) {
      navigator.clipboard
        .writeText(decryptedPassword)
        .then(() => {
          copyStatus.value[index] = 'Copied!';
          setTimeout(() => {
            copyStatus.value[index] = 'Copy password';
          }, 2000);
        })
        .catch((err) => {
          console.error('Error copying to clipboard:', err);
        });
    }
  } else {
    console.error('Invalid index for copyPassword:', index);
  }
};

const editPassword = (index: number) => {
  editIndex = index;
  if (editIndex > -1 && editIndex < decryptedPasswords.value.length) {
    editedPassword.value = { ...decryptedPasswords.value[editIndex] };
    showEditModal.value = true;
  }
};

const confirmDelete = (index: number) => {
  deleteIndex = index;
  showConfirmModal.value = true;
};

const deletePasswordConfirmed = async () => {
  if (deleteIndex > -1 && deleteIndex < rawPasswords.value.length) {
    const passwordId = rawPasswords.value[deleteIndex].id;
    try {
      await peopleStore.deletePasswordById(passwordId);
      closeConfirmModal();
    } catch (error) {
      console.error('Error deleting password:', error);
    }
  }
};

const prepareUpdatePassword = () => {
  showConfirmEditModal.value = true;
};

// This function will be called when the user confirms the update
const confirmUpdatePassword = async () => {
  if (editIndex > -1 && editIndex < rawPasswords.value.length) {
    const encryptedLogin = await encryptData(
      editedPassword.value.login,
      masterKeyStore.masterKey,
    );
    const encryptedPassword = await encryptData(
      editedPassword.value.passwordValue,
      masterKeyStore.masterKey,
    );

    const updatedPassword = {
      ...rawPasswords.value[editIndex],
      login: encryptedLogin,
      passwordValue: encryptedPassword,
      purpose: editedPassword.value.purpose,
    };

    try {
      await peopleStore.updatePassword(updatedPassword.id, updatedPassword);
      rawPasswords.value[editIndex] = updatedPassword;
      alert('Password updated successfully!');
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update the password.');
    }
    closeConfirmEditModal();
  }
};

const closeModal = () => {
  showEditModal.value = false;
};

const closeConfirmModal = () => {
  showConfirmModal.value = false;
};

const closeConfirmEditModal = () => {
  showConfirmEditModal.value = false;
};

const closeSuccessMessage = () => {
  sessionStorage.setItem('successMessageClosed', 'true');
  window.location.reload();
};

const toggleAddPassword = () => {
  showAddPassword.value = !showAddPassword.value;
};

const filteredPasswords = computed(() => {
  const loweredFilterValue = filterValue.value.toLowerCase();
  const filteredByPurpose = rawPasswords.value.filter((password) =>
    password.purpose.toLowerCase().includes(loweredFilterValue),
  );
  const filteredByFolder = filteredByPurpose.filter(
    (password) =>
      selectedFolder.value === '' ||
      password.folderName === selectedFolder.value,
  );
  if (sortBy.value === 'purpose') {
    return filteredByFolder.sort((a, b) => {
      const purposeA = a.purpose.toLowerCase();
      const purposeB = b.purpose.toLowerCase();
      return isAscending.value
        ? purposeA.localeCompare(purposeB)
        : purposeB.localeCompare(purposeA);
    });
  }
  return filteredByFolder;
});
</script>

<style scoped>
DataTable > Column > template#header a:hover {
  text-decoration: underline;
  cursor: pointer;
}

body {
  font-family: 'San Francisco', sans-serif;
  background-color: #f4f4f4;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 15px;
}

th,
td {
  padding: 10px 20px;
}

th {
  background-color: #e9e9e9;
  text-transform: uppercase;
  font-weight: bold;
}

td {
  background-color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

button {
  cursor: pointer;
  padding: 5px 15px;
  border: none;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    transform 0.3s;
}

button:hover {
  transform: scale(1.05);
}

button.bg-green-500 {
  background-color: #34d399;
  color: #ffffff;
}

button.bg-red-500 {
  background-color: #f87171;
  color: #ffffff;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

select,
input {
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin-right: 10px;
}

input[type='search'] {
  flex-grow: 1;
}
select:hover,
input:hover {
  border-color: #a5b4fc;
  transition: border-color 0.3s ease;
}

.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-container {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: auto;
  max-width: 500px;
  margin: 20px;
  border-radius: 10px;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.py-12 {
  padding-top: 7rem;
  padding-bottom: 3rem;
}

.modal-content {
  margin-bottom: 1rem;
}

.modal-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 0.5rem;
}

.modal-button.delete {
  background-color: #e53e3e;
  color: white;
}

.modal-button.cancel {
  background-color: #a0aec0;
  color: white;
}

.modal-button.update {
  background-color: #48bb78;
  color: white;
}

.modal-input {
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
}

.hidden {
  display: none;
}

.max-w-2xl {
  max-width: 55rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-header {
  margin-bottom: 15px;
}

.modal-footer > button {
  margin-top: 10px;
}

.modal-input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-input-eye {
  cursor: pointer;
}

.input-container {
  font-weight: bold;
  text-align: left;
  display: block;
  margin-bottom: 5px;
}

.header-description {
  margin-left: 13px;
}

.min-h-screen {
  min-height: 100vh;
}

.add-password-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.add-password-modal .modal-content {
  background: rgb(245, 244, 244);
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 90%;
  max-width: 400px;
}

.side-image {
  position: absolute;
  max-width: 200px; /* Максимальная ширина изображения */
  height: auto;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.photo {
  position: relative;
}

.side-image.left {
  left: 5%;
}

.side-image.right {
  right: 1%;
}

@font-face {
  font-family: 'San Francisco';
  src: url('/fonts/SF-Pro-Rounded-Light.otf') format('opentype');
}
</style>
