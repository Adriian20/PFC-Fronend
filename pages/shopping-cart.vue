<template>
  <div>
    <div class="container mx-auto">
      <h1 class="text-3xl font-semibold mb-6">Cesta</h1>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="lg:w-3/4 xl:w-11/12">
          <div
            class="bg-white rounded-lg shadow-md p-2 mb-4 cart-item"
            v-for="item in cartItems"
            :key="item.id"
          >
            <table class="w-full">
              <thead>
                <tr>
                  <th class="text-left font-semibold">Producto</th>
                  <th class="hidden md:table-cell text-left font-semibold">
                    Marca
                  </th>
                  <th class="hidden md:table-cell text-left font-semibold">
                    Talla
                  </th>
                  <th class="text-left font-semibold">Precio</th>
                  <th class="text-center font-semibold">Cantidad</th>
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
                  <td class="hidden md:table-cell py-4">{{ item.marca }}</td>
                  <td class="hidden md:table-cell py-4">{{ item.talla }}</td>
                  <td class="py-4">{{ item.precio }}€</td>
                  <td class="py-4 text-center">
                    <div class="flex items-center justify-center">
                      <button
                        class="border rounded-md py-2 px-4 ml-2 mr-2"
                        @click="
                          updateQuantity(item.id, item.quantity - 1, 'item')
                        "
                        :disabled="item.quantity <= 1"
                      >
                        -
                      </button>
                      <span class="text-center w-8">{{ item.quantity }}</span>
                      <button
                        class="border rounded-md py-2 px-4 mr-2 ml-2"
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
                  <td class="py-4 pl-2">
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
            class="bg-white rounded-lg shadow-md p-2 mb-4 cart-item"
            v-for="visit in cartVisits"
            :key="visit.id"
          >
            <table class="w-full">
              <thead>
                <tr>
                  <th class="text-left font-semibold">Visita</th>
                  <th class="hidden md:table-cell text-left font-semibold">
                    Fecha
                  </th>
                  <th class="hidden md:table-cell text-left font-semibold">
                    Horario
                  </th>
                  <th class="text-left font-semibold">Precio</th>
                  <th class="text-center font-semibold">Cantidad</th>
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
                  <td class="hidden md:table-cell py-4">
                    {{ visit.fecha_visita }}
                  </td>
                  <td class="hidden md:table-cell py-4">
                    {{ visit.hora_entrada }} - {{ visit.hora_salida }}
                  </td>
                  <td class="py-4">{{ visit.precio_entrada.toFixed(2) }}€</td>
                  <td class="py-4 text-center">
                    <div class="flex items-center justify-center">
                      <button
                        class="border rounded-md py-2 px-4 ml-2 mr-2"
                        @click="
                          updateQuantity(visit.id, visit.quantity - 1, 'visit')
                        "
                        :disabled="visit.quantity <= 1"
                      >
                        -
                      </button>
                      <span class="text-center w-8">{{ visit.quantity }}</span>
                      <button
                        class="border rounded-md py-2 px-4 mr-2 ml-2"
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
                  <td class="py-4 pl-2">
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
            <div class="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>{{ totalCartPrice.toFixed(2) }}€</span>
            </div>
            <div class="flex justify-between mb-4">
              <span>Envío</span>
              <span>{{ shippingCost.toFixed(2) }}€</span>
            </div>
            <hr class="my-2" />
            <div class="flex justify-between mb-4">
              <span class="font-semibold">Total</span>
              <span class="font-semibold">
                {{ (totalCartPrice + shippingCost).toFixed(2) }}€
              </span>
            </div>
            <button
              class="bg-blue-500 text-white py-3 px-6 rounded-lg mt-4 w-full"
              v-if="
                isLogged() && (cartItems.length > 0 || cartVisits.length > 0)
              "
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
import { computed, ref } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";

const toast = useToast();
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
const cartVisits = computed(() => cartStore.cartVisits);
const totalCartPrice = computed(() => cartStore.totalCartPrice);
const shippingCost = computed(() => cartStore.shippingCost);
const isLoading = ref(false);

const isLogged = () =>
  typeof localStorage !== "undefined" && localStorage.getItem("token") !== null;

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};

const getStockForItem = async (itemId) => {
  try {
    const response = await axios.get(
      `https://serverapi.up.railway.app/articles/${itemId}/showStock`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el stock del artículo:", error);
    return 0;
  }
};

const getStockForVisit = async (visitId) => {
  try {
    const response = await axios.get(
      `https://serverapi.up.railway.app/visits/${visitId}/showStockEntradas`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el stock de la visita:", error);
    return 0;
  }
};

const updateQuantity = async (id, quantity, type = "item") => {
  if (type === "item") {
    const articleStock = await getStockForItem(id);
    if (quantity >= 1 && quantity <= articleStock) {
      cartStore.updateItemQuantity(id, quantity);
    }
  } else if (type === "visit") {
    const visitStock = await getStockForVisit(id);
    if (quantity >= 1 && quantity <= visitStock) {
      cartStore.updateVisitQuantity(id, quantity);
    }
  }
};

const removeFromCart = (id, type = "item") => {
  if (type === "item") {
    cartStore.removeItem(id);
  } else if (type === "visit") {
    cartStore.removeVisit(id);
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
        `https://serverapi.up.railway.app/users/${user}/buy-articles`,
        articulos
      );
    }

    if (Object.keys(visitas).length > 0) {
      await axios.post(
        `https://serverapi.up.railway.app/users/${user}/buy-visits`,
        visitas
      );
    }

    clearCart();
    toast.success("Se ha realizado correctamente el pedido", {
      onClose: () => {
        window.location.href = "/";
      },
    });
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
</script>

<style>
.shopping-cart {
  padding: 16px;
}
.cart-item {
  margin-bottom: 16px;
}

@media (max-width: 767px) {
  .cart-item {
    padding: 1rem;
  }

  h1 {
    text-align: center;
  }

  th,
  td {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  img {
    height: 3rem;
    width: 3rem;
  }
}
</style>
