<template>
  <div class="photo">
    <img src="@/assets/W2GreyS.png" alt="Left" class="side-image left" />
    <img src="@/assets/WRedH.png" alt="Right" class="side-image right" />
    <div
      class="min-h-screen flex items-center justify-center bg-gray-300 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-6 p-6 bg-white rounded-2xl shadow-xl">
        <h1 class="text-center text-2xl font-bold text-gray-800 mb-4">
          Password Generator
        </h1>
        <div class="space-y-4">
          <div>
            <label
              for="length"
              class="block text-sm font-medium text-gray-600 mb-1"
              >Password Length:</label
            >
            <input
              type="number"
              id="length"
              v-model.number="passwordLength"
              min="4"
              max="32"
              class="mt-1 p-2 border rounded-md w-full shadow-sm"
            />
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="uppercase"
              v-model="includeUppercase"
              class="rounded shadow-sm"
            />
            <label for="uppercase" class="ml-2 text-sm text-gray-600"
              >Include Uppercase Letters</label
            >
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="specialChars"
              v-model="includeSpecialChars"
              class="rounded shadow-sm"
            />
            <label for="specialChars" class="ml-2 text-sm text-gray-600"
              >Include Special Characters</label
            >
          </div>
          <div v-if="includeSpecialChars">
            <label
              for="chars"
              class="block text-sm font-medium text-gray-600 mb-1"
              >Special Characters:</label
            >
            <input
              type="text"
              id="chars"
              v-model="specialChars"
              class="mt-1 p-2 border rounded-md w-full shadow-sm"
            />
          </div>
          <div class="flex justify-between mt-4">
            <button
              @click="generatePassword"
              class="flex-1 mr-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-shadow"
            >
              Generate Password
            </button>
            <button
              @click="copyPasswordToClipboard"
              v-if="generatedPassword"
              class="flex-1 ml-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-shadow"
            >
              Copy Password
            </button>
          </div>
          <p
            v-if="generatedPassword"
            class="mt-2 p-4 bg-gray-200 w-full text-center rounded-md text-gray-800 font-semibold"
          >
            {{ generatedPassword }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      generatedPassword: '' as string,
      passwordLength: 12,
      includeUppercase: true,
      includeSpecialChars: true,
      specialChars: '!@#$%^&*()_+[]{}|;:,.<>?',
    };
  },
  methods: {
    generatePassword() {
      let charset: string = 'abcdefghijklmnopqrstuvwxyz';
      if (this.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      charset += '0123456789';
      if (this.includeSpecialChars) charset += this.specialChars;

      let password: string = '';
      for (let i: number = 0; i < this.passwordLength; i++) {
        const randomIndex: number = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      this.generatedPassword = password;
    },
    async copyPasswordToClipboard() {
      try {
        await navigator.clipboard.writeText(this.generatedPassword);
      } catch (err) {
        console.error('Failed to copy password: ', err);
      }
    },
  },
};
</script>

<style scoped>
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

.bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
}
</style>
