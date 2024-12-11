<template>
  <div class="photo">
    <img src="@/assets/PregW2.png" alt="Left" class="side-image left" />
    <img src="@/assets/BlueM.png" alt="Right" class="side-image right" />
    <div
      class="min-h-screen flex items-center justify-center bg-gray-300 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-6 p-6 bg-white rounded-2xl shadow-xl">
        <h1 class="text-center text-2xl font-bold text-gray-800 mb-4">
          Check Password Strength
        </h1>
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-600 mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            v-model="password"
            @input="checkStrength"
            class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-sm"
            placeholder="Enter password"
          />
        </div>
        <div
          v-if="strengthMessage"
          :class="strengthClass"
          class="mt-4 p-3 rounded-md text-center font-semibold"
        >
          {{ strengthMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import zxcvbn from 'zxcvbn';

export default {
  setup() {
    const password = ref('');
    const strengthMessage = ref('');
    const strengthClass = ref('');

    const checkStrength = () => {
      const result = zxcvbn(password.value);
      switch (result.score) {
        case 0:
        case 1:
          strengthMessage.value = 'Very Weak Password';
          strengthClass.value = 'bg-red-200 text-red-700';
          break;
        case 2:
          strengthMessage.value = 'Weak Password';
          strengthClass.value = 'bg-orange-200 text-orange-700';
          break;
        case 3:
          strengthMessage.value = 'Good Password';
          strengthClass.value = 'bg-yellow-200 text-yellow-700';
          break;
        case 4:
          strengthMessage.value = 'Excellent Password';
          strengthClass.value = 'bg-green-200 text-green-700';
          break;
        default:
          strengthMessage.value = '';
          strengthClass.value = '';
          break;
      }
    };

    watch(password, checkStrength);

    return {
      password,
      strengthMessage,
      strengthClass,
      checkStrength,
    };
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
