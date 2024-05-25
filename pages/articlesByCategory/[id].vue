<template>
  <div>
    <div
      v-if="articulos.length > 0"
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

          <div class="w-full mt-6">
            <button
              v-if="isLogged()"
              class="mt-auto align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full"
              type="button"
              data-ripple-light="true"
              title="Añadir al carrito"
              @click="addToCart(articulo)"
            >
              Añadir al carrito
            </button>
            <button
              v-else
              class="mt-auto align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full opacity-50 cursor-not-allowed"
              type="button"
              title="Necesitas iniciar sesión"
            >
              Inicia sesión para añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex items-center justify-center mt-80">
      <h1 class="text-4xl text-gray-800 font-bold">
        ¡No hay artículos en esta categoría disponibles!
      </h1>
    </div>

    <div
      v-if="totalPages > 1"
      class="bottom-0 inset-x-0 p-4 bg-white shadow-top"
    >
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
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useToast } from "vue-toastification";

const cartStore = useCartStore();
const toast = useToast();
const route = useRoute();
const articulos = ref([]);
let page = ref(1);
const perPage = 12;

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};

const isLogged = () =>
  typeof localStorage !== "undefined" && localStorage.getItem("token") !== null;

async function showArticlesByCategory() {
  try {
    const response = await axios.get(
      "http://localhost:8080/pfc/articles/findByCategoria/" + route.params.id
    );
    articulos.value = response.data;
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

const addToCart = (articulo) => {
  cartStore.addItem({
    id: articulo.id,
    nombre: articulo.nombre,
    precio: articulo.precio,
    img: articulo.img,
    descripcion: articulo.descripcion,
    talla: articulo.talla,
    marca: articulo.marca,
  });

  toast.success("Artículo añadido al carrito");
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

showArticlesByCategory();
</script>

<style></style>
