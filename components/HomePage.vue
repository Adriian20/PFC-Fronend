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
          <div class="absolute inset-x-0 bottom-0 top-1/2">
            <div class="bg-gray-900 bg-opacity-60 transform -translate-y-1/2">
              <h2
                class="text-white text-2xl font-semibold py-2 text-center uppercase"
              >
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
          <div class="absolute inset-x-0 bottom-0 top-1/2">
            <div class="bg-gray-900 bg-opacity-60 transform -translate-y-1/2">
              <h2
                class="text-white text-2xl font-semibold py-2 text-center uppercase"
              >
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
              <h2
                class="text-white text-2xl font-semibold py-2 text-center uppercase"
              >
                Visitas
              </h2>
            </div>
          </div>
        </a>
      </div>
    </div>

    <h2 class="text-3xl font-semibold mb-4 mt-24 text-center">
      Artículos Destacados
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
      <div v-for="articulo in articulos" :key="articulo.id">
        <a :href="'/seeArticle/' + articulo.id" class="block">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <img
              :src="getImageUrl(articulo.img)"
              :alt="articulo.nombre"
              class="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h2 class="text-xl font-semibold mb-2">{{ articulo.nombre }}</h2>
            <p class="text-gray-600">
              {{ articulo.marca }} {{ articulo.talla }}
            </p>
          </div>
        </a>
      </div>
    </div>

    <h2 class="text-3xl font-semibold mb-4 mt-24 text-center">
      Categorías Destacadas
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
      <div v-for="categoria in categorias" :key="categoria.id">
        <a :href="'/articlesByCategory/' + categoria.id" class="block">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <img
              :src="getImageUrl(categoria.img)"
              :alt="categoria.nombre"
              class="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h2 class="text-xl font-semibold mb-2">{{ categoria.nombre }}</h2>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";

let articulos = ref([]);
let categorias = ref([]);

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};

async function showArticles() {
  try {
    const response = await axios.get(
      "https://serverapi.up.railway.app/articles/allArticles"
    );
    const sortedArticulos = response.data.sort((a, b) => a.stock - b.stock);
    articulos.value = sortedArticulos.slice(0, 4);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      error: {
        message:
          "Error al obtener los artículos. Por favor, inténtalo de nuevo más tarde.",
      },
    };
  }
}

async function showCategories() {
  try {
    const response = await axios.get(
      "https://serverapi.up.railway.app/categories/allCategories"
    );
    categorias.value = response.data.slice(0, 4);
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

showArticles();
showCategories();
</script>

<style></style>
