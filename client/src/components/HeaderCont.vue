<template>
  <header class="bg-indigo-700 text-white p-4 flex items-center">
    <!-- Sol Boşluk -->
    <div class="flex-1"></div>

    <!-- Başlık: Tam Ortada -->
    <div class="flex-none">
      <h1 class="text-2xl font-bold">DBMS</h1>
    </div>

    <!-- Sağ Taraf: Navigasyon -->
    <nav class="flex-1 flex justify-end space-x-8">
      <router-link to="/datalist" class="hover:text-gray-300"
        >Data Lists</router-link
      >
      <router-link to="/dataform" class="hover:text-gray-300"
        >Data Form</router-link
      >
    </nav>
  </header>
</template>

<script setup></script>

<style>
a{
    color: aliceblue;
}

a:hover{
    border-bottom: solid 2px white;
}
</style>
