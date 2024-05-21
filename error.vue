<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-pattern text-white"
  >
    <div class="max-w-md text-center">
      <img
        src="/football-icon.svg"
        alt="Icono Futbol"
        class="w-24 h-24 mx-auto mb-6"
      />
      <h1 class="text-4xl font-bold text-gray-900 mb-2">¡Oops!</h1>
      <p class="text-lg text-gray-300 mb-6">
        {{ error.message || "La página que buscas no se pudo encontrar." }}
      </p>
      <div>
        <NuxtLink to="/" class="text-blue-300 hover:underline mr-4"
          >Volver a la página principal</NuxtLink
        >
        <NuxtLink to="/articles" class="text-blue-300 hover:underline"
          >Ver productos populares</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["error"]);
</script>

<style scoped>
.bg-pattern {
  background-image: url("/images/background-pattern.jpg");
  background-size: cover;
}

.text-gray-900 {
  color: #ffffff;
}
</style>
