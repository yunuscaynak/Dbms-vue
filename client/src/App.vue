<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow">
      <router-view></router-view>
    </main>
  </div>
  
</template>

<script setup>

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
*{

  font-family: 'Roboto Mono', monospace;
  font-optical-sizing: auto;
  
  
  
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgb(67 56 202); 
}

::-webkit-scrollbar-thumb {
  background: #636363; 
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>

