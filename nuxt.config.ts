import { hostAPI } from "./config/index";
import vueToastification from "./plugins/vue-toastification";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: ((): any => {
    return {
      public: {
        hostAPI,
      },
    };
  })(),

  app: {
    head: {
      title: "FUTBOLMANÍA VINTAGE",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content: "TiendaFutbol",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/jugador-de-futbol.png",
        },
      ],
    },
  },

  css: [
    "~/assets/css/tailwind.css",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "vue-toastification/dist/index.css",
  ],

  build: {
    transpile: ["vuetify", "vue-toastification"],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate", "mapActions"],
      },
    ],
  ],

  pinia: {
    storesDirs: ["stores"],
  },

  plugins: [{ src: "~/plugins/vue-toastification.js", mode: "client" }],
  compatibilityDate: "2025-01-09",
});