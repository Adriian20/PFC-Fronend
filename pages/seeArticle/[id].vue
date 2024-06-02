<template>
  <div class="px-8">
    <LoadingBar v-if="isLoading" />

    <div
      v-else-if="articulo"
      class="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2"
    >
      <img
        :src="getImageUrl(articulo.img)"
        :alt="articulo.nombre"
        class="h-5/6 w-5/6"
      />
      <div>
        <h3
          class="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-inherit mb-4"
        >
          {{ articulo.nombre }}
        </h3>
        <h5
          class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-inherit"
        >
          {{ articulo.precio }}
        </h5>
        <p
          class="block antialiased font-sans text-lg leading-relaxed text-inherit !mt-4 font-normal !text-gray-700"
        >
          {{ articulo.descripcion }}
        </p>
        <p
          v-if="articulo.talla"
          class="block antialiased font-sans text-lg leading-relaxed text-inherit !mt-4 font-normal !text-gray-700"
        >
          Talla: {{ articulo.talla }}
        </p>
        <p
          v-else
          class="block antialiased font-sans text-lg leading-relaxed text-inherit !mt-4 font-normal !text-gray-700"
        >
          <b>Talla:</b> Única
        </p>
        <p
          v-if="articulo.genero"
          class="block antialiased font-sans text-lg leading-relaxed text-inherit !mt-4 font-normal !text-gray-700"
        >
          <b>Genero:</b> {{ articulo.genero }}
        </p>
        <p
          v-else
          class="block antialiased font-sans text-lg leading-relaxed text-inherit !mt-4 font-normal !text-gray-700"
        >
          <b>Genero:</b> Unisex
        </p>
        <p
          v-if="articulo.marca"
          class="block antialiased font-sans text-lg leading-relaxed text-inherit !mt-4 font-normal !text-gray-700"
        >
          <b>Marca:</b> {{ articulo.marca }}
        </p>
        <div class="mb-4 mt-12 flex w-full items-center gap-3 md:w-1/2">
          <button
            v-if="isLogged()"
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all text-sm py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full"
            type="button"
            data-ripple-light="true"
            title="Añadir al carrito"
            @click="addToCart(articulo)"
          >
            Añadir al carrito
          </button>
          <button
            v-if="!isLogged()"
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all text-sm py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full opacity-50 cursor-not-allowed"
            type="button"
            title="Necesitas iniciar sesión"
          >
            Inicia sesión para añadir al carrito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import LoadingBar from "@/components/LoadingBar.vue";

const route = useRoute();
const articulo = ref([]);
const cartStore = useCartStore();
const loaded = ref(false);
const isLoading = ref(true);

const getImageUrl = (imageName) => `/images/${imageName}`;

const isLogged = () =>
  typeof localStorage !== "undefined" && localStorage.getItem("token") !== null;

async function showArticles() {
  try {
    const response = await axios.get(
      "https://serverapi.up.railway.app/articles/article/" + route.params.id
    );
    articulo.value = response.data;
    loaded.value = true;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      error: {
        message:
          "Error al obtener los artículos. Por favor, inténtalo de nuevo más tarde.",
      },
    };
  } finally {
    isLoading.value = false;
  }
}

const addToCart = () => {
  cartStore.addItem({
    id: articulo.value.id,
    nombre: articulo.value.nombre,
    precio: articulo.value.precio,
    img: articulo.value.img,
    descripcion: articulo.value.descripcion,
    talla: articulo.value.talla || "Talla Única",
    genero: articulo.value.genero,
    marca: articulo.value.marca,
  });
};

onMounted(() => {
  showArticles();
});
</script>

<style></style>
