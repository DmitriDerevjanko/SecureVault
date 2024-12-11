<template>
  <div class="flex h-screen white">
    <div
      v-if="isAuthenticated"
      class="fixed top-0 left-0 right-0"
      style="z-index: 10"
    >
      <nav class="flex justify-around items-center p-4 bg-transparent">
        <router-link to="/" class="logo">
          <img
            class="h-8 w-auto"
            src="https://downloadr2.apkmirror.com/wp-content/uploads/2023/09/03/650c04329e8c4_com.motorola.securevault.png"
            alt="Your Company Logo"
          />
        </router-link>
        <router-link to="/createpassword" class="nav-button"
          >Create password</router-link
        >
        <div class="nav-button" @click="handleListClick">List</div>
        <router-link to="/checkpassword" class="nav-button"
          >Check password</router-link
        >
        <button @click="logout" class="logout-button">Logout</button>
      </nav>
    </div>

    <main class="flex-1 overflow-x-hidden overflow-y-auto main-content">
      <router-view />
    </main>

    <MasterKeyModal
      v-if="showMasterKeyModal"
      @close="showMasterKeyModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMasterKeyStore } from '@/stores/masterKeyStore';
import MasterKeyModal from '@/components/MasterKeyModal.vue';

const router = useRouter();
const isAuthenticated = computed(() => !!localStorage.getItem('userToken'));
const masterKeyStore = useMasterKeyStore();
const showMasterKeyModal = ref(false);

const logout = async () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('masterKey');
  masterKeyStore.clearMasterKey();
  await router.push({ name: 'Home Page' });
  location.reload();
};

const handleListClick = () => {
  if (!masterKeyStore.isMasterKeySet) {
    showMasterKeyModal.value = true;
  } else {
    router.push({ name: 'List' });
  }
};
</script>

<style scoped>
.nav-button {
  cursor: pointer;
}
.main-content {
  background-color: white;
}

.fixed.top-0.left-0.right-0 {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 10;
}

.logo img {
  height: 50px;
}

.nav-button {
  background-color: transparent;
  color: black;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  border: 2px solid black;
  margin: 0 10px;
  transition: all 0.3s;
  text-transform: uppercase;
  font-family: 'San Francisco', sans-serif;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  border: 2px solid transparent;
}

.logout-button {
  background-color: #f7484b;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
  font-size: 0.875em;
  font-family: 'San Francisco', sans-serif;
}

.logout-button:hover {
  background-color: white;
  color: #f7484b;
  border: 2px solid #f7484b;
}
</style>
