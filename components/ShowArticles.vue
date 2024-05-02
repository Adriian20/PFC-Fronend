<template>
  <div>
    <div
      class="flex-col justify-items-center px-16 md:px-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        class="w-full bg-white shadow rounded"
        v-for="articulo in articulos"
        :key="articulo.id"
      >
        <div
          class="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
          :style="{ backgroundImage: `url('${getImageUrl(articulo.img)}')` }"
        >
          <div>
            <span
              class="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none"
              v-if="articulo.stock > 5"
            >
              Disponible
            </span>
            <span
              class="uppercase text-xs bg-red-50 p-0.5 border-red-500 border rounded text-red-700 font-medium select-none"
              v-else
            >
              Quedan pocos
            </span>
          </div>
        </div>

        <div class="p-4 flex flex-col items-center">
          <p class="text-gray-400 font-light text-xs text-center">
            {{ articulo.marca }}
          </p>
          <h1 class="text-gray-800 text-center mt-1">
            {{ articulo.nombre }}
          </h1>
          <p class="text-center text-gray-800 mt-1">{{ articulo.precio }}€</p>

          <div class="inline-flex items-center mt-2">
            <button
              class="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
              @click="decrementQuantity(articulo.id)"
              name="decrement"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                />
              </svg>
            </button>
            <div
              class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none"
            >
              {{ getQuantity(articulo.id) }}
            </div>
            <button
              class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
              @click="incrementQuantity(articulo.id)"
              name="increment"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <button
            class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-8 w-full flex items-center justify-center"
          >
            Añadir al carrito
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from 'vue';

const getImageUrl = (imageName) => {
  return `/images/${imageName}`; 
};

let articulos = ref(null);

async function showArticles() {
  try {
    const response = await axios.get('http://localhost:8080/pfc/articles/allArticles');
    const sortedArticulos = response.data.sort((a, b) => b.stock - a.stock);
    articulos.value = sortedArticulos;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

let selectedQuantities = ref({});
const incrementQuantity = (id) => {
  if (!selectedQuantities.value[id]) {
    selectedQuantities.value[id] = 1;
  } else {
    selectedQuantities.value[id]++;
  }
};

const decrementQuantity = (id) => {
  if (selectedQuantities.value[id] && selectedQuantities.value[id] > 0) {
    selectedQuantities.value[id]--;
  }
};

const getQuantity = (id) => {
  return selectedQuantities.value[id] || 0;
};

showArticles();
</script>

<style></style>
