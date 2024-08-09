<template>
  <HeaderSign />
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            v-model="name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
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
            autocomplete="new-password"
            minlength="6"
            maxlength="20"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 mb-6 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
        <p>Already have an account? <router-link to="/login" class="text-blue-500 my-10">Login</router-link></p>
      </form>

      <!-- uyari ekrani -->
      <div class="fixed top-6 right-6 space-y-4">
        <DelAlert v-if="showSuccessAlert" :message="successMessage" type="success" />
        <DelAlert v-if="showErrorAlert" :message="errorMessage" type="error" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../api/auth';
import HeaderSign from '../components/HeaderSign.vue';
import DelAlert from '../components/DelAlert.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const registerUser = async () => {
  try {
    showSuccessAlert.value = false;
    showErrorAlert.value = false;
    
    const response = await register({ name: name.value, email: email.value, password: password.value });
    localStorage.setItem('token', response.token);
    successMessage.value = 'Registration successful!';
    showSuccessAlert.value = true;
    
    setTimeout(() => {
      showSuccessAlert.value = false;
      router.push('/login');
    }, 500); // Hide alert after 3 seconds
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Registration failed. Please try again.';
    showErrorAlert.value = true;
    
    setTimeout(() => {
      showErrorAlert.value = false;
    }, 3000); // Hide alert after 3 seconds
  }
};
</script>
