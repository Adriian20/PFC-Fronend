<template>
  <div>
    <div
      class="flex-col justify-items-center px-16 md:px-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        class="w-full bg-white shadow rounded"
        v-for="articulo in paginatedArticles"
        :key="articulo.id"
      >
        <a :href="`/seeArticle/${articulo.id}`">
          <div
            class="h-48 w-full rounded flex flex-col justify-between p-4 bg-cover bg-center overflow-hidden cursor-pointer"
            :style="{
              backgroundImage: `url('${getImageUrl(articulo.img)}')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }"
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
        </a>

        <div class="p-6 flex flex-col items-center">
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
            class="py-2 px-4 bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded mt-8 w-full flex items-center justify-center"
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
    <div class="absolute inset-x-0 bottom-0 p-4 bg-white shadow-top">
      <div class="mt-4 mb-2 flex justify-center">
        <button
          class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          @click="prevPage"
          :disabled="page <= 1"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
          Anterior
        </button>

        <div class="flex items-center gap-2">
          <button
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            :class="{
              'bg-gray-900 text-white': pageNumber === page,
              'bg-white text-gray-900': pageNumber !== page,
              'cursor-pointer': pageNumber !== page,
            }"
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            @click="goToPage(pageNumber)"
            type="button"
          >
            <span
              class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
              {{ pageNumber }}
            </span>
          </button>
        </div>

        <button
          class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          @click="nextPage"
          :disabled="page >= totalPages"
          type="button"
        >
          Siguiente
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";

let articulos = ref([]);
let page = ref(1);
const perPage = 12;

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};

async function showArticles() {
  try {
    const response = await axios.get(
      "http://localhost:8080/pfc/articles/allArticles"
    );
    const sortedArticulos = response.data.sort((a, b) => b.stock - a.stock);
    articulos.value = sortedArticulos;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}

let selectedQuantities = ref({});
const incrementQuantity = (id) => {
  if (!selectedQuantities.value[id]) {
    selectedQuantities.value[id] = 1;
  } else {
    if (
      selectedQuantities.value[id] <
      articulos.value.find((item) => item.id === id).stock
    ) {
      selectedQuantities.value[id]++;
    }
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

const goToPage = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    page.value = pageNumber;
  }
};

function prevPage() {
  if (page.value > 1) {
    page.value--;
  }
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++;
  }
}

const paginatedArticles = computed(() => {
  const start = (page.value - 1) * perPage;
  const end = start + perPage;
  return articulos.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(articulos.value.length / perPage));

showArticles();
</script>

<style></style>
