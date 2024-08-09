<template>
  <HeaderCont />
  <div class="max-w-4xl mx-auto p-6 border border-gray-300 rounded-lg bg-gray-100 shadow-md my-6">
    <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
      Data Lists
    </h2>
    <ul class="space-y-4 mx-4 sm:mx-6">
      <li
        v-for="item in data"
        :key="item._id"
        class="p-4 border border-gray-300 rounded-md bg-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div class="flex-1">
          <h3 class="text-xl font-medium text-gray-800 mb-2 sm:mb-0">{{ item.name }}</h3>
          <p class="text-sm"><strong>Age: </strong>{{ item.age }}</p>
          <p class="text-sm"><strong>Jobs: </strong>{{ item.jobs }}</p>
          <p class="text-sm"><strong>Phone: </strong>{{ item.phone }}</p>
          <p class="text-sm"><strong>Email: </strong>{{ item.email }}</p>
        </div>
        <div class="flex flex-col sm:flex-row sm:ml-4 space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
          <!-- Edit button -->
          <button
            @click="openUpdateModal(item)"
            class="w-full sm:w-24 h-8 flex items-center justify-center rounded-md bg-green-500 text-white hover:bg-green-700 focus:outline-none text-sm"
            aria-label="Edit"
          >
            Edit
          </button>

          <!-- Delete button -->
          <button
            @click="deleteItem(item._id)"
            class="w-full sm:w-24 h-8 flex items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none text-sm"
            aria-label="Delete"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Success alert for deletion -->
    <DelAlert
      v-if="showSuccessAlert"
      :message="successMessage"
      type="success"
    />
    <!-- Error alert -->
    <DelAlert v-if="showErrorAlert" :message="error" type="error" />

    <!-- Update Form Component -->
    <Update
      :isVisible="showUpdateModal"
      :item="selectedItem"
      @update:visibility="showUpdateModal = $event"
      @update:data="updateItemInList"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getData, deleteData } from "../api/data";
import HeaderCont from "../components/HeaderCont.vue";
import DelAlert from "../components/DelAlert.vue";
import Update from "../components/Update.vue";

const data = ref([]);
const error = ref("");
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const successMessage = ref("");
const showUpdateModal = ref(false);
const selectedItem = ref({});

const loadData = async () => {
  try {
    error.value = "";
    data.value = await getData();
  } catch (err) {
    error.value = "Data could not be loaded. Please try again.";
  }
};

const openUpdateModal = (item) => {
  selectedItem.value = item;
  showUpdateModal.value = true;
};

const updateItemInList = (updatedItem) => {
  data.value = data.value.map((item) =>
    item._id === updatedItem._id ? updatedItem : item
  );
  successMessage.value = "Data successfully updated!";
  showSuccessAlert.value = true;
  setTimeout(() => {
    showSuccessAlert.value = false;
  }, 3000); // Hide alert after 3 seconds
};

const deleteItem = async (id) => {
  try {
    await deleteData(id);
    data.value = data.value.filter((item) => item._id !== id);
    successMessage.value = "User successfully deleted!";
    showSuccessAlert.value = true;
    setTimeout(() => {
      showSuccessAlert.value = false;
    }, 3000); // Hide alert after 3 seconds
  } catch (err) {
    console.error("Error deleting data:", err);
    error.value = "Error deleting data";
    showErrorAlert.value = true;
    setTimeout(() => {
      showErrorAlert.value = false;
    }, 3000); // Hide alert after 3 seconds
  }
};

onMounted(loadData);
</script>

<style>
h3 {
  border-bottom: solid 2px rgb(0, 0, 0);
  display: inline-block;
}
h3::first-letter {
  text-transform: uppercase;
}

p {
  padding: 5px;
}
</style>
