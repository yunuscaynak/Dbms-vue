<!-- components/Alert.vue -->
<template>
  <div v-if="visible" class="fixed bottom-4 left-4 py-3 px-6 bg-green-500 text-white rounded-md shadow-lg">
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  message: String,
  duration: {
    type: Number,
    default: 3000 // 3 saniye
  }
});

const visible = ref(false);

const showAlert = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
};

onMounted(() => {
  showAlert();
});
</script>

<style scoped>
/* Tailwind CSS ile uyumlu olacak şekilde stil ekleyebilirsiniz */
</style>
