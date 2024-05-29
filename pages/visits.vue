<template>
  <div class="container mx-auto p-4">
    <h1 class="text-5xl font-bold text-center mb-16">Museo de Fútbol</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
      <div
        v-for="(image, index) in featuredImages"
        :key="image.id"
        class="image-container"
      >
        <img
          :src="getImageUrlVisits(image.url)"
          :alt="image.alt"
          class="image"
          :class="{ 'lg:col-span-3': index === 0 }"
        />
      </div>
    </div>

    <h2 class="text-4xl font-bold text-center mb-8 mt-28">Compra tu visita</h2>
    <p class="text-center text-gray-600 text-base mb-8">
      El Museo de Fútbol es un lugar donde se pueden ver objetos relacionados
      con el fútbol, como balones, trofeos, equipaciones de fútbol, entre otros.
      Por lo que el Museo de Fútbol es un lugar ideal para visitar.
    </p>
    <Splide :options="splideOptions" class="splide-container">
      <SplideSlide v-for="visit in visits" :key="visit.id" class="splide-slide">
        <div class="card p-4 flex flex-col justify-between">
          <div>
            <img :src="getImageUrl(visit.img)" class="image mb-4" />
            <h3 class="text-xl font-semibold mb-4">{{ visit.titulo }}</h3>
            <p class="text-gray-700 text-base mb-4">{{ visit.fecha_visita }}</p>
            <p class="text-gray-700 text-base mb-4">
              {{ visit.hora_entrada }} - {{ visit.hora_salida }}
            </p>
            <p class="text-gray-700 text-base mb-4">{{ visit.comentarios }}</p>
            <p class="text-gray-700 text-base mb-4">
              <b>Precio: {{ visit.precio_entrada }}€</b>
            </p>
          </div>
          <div class="flex justify-start mt-6">
            <button
              class="align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-52"
              type="button"
              data-ripple-light="true"
              v-if="isLogged()"
              title="Añadir al carrito"
              @click="addToCart(visit)"
            >
              Añadir al carrito
            </button>
            <button
              class="align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-52 opacity-50 cursor-not-allowed"
              type="button"
              title="Necesitas iniciar sesión"
              v-else
            >
              Inicia sesión para añadir al carrito
            </button>
          </div>
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import { useCartStore } from "@/stores/cart";
import { useToast } from "vue-toastification";

const cartStore = useCartStore();
const toast = useToast();
const visits = ref([]);

const featuredImages = ref([
  { id: 1, url: "museo1.jpg", alt: "Imagen destacada 1" },
  { id: 2, url: "museo2.jpg", alt: "Imagen destacada 2" },
  { id: 3, url: "museo3.jpg", alt: "Imagen destacada 3" },
  { id: 4, url: "museo4.jpg", alt: "Imagen destacada 4" },
  { id: 5, url: "museo5.jpg", alt: "Imagen destacada 5" },
]);

const getImageUrlVisits = (imageName) => {
  return `/visits/${imageName}`;
};

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};

const splideOptions = ref({
  perPage: 3,
  rewind: true,
  height: "auto",
  arrows: true,
  pagination: false,
});

const updatePerPage = () => {
  if (window.innerWidth <= 768) {
    splideOptions.value.perPage = 1;
  } else if (window.innerWidth <= 1024) {
    splideOptions.value.perPage = 2;
  } else {
    splideOptions.value.perPage = 3;
  }
};

onMounted(() => {
  updatePerPage();
  window.addEventListener("resize", updatePerPage);
});

const isLogged = () =>
  typeof localStorage !== "undefined" && localStorage.getItem("token") !== null;

async function showVisits() {
  try {
    const response = await axios.get(
      "http://localhost:8080/pfc/visits/allVisits"
    );
    visits.value = response.data;
  } catch (error) {
    console.error("Error fetching visits:", error);
    return {
      error: {
        message:
          "Error al obtener las visitas. Por favor, inténtalo de nuevo más tarde.",
      },
    };
  }
}

const addToCart = (visit) => {
  cartStore.addVisit({
    id: visit.id,
    titulo: visit.titulo,
    fecha_visita: visit.fecha_visita,
    hora_entrada: visit.hora_entrada,
    hora_salida: visit.hora_salida,
    precio_entrada: visit.precio_entrada,
    comentarios: visit.comentarios,
    img: visit.img,
  });
};

showVisits();
</script>

<style>
.image-container {
  overflow: hidden;
}

.image {
  width: 100%;
  height: 20rem;
  object-fit: cover;
}

.splide-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.splide-slide {
  width: 100%;
}

.splide__arrows {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: -3rem;
  left: 0;
  padding: 0 1rem;
  box-sizing: border-box;
}

.splide__arrow {
  position: static;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

@media (max-width: 768px) {
  .splide-slide {
    width: 100%;
  }
}
</style>
