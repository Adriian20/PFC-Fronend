<template>
  <div class="p-6 bg-white mb-16 shadow rounded">
    <div class="mb-4">
      <label for="search" class="block text-sm font-medium text-gray-700"
        >Buscar</label
      >
      <input
        v-model="filters.search"
        type="text"
        id="search"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        placeholder="Buscar por título..."
      />
    </div>
    <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="brand" class="block text-sm font-medium text-gray-700"
          >Marca</label
        >
        <select
          v-model="filters.brand"
          id="brand"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Todas</option>
          <option v-for="brand in filteredBrands" :key="brand" :value="brand">
            {{ brand }}
          </option>
        </select>
      </div>
      <div>
        <label for="size" class="block text-sm font-medium text-gray-700"
          >Talla</label
        >
        <select
          v-model="filters.size"
          id="size"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Todas</option>
          <option v-for="size in filteredSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
    </div>
    <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="minPrice" class="block text-sm font-medium text-gray-700"
          >Precio Mínimo</label
        >
        <input
          v-model.number="filters.minPrice"
          type="number"
          id="minPrice"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="0"
        />
      </div>
      <div>
        <label for="maxPrice" class="block text-sm font-medium text-gray-700"
          >Precio Máximo</label
        >
        <input
          v-model.number="filters.maxPrice"
          type="number"
          id="maxPrice"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="0"
        />
      </div>
    </div>
    <div class="flex justify-end">
      <button
        @click="clearFilters"
        class="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
      >
        Limpiar Filtros
      </button>
      <div class="flex justify-end">
        <button
          @click="applyFilters"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  brands: {
    type: Array,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["apply-filters"]);

const filters = ref({
  search: "",
  brand: "",
  size: "",
  minPrice: 0,
  maxPrice: 0,
});

const clearFilters = () => {
  filters.value.search = "";
  filters.value.brand = "";
  filters.value.size = "";
  filters.value.minPrice = 0;
  filters.value.maxPrice = 0;
};

const applyFilters = () => {
  emit("apply-filters", filters.value);
};

const filteredBrands = computed(() => props.brands.filter((brand) => brand));
const filteredSizes = computed(() => props.sizes.filter((size) => size));
</script>

<style scoped></style>
