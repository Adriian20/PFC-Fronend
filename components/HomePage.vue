<template>
  <div class="container mx-auto py-8">
    <h1 class="text-5xl font-bold text-center mb-16">FUTBOLMANÍA VINTAGE</h1>
    <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
      <div class="relative cursor-pointer">
        <a href="/articles" class="block relative">
          <img
            src="/public/important/articulos.jpg"
            alt="Artículos"
            class="mb-2 rounded-lg"
            style="height: 600px; width: 100%"
          />
          <!-- Superposición para el texto -->
          <div class="absolute inset-x-0 bottom-0 top-1/2">
            <div class="bg-gray-900 bg-opacity-60 transform -translate-y-1/2">
              <h2 class="text-white text-2xl font-semibold py-2 text-center uppercase">
                Artículos
              </h2>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div class="relative cursor-pointer">
        <a href="/categories" class="block relative">
          <img
            src="/public/important/categorias.jpg"
            alt="Categorías"
            class="mb-2 rounded-lg"
            style="height: 400px; width: 100%"
          />
          <!-- Superposición para el texto -->
          <div class="absolute inset-x-0 bottom-0 top-1/2">
            <div class="bg-gray-900 bg-opacity-60 transform -translate-y-1/2">
              <h2 class="text-white text-2xl font-semibold py-2 text-center uppercase">
                Categorías
              </h2>
            </div>
          </div>
        </a>
      </div>
      <div class="relative cursor-pointer">
        <a href="/visits" class="block relative">
          <img
            src="/public/important/visitas.jpg"
            alt="Visitas"
            class="mb-2 rounded-lg"
            style="height: 400px; width: 100%"
          />
          <div class="absolute inset-x-0 bottom-0 top-1/2">
            <div class="bg-gray-900 bg-opacity-55 transform -translate-y-1/2">
              <h2 class="text-white text-2xl font-semibold py-2 text-center uppercase">
                Visitas
              </h2>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
