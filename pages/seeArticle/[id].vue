<template>
  <div class="py-16 px-8">
    <div
      class="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2"
    >
      <img
        :src="getImageUrl(articulo.img)"
        :alt="articulo.nombre"
        class="h-[34rem]"
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
          class="block antialiased font-sans text-base leading-relaxed text-inherit !mt-4 font-normal !text-gray-500"
        >
          {{ articulo.descripcion }}
        </p>
        <p
          v-if="articulo.talla"
          class="block antialiased font-sans text-base leading-relaxed text-inherit !mt-4 font-normal !text-gray-500"
        >
          Talla: {{ articulo.talla }}
        </p>
        <p
          v-else
          class="block antialiased font-sans text-base leading-relaxed text-inherit !mt-4 font-normal !text-gray-500"
        >
          Talla: Unisex
        </p>
        <p
          v-if="articulo.marca"
          class="block antialiased font-sans text-base leading-relaxed text-inherit !mt-4 font-normal !text-gray-500"
        >
          Marca: {{ articulo.marca }}
        </p>
        <div class="mb-4 mt-12 flex w-full items-center gap-3 md:w-1/2">
          <button
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-52"
            type="button"
            data-ripple-light="true"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

let articulo = ref([]);

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};

async function showArticles() {
  try {
    const response = await axios.get(
      "http://localhost:8080/pfc/articles/article/" + route.params.id
    );
    articulo.value = response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}

showArticles();
</script>

<style></style>