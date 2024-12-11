<template>
  <div class="form-panel one">
    <div class="form-header">
      <h1>Account Login</h1>
    </div>
    <div class="form-content">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="login.username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="login.password"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit">Log In</button>
        </div>
      </form>
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
import { defineComponent, Ref, ref } from 'vue';
import { LoginData } from '@/modules/login';
import { useLoginStore } from '@/stores/loginStore';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const login: Ref<LoginData> = ref({
      username: '',
      password: '',
    });
    const showModal = ref(false);
    const message = ref('');

    const { addLogin } = useLoginStore();

    const handleSubmit = async () => {
      const result = await addLogin(login.value);
      message.value = result.message;
      showModal.value = true;

      if (result.success && result.token) {
        localStorage.setItem('userToken', result.token);
        console.log('JWT Token:', result.token);
        login.value.username = '';
        login.value.password = '';
        window.location.reload();
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      login,
      handleSubmit,
      showModal,
      message,
      closeModal,
    };
  },
});
</script>

<style scoped>
.form-panel.one {
  padding: 60px;
  box-sizing: border-box;
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
  color: rgba(0, 0, 0, 0.6);
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
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  transition: 0.3s ease;
}

.form-group input:focus {
  color: rgba(0, 0, 0, 0.8);
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

.form-remember {
  font-size: 12px;
  font-weight: 400;
}

.form-recovery {
  color: #4285f4;
  font-size: 12px;
  text-decoration: none;
}
</style>
