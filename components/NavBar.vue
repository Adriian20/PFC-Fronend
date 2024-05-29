<template>
  <Disclosure as="nav" class="mb-16 bg-green-700" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Abrir Menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-green-900 text-white'
                    : 'text-gray-50 hover:bg-green-800 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div
            @mouseenter="showCartDropdown"
            @mouseleave="hideCartDropdown"
            class="relative"
          >
            <NuxtLink to="/shopping-cart">
              <button
                type="button"
                class="relative rounded-full bg-green-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-green-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Carrito de compras</span>
                <ShoppingCartIcon class="h-6 w-6" aria-hidden="true" />
                <!-- Badge -->
                <span
                  v-if="cartItemCount > 0"
                  class="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[24px] min-h-[24px]"
                >
                  {{ cartItemCount }}
                </span>
              </button>
            </NuxtLink>
            <!-- Dropdown -->
            <div
              v-if="cartDropdownVisible"
              class="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
            >
              <div class="p-4">
                <h3 class="text-lg font-semibold">Resumen del Carrito</h3>
                <div v-if="cartItems.length > 0">
                  <div
                    v-for="item in cartItems"
                    :key="item.id"
                    class="flex items-center justify-between py-2"
                  >
                    <div>
                      <h4 class="text-sm font-medium">{{ item.nombre }}</h4>
                      <p class="text-sm text-gray-500">
                        Cantidad: {{ item.quantity }}
                      </p>
                    </div>
                    <img
                      :src="getImageUrl(item.img)"
                      alt=""
                      class="w-12 h-12 object-cover rounded-md"
                    />
                  </div>
                  <NuxtLink
                    to="/shopping-cart"
                    class="block mt-4 text-center text-green-600 hover:underline"
                  >
                    Ver Carrito
                  </NuxtLink>
                </div>
                <div v-else>
                  <p class="text-sm text-gray-500">El carrito está vacío.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative rounded-full bg-green-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-green-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Abri menu de usuario</span>
                <UserIcon class="h-6 w-6" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }" v-if="!isLogged()">
                  <a
                    href="/login"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Iniciar Sesión</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }" v-if="!isLogged()">
                  <a
                    href="/register"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Registrarse</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }" v-if="isLogged()">
                  <a
                    href="/profile"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Tú Perfil</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }" v-if="isLogged()">
                  <a
                    href="/"
                    @click="logout()"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Cerrar Sesión</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-green-900 text-white'
              : 'hover:bg-green-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import axios from "axios";
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const cartItemCount = computed(() => cartStore.cartItemCount);
const cartItems = computed(() => cartStore.cartItems);

const navigation = [
  { name: "Página de inicio", href: "/", current: true },
  { name: "Categorías", href: "/categories", current: false },
  { name: "Artículos", href: "/articles", current: false },
  { name: "Visitas", href: "/visits", current: false },
];

const isLogged = () =>
  typeof localStorage !== "undefined" && localStorage.getItem("token") !== null;

const logout = async () => {
  try {
    const token = {
      token: localStorage.getItem("token"),
    };
    await axios.post("http://localhost:8080/pfc/users/logoutUser", token);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    cartStore.clearLocalStorage();
  } catch (error) {
    console.error("Error:", error);
  }
};

const cartDropdownVisible = ref(false);

const showCartDropdown = () => {
  cartDropdownVisible.value = true;
};

const hideCartDropdown = () => {
  cartDropdownVisible.value = false;
};

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};

onMounted(() => {
  cartStore.initializeCart();
});
</script>

<style>
.cart-icon {
  position: relative;
  display: inline-block;
}

.cart-image {
  width: 24px;
  height: 24px;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}
</style>
