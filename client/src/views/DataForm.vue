<template>
  <HeaderCont />
  <div class="max-w-4xl mx-auto p-6 border border-gray-300 rounded-lg bg-gray-100 shadow-md my-6">
    <h2 class="text-2xl font-semibold text-center text-gray-800">Add Data</h2>
    <form @submit.prevent="submitForm" class="space-y-4 mt-6">
      <div class="flex flex-col">
        <label for="name" class="font-medium text-gray-700">Name:</label>
        <input type="text" id="name" v-model="formData.name" required class="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
      </div>

      <div class="flex flex-col">
        <label for="age" class="font-medium text-gray-700">Age:</label>
        <input type="number" id="age" v-model.number="formData.age" required class="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
      </div>

      <div class="flex flex-col">
        <label for="jobs" class="font-medium text-gray-700">Jobs:</label>
        <input type="text" id="jobs" v-model="formData.jobs" required class="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
      </div>

      <div class="flex flex-col">
        <label for="phone" class="font-medium text-gray-700" >Phone:</label>
        <input type="text" id="phone" v-model="formData.phone" required class="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="05xx-xxx-xx-xx"/>
      </div>

      <div class="flex flex-col">
        <label for="email" class="font-medium text-gray-700">Email:</label>
        <input type="email" id="email" v-model="formData.email" required class="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
      </div>

      <button type="submit" class="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors">Add</button>
    </form>

    <!-- uyari ekrani  -->
    <div class="fixed top-6 right-6 space-y-4">
      <DelAlert v-if="showSuccessAlert" :message="successMessage" type="success" />
      <DelAlert v-if="showErrorAlert" :message="errorMessage" type="error" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createData } from '../api/data';
import HeaderCont from '../components/HeaderCont.vue';
import DelAlert from '../components/DelAlert.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
  name: '',
  age: null,
  jobs: '',
  phone: '',
  email: ''
});

const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const submitForm = async () => {
  try {
    // Success ve error alert'lerini sıfırla
    showSuccessAlert.value = false;
    showErrorAlert.value = false;

    // Telefon numarasının formatını kontrol et
    const phonePattern = /^05\d{2} \d{3} \d{2} \d{2}$/;
    if (!phonePattern.test(formData.value.phone)) {
      errorMessage.value = 'Please enter a valid phone number in the format 05xx-xxx-xx-xx.';
      showErrorAlert.value = true;
      setTimeout(() => {
        showErrorAlert.value = false;
      }, 3000);
      return;
    }

    // API çağrısı yap ve veri ekle
    const response = await createData(formData.value);
    successMessage.value = 'Data successfully added!';
    showSuccessAlert.value = true;

    
    setTimeout(() => {
      showSuccessAlert.value = false;
      router.push('/datalist');
    }, 500);

    // Formu sıfırla
    formData.value = {
      name: '',
      age: null,
      jobs: '',
      phone: '',
      email: ''
    };
  } catch (err) {
    errorMessage.value = 'Data could not be added. Please try again.';
    showErrorAlert.value = true;
    setTimeout(() => {
      showErrorAlert.value = false;
    }, 3000);
  }
};

</script>
