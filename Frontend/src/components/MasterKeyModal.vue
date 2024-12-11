<template>
  <div v-if="showModal" class="master-key-modal">
    <div class="modal-content">
      <h3>Please Enter Your Master Key</h3>
      <input type="password" v-model="masterKey" placeholder="Master Key" />
      <button @click="submitMasterKey">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useMasterKeyStore } from '@/stores/masterKeyStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const masterKey = ref('');
    const masterKeyStore = useMasterKeyStore();
    const router = useRouter();

    const showModal = ref(!masterKeyStore.isMasterKeySet);

    const submitMasterKey = () => {
      masterKeyStore.setMasterKey(masterKey.value);
      showModal.value = false;
      router.push({ name: 'List' });
    };

    return { masterKey, showModal, submitMasterKey };
  },
};
</script>

<style scoped>
.master-key-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 15px;
  color: #333;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-content button {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
}

.modal-content button:hover {
  background-color: #3068c4;
}
</style>
