<template>
  <HeaderSign />
  <div class="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="loginUser" class="space-y-4">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
        <p class="text-center">Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link></p>
      </form>

      <!-- Alerts -->
      <div v-if="showSuccessAlert" class="mt-4 text-green-700 bg-green-100 border border-green-300 rounded-lg p-2">
        {{ successMessage }}
      </div>
      <div v-if="showErrorAlert" class="mt-4 text-red-700 bg-red-100 border border-red-300 rounded-lg p-2">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../api/auth';
import HeaderSign from '../components/HeaderSign.vue';

const email = ref('');
const password = ref('');
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const router = useRouter();

const loginUser = async () => {
  try {
    showSuccessAlert.value = false;
    showErrorAlert.value = false;

    const response = await login({ email: email.value, password: password.value });
    localStorage.setItem('token', response.token);
    successMessage.value = 'Login successful!';
    showSuccessAlert.value = true;
    setTimeout(() => {
      showSuccessAlert.value = false;
      router.push('/dataform');
    }, 500); 
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Password or email is incorrect';
    showErrorAlert.value = true;
    setTimeout(() => {
      showErrorAlert.value = false;
    }, 3000);
  }
};
</script>


