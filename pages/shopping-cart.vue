<template>
  <div>
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-semibold mb-4">Carrito de compras</h1>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="md:w-3/4">
          <div
            class="bg-white rounded-lg shadow-md p-6 mb-4 cart-item"
            v-for="item in cartItems"
            :key="item.id"
          >
            <table class="w-full">
              <thead>
                <tr>
                  <th class="text-left font-semibold">Producto</th>
                  <th class="text-left font-semibold">Marca</th>
                  <th class="text-left font-semibold">Talla</th>
                  <th class="text-left font-semibold">Precio</th>
                  <th class="text-left font-semibold">Cantidad</th>
                  <th class="text-left font-semibold">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-4">
                    <div class="flex items-center">
                      <img
                        class="h-16 w-16 mr-4"
                        :src="getImageUrl(item.img)"
                        alt="Imagen del producto"
                      />
                      <span class="font-semibold">{{ item.nombre }}</span>
                    </div>
                  </td>
                  <td class="py-4">{{ item.marca }}</td>
                  <td class="py-4">{{ item.talla }}</td>
                  <td class="py-4">{{ item.precio }}€</td>
                  <td class="py-4">
                    <div class="flex items-center">
                      <button
                        class="border rounded-md py-2 px-4 mr-2"
                        @click="
                          updateQuantity(item.id, item.quantity - 1, 'item')
                        "
                        :disabled="item.quantity <= 1"
                      >
                        -
                      </button>
                      <span class="text-center w-8">{{ item.quantity }}</span>
                      <button
                        class="border rounded-md py-2 px-4 ml-2"
                        @click="
                          updateQuantity(item.id, item.quantity + 1, 'item')
                        "
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="py-4">
                    {{ (item.precio * item.quantity).toFixed(2) }}€
                  </td>
                  <td class="py-4">
                    <button
                      class="text-red-500"
                      @click="removeFromCart(item.id, 'item')"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="bg-white rounded-lg shadow-md p-6 mb-4 cart-item"
            v-for="visit in cartVisits"
            :key="visit.id"
          >
            <table class="w-full">
              <thead>
                <tr>
                  <th class="text-left font-semibold">Visita</th>
                  <th class="text-left font-semibold">Fecha</th>
                  <th class="text-left font-semibold">Horario</th>
                  <th class="text-left font-semibold">Precio</th>
                  <th class="text-left font-semibold">Cantidad</th>
                  <th class="text-left font-semibold">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-4">
                    <div class="flex items-center">
                      <img
                        class="h-16 w-16 mr-4"
                        :src="getImageUrl(visit.img)"
                        alt="Imagen de la visita"
                      />
                      <span class="font-semibold">{{ visit.titulo }}</span>
                    </div>
                  </td>
                  <td class="py-4">{{ visit.fecha_visita }}</td>
                  <td class="py-4">
                    {{ visit.hora_entrada }} - {{ visit.hora_salida }}
                  </td>
                  <td class="py-4">{{ visit.precio_entrada.toFixed(2) }}€</td>
                  <td class="py-4">
                    <div class="flex items-center">
                      <button
                        class="border rounded-md py-2 px-4 mr-2"
                        @click="
                          updateQuantity(visit.id, visit.quantity - 1, 'visit')
                        "
                        :disabled="visit.quantity <= 1"
                      >
                        -
                      </button>
                      <span class="text-center w-8">{{ visit.quantity }}</span>
                      <button
                        class="border rounded-md py-2 px-4 ml-2"
                        @click="
                          updateQuantity(visit.id, visit.quantity + 1, 'visit')
                        "
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="py-4">
                    {{ (visit.precio_entrada * visit.quantity).toFixed(2) }}€
                  </td>
                  <td class="py-4">
                    <button
                      class="text-red-500"
                      @click="removeFromCart(visit.id, 'visit')"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="md:w-1/4">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-lg font-semibold mb-4">Resumen</h2>
            <div class="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{{ totalCartPrice.toFixed(2) }}€</span>
            </div>
            <div class="flex justify-between mb-2">
              <span>Envío</span>
              <span>{{ shippingCost.toFixed(2) }}€</span>
            </div>
            <hr class="my-2" />
            <div class="flex justify-between mb-2">
              <span class="font-semibold">Total</span>
              <span class="font-semibold">
                {{ (totalCartPrice + shippingCost).toFixed(2) }}€
              </span>
            </div>
            <button
              class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
              v-if="cartItems.length > 0 || cartVisits.length > 0"
              @click="buyProducts"
            >
              Realizar pedido
            </button>
            <button
              class="align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full opacity-50 cursor-not-allowed"
              type="button"
              title="Añade algun producto para poder comprar"
              :disabled="cartItems.length === 0 && cartVisits.length === 0"
              v-else
            >
              No hay elementos en tu carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useCartStore } from "@/stores/cart";
import { useToast } from "vue-toastification";
import { computed, ref, onMounted } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";

const toast = useToast();
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
const cartVisits = computed(() => cartStore.cartVisits);
const totalCartPrice = computed(() => cartStore.totalCartPrice);
const shippingCost = computed(() => cartStore.shippingCost);
const isLoading = ref(false);

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};

const updateQuantity = (itemId, quantity, type = "item") => {
  if (type === "item") {
    if (quantity >= 1) {
      cartStore.updateItemQuantity(itemId, quantity);
    }
  } else if (type === "visit") {
    if (quantity >= 1) {
      cartStore.updateVisitQuantity(itemId, quantity);
    }
  }
};

const removeFromCart = (itemId, type = "item") => {
  if (type === "item") {
    cartStore.removeItem(itemId);
  } else if (type === "visit") {
    cartStore.removeVisit(itemId);
  }
};

const clearCart = () => {
  cartStore.clearCart();
};

async function buyProducts() {
  const user = localStorage.getItem("id");

  const articulos = {};
  cartItems.value.forEach((item) => {
    articulos[item.id] = item.quantity;
  });

  const visitas = {};
  cartVisits.value.forEach((visit) => {
    visitas[visit.id] = visit.quantity;
  });

  isLoading.value = true;

  try {
    if (Object.keys(articulos).length > 0) {
      await axios.post(
        `http://localhost:8080/pfc/users/${user}/buy-articles`,
        articulos
      );
    }

    if (Object.keys(visitas).length > 0) {
      await axios.post(
        `http://localhost:8080/pfc/users/${user}/buy-visits`,
        visitas
      );
    }

    toast.success("Se ha realizado correctamente el pedido");
    clearCart();
  } catch (error) {
    if (!error.response) {
      toast.error("Error de red. Por favor, verifica tu conexión a internet.");
    } else if (error.response.status >= 500) {
      toast.error(
        "Error del servidor. Por favor, inténtalo de nuevo más tarde."
      );
    } else if (error.response.status >= 400) {
      toast.error(`Error: ${error.response.data.message || "Algo salió mal"}`);
    } else {
      toast.error("Hubo un problema al realizar el pedido.");
    }
    console.error("Error:", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  cartStore.initializeCart();
});
</script>

<style>
.shopping-cart {
  padding: 16px;
}
.cart-item {
  margin-bottom: 16px;
}
</style>
