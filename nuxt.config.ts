import { hostAPI } from "./config/index";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: ((): any => {
    return {
      public: {
        hostAPI,
      },
    };
  })(),

  css: [
    "~/assets/css/tailwind.css",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "vue-toastification/dist/index.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt"],
  pinia: {
    storesDirs: ["stores"],
  },
  plugins: ["~/plugins/vue-toastification.js"],
});
