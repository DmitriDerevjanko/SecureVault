<template>
  <div class="form-panel two">
    <div class="form-header">
      <h1>Register Account</h1>
    </div>
    <div class="form-content">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="register.email" required />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="register.username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="register.password"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>

  <div class="modal" v-if="showMasterKeyModal">
    <div class="modal-content">
      <h3>Your Master Key</h3>
      <input type="text" :value="displayedMasterKey" readonly />
      <button @click="copyMasterKey">Copy Master Key</button>
      <button @click="downloadMasterKeyAsPDF">Download as PDF</button>
      <button @click="closeMasterKeyModal">Close</button>
    </div>
  </div>

  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed } from 'vue';
import { RegisterData } from '@/modules/register';
import { useRegisterStore } from '@/stores/registerStore';
import { jsPDF } from 'jspdf';

export default defineComponent({
  name: 'SignUpForm',
  setup() {
    const register: Ref<RegisterData> = ref({
      email: '',
      username: '',
      password: '',
    });
    const showModal = ref(false);
    const message = ref('');
    const masterKey = ref('');
    const showMasterKeyModal = ref(false);

    const displayedMasterKey = computed(() => {
      if (masterKey.value.length > 4) {
        return (
          masterKey.value.substring(0, 4) +
          '*'.repeat(masterKey.value.length - 4)
        );
      }
      return masterKey.value;
    });

    const downloadMasterKeyAsPDF = () => {
      const pdf = new jsPDF();
      pdf.text(`Your Master Key: ${masterKey.value}`, 10, 10);
      pdf.save('master-key.pdf');
    };

    const { addRegister } = useRegisterStore();

    const handleSubmit = async () => {
      masterKey.value = generateMasterKey();

      const result = await addRegister(register.value);

      if (result.success) {
        showMasterKeyModal.value = true;
      } else {
        message.value = result.message;
        showModal.value = true;
      }
    };

    const generateMasterKey = (): string => {
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let result = '';
      for (let i = 0; i < 20; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    };

    const copyMasterKey = () => {
      navigator.clipboard.writeText(masterKey.value).then(() => {
        alert('Master Key copied to clipboard!');
      });
    };

    const closeMasterKeyModal = () => {
      showMasterKeyModal.value = false;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      register,
      showModal,
      message,
      closeModal,
      masterKey,
      showMasterKeyModal,
      copyMasterKey,
      closeMasterKeyModal,
      handleSubmit,
      displayedMasterKey,
      downloadMasterKeyAsPDF,
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
