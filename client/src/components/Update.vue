<template>
    <transition name="slide-fade">
      <div
        v-if="isVisible"
        class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end items-start"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-screen transform translate-x-full animate-slide-in"
        >
          <h3 class="text-xl font-semibold mb-4">Update Person</h3>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="name" class="block text-gray-700">Name:</label>
              <input
                v-model="form.name"
                id="name"
                type="text"
                placeholder="Enter name"
                class="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div class="mb-4">
              <label for="age" class="block text-gray-700">Age:</label>
              <input
                v-model.number="form.age"
                id="age"
                type="number"
                placeholder="Enter age"
                class="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div class="mb-4">
              <label for="jobs" class="block text-gray-700">Jobs:</label>
              <input
                v-model="form.jobs"
                id="jobs"
                type="text"
                placeholder="Enter job"
                class="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div class="mb-4">
              <label for="phone" class="block text-gray-700">Phone:</label>
              <input
                v-model="form.phone"
                id="phone"
                type="text"
                placeholder="05xx xxx xx xx"
                class="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700">Email:</label>
              <input
                v-model="form.email"
                id="email"
                type="email"
                placeholder="Enter email"
                class="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div class="flex justify-end space-x-4">
              <button
                type="button"
                @click="$emit('update:visibility', false)"
                class="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  
    <!-- Alerts for validation errors -->
    <div v-if="showErrorAlert" class="fixed top-6 left-6 space-y-4">
      <DelAlert :message="errorMessage" type="error" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import { updateData } from "../api/data";
  import DelAlert from '../components/DelAlert.vue'; // Uyarı bileşenini içe aktar
  
  const props = defineProps({
    isVisible: Boolean,
    item: Object,
  });
  
  const emit = defineEmits(["update:visibility", "update:data"]);
  
  const form = ref({
    name: "",
    age: null,
    jobs: "",
    phone: "",
    email: "",
  });
  
  const showErrorAlert = ref(false); // Uyarı için kontrol değişkeni
  const errorMessage = ref(''); // Uyarı mesajı
  
  watch(
    () => props.item,
    (newItem) => {
      if (newItem) {
        form.value = { ...newItem };
      }
    },
    { immediate: true }
  );
  
  const handleSubmit = async () => {
    // Telefon numarası formatını kontrol et
    const phonePattern = /^05\d{2} \d{3} \d{2} \d{2}$/;
    if (!phonePattern.test(form.value.phone)) {
      errorMessage.value = 'Please enter a valid phone number in the format 05xx xxx xx xx.';
      showErrorAlert.value = true;
      setTimeout(() => {
        showErrorAlert.value = false;
      }, 3000);
      return;
    }
  
    try {
      const updatedItem = await updateData(form.value._id, form.value);
      emit("update:data", updatedItem);
      emit("update:visibility", false);
    } catch (err) {
      errorMessage.value = 'Error updating data. Please try again.';
      showErrorAlert.value = true;
      setTimeout(() => {
        showErrorAlert.value = false;
      }, 3000);
    }
  };
  </script>
  
  <style scoped>
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
  
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  
  .animate-slide-in {
    animation: slideIn 0.5s forwards;
  }
  
  .animate-slide-out {
    animation: slideOut 0.5s forwards;
  }
  </style>
  