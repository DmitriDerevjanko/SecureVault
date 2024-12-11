<template>
  <div class="header">
    <section class="header-background">
      <img src="@/assets/ImageHeader.png" alt="Header Image" />
    </section>
  </div>
  <div class="container">
    <h1>
      Unlock the Ultimate <span class="highlight">Password Experience</span>
    </h1>
    <div class="buttons">
      <button @click="toggleModal" class="btn get-started">Get Started</button>
      <router-link to="/learn-more" class="btn learn-more"
        >Learn More</router-link
      >
    </div>
    <h2>Cloud-Based Security</h2>
    <p>
      No more worries about losing your passwords. We securely store them in our
      cloud infrastructure, providing you hassle-free access.
    </p>
    <div class="features">
      <div class="feature">
        <h3>256</h3>
        <p>Bit Encryption</p>
      </div>
      <div class="feature">
        <h3>24</h3>
        <p>Hour Support</p>
      </div>
      <div class="feature">
        <h3>99.9</h3>
        <p>Uptime</p>
      </div>
    </div>
  </div>
  <div class="commentsMidle">
    <section class="comments">
      <img src="@/assets/ImageComments.png" alt="Midle Image" />
    </section>
  </div>

  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <div class="slider" @click="toggleSignUp">
        <div class="slider-button" :class="{ active: isSignUpActive }">
          Sign Up
        </div>
        <div class="slider-button" :class="{ active: !isSignUpActive }">
          Login
        </div>
      </div>
      <div class="forms-container">
        <login-form v-if="!isSignUpActive" key="login-form" />
        <signup-form v-if="isSignUpActive" key="signup-form" />
      </div>
      <button class="close-modal red-button" @click="toggleModal">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginForm from './Login.vue';
import SignupForm from './SignUp.vue';

export default defineComponent({
  components: {
    LoginForm,
    SignupForm,
  },
  setup() {
    const showModal = ref(false);
    const isSignUpActive = ref(false);

    function toggleModal() {
      showModal.value = !showModal.value;
    }

    function toggleSignUp() {
      isSignUpActive.value = !isSignUpActive.value;
    }

    return {
      showModal,
      toggleModal,
      isSignUpActive,
      toggleSignUp,
    };
  },
});
</script>

<style scoped>
.signUpButton {
  background-color: #4caf50;
  color: white;
}

.loginButton {
  background-color: #2196f3;
  color: white;
}

.red-button {
  background-color: #f7484b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
  font-size: 16px;
}

.red-button:hover {
  background-color: white;
  color: #fe3538;
}
.header-background {
  background-size: cover;
  height: 80vh;
  position: relative;
  background-color: white;
  z-index: 1;
}

.header-buttons {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  margin: 10px;
}

.sign-up,
.log-in {
  width: 110px;
  height: 40px;
  background-color: #edfee2;
  color: black;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  border: 1px solid black;
  font-family: 'San Francisco', sans-serif;
}

.sign-up:hover,
.log-in:hover {
  background-color: white;
}

body {
  font-family: 'Arial';
  text-align: center;
  padding: 0;
  background-color: white;
  color: black;
  margin: 0;
}

.container {
  margin-top: 10vh;
  position: relative;
  z-index: 2;
  background-color: white;
  width: 100%;
  min-height: 55vh;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  font-weight: bold;
  margin-left: 110px;
  font-family: 'San Francisco', sans-serif;
}

.highlight {
  color: #fe3538;
}

.buttons {
  margin-bottom: 40px;
  margin-left: 110px;
}

.btn {
  background-color: #81acb8;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-transform: uppercase;
  width: 160px;
  height: 60px;
}

.get-started {
  background-color: black;
  border-radius: 5px;
  border: 2px solid black;
  padding: 18px 28px;
  font-family: 'San Francisco', sans-serif;
}

.learn-more {
  background-color: #fe3538;
  color: white;
  border: 2px solid #fe3538;
  border-radius: 5px;
  padding: 15px 25px;
  font-family: 'San Francisco', sans-serif;
}

.get-started:hover {
  background-color: white;
  color: black;
  border: 2px solid black;
}

.learn-more:hover {
  background-color: white;
  color: #fe3538;
  border: 2px solid #fe3538;
}

h2 {
  font-size: 2em;
  margin-bottom: 20px;
  font-weight: bold;
  margin-left: 110px;
  font-family: 'San Francisco', sans-serif;
}

p {
  font-size: 1em;
  margin-bottom: 40px;
  margin-left: 110px;
  font-family: 'San Francisco', sans-serif;
}

.features {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  background-color: white;
  margin-left: 110px;
  font-family: 'SF-Pro-Display-Light.otf', sans-serif;
}

.feature {
  text-align: center;
}

.feature h3 {
  font-size: 3em;
  margin-bottom: 5px;
}

.feature p {
  color: #777;
  margin: 0;
}

.modal {
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

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 90%;
  max-width: 600px;
}

.slider {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.slider-button {
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-weight: bold;
  font-size: 16px;
}

.slider-button.active {
  background-color: cornflowerblue;
  color: white;
}
@font-face {
  font-family: 'San Francisco';
  src: url('/fonts/SF-Pro-Rounded-Light.otf') format('opentype');
}
</style>
