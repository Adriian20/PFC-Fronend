<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold text-center mb-12 uppercase">Categorías</h1>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <div
        v-for="category in categorias"
        :key="category.id"
        class="relative cursor-pointer"
      >
        <a :href="'/articlesByCategory/' + category.id" class="block relative">
          <img
            :src="getImageUrl(category.img)"
            :alt="category.nombre"
            class="w-full h-72 object-cover mb-2 rounded-lg"
          />
          <div class="absolute inset-x-0 -bottom-0">
            <div class="bg-gray-900 bg-opacity-30 transform -translate-y-1/2">
              <h2
                class="text-white text-2xl font-semibold py-2 text-center uppercase"
              >
                {{ category.nombre }}
              </h2>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

let categorias = ref([]);

async function showCategories() {
  try {
    const response = await axios.get(
      "https://serverapi.up.railway.app/categories/allCategories"
    );
    categorias.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      error: {
        message:
          "Error al obtener las categorías. Por favor, inténtalo de nuevo más tarde.",
      },
    };
  }
}

showCategories();

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};
</script>

<style></style>
