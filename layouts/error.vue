<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <img src="/football-icon.svg" alt="Football Icon" class="w-24 h-24 mb-4" />
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Oops!</h1>
    <p class="text-lg text-gray-700 mb-6">{{ error.message || 'La página que buscas no se pudo encontrar.' }}</p>
    <NuxtLink to="/" class="text-blue-500 hover:underline mb-4">
      Volver a la página principal
    </NuxtLink>
    <NuxtLink to="/articles" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Ver productos populares
    </NuxtLink>
  </div>
</template>

<script setup>
  defineProps(['error'])
</script>

<style scoped>
</style>
