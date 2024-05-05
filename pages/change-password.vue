<template>
  <v-container fluid class="d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-alert
          v-if="successMessage"
          v-model="successMessage"
          timeout="2000"
          color="success"
          dense
          class="alertEdit"
        >
          {{ successMessage }}
        </v-alert>

        <v-card class="formulario" elevation="5" style="min-height: 400px">
          <v-card-title class="text-center">
            <h1 class="headline">CAMBIAR CONTRASEÑA</h1>
          </v-card-title>
          <v-card-text>
            <v-form
              @submit.prevent="changePassword"
              ref="loginForm"
              lazy-validation
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                outlined
                prepend-inner-icon="mdi-account-circle"
                required
                dense
              >
              </v-text-field>

              <v-text-field
                :rules="contrasenyaRules"
                v-model="contrasenya"
                :type="showContrasenya[0] ? 'text' : 'password'"
                label="Contraseña"
                outlined
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="
                  showContrasenya[0] ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append-inner="toggleShowContrasenya(0)"
              >
              </v-text-field>

              <v-text-field
                :rules="contrasenyaMatchRules"
                v-model="confirmContrasenya"
                :type="showContrasenya[1] ? 'text' : 'password'"
                label="Repita la Contraseña"
                outlined
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="
                  showContrasenya[1] ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append-inner="toggleShowContrasenya(1)"
              >
              </v-text-field>

              <v-alert v-if="errorMessage" type="error" dense>
                {{ errorMessage }}
              </v-alert>
            </v-form>
            <v-card-actions class="btn">
              <v-btn
                color="primary"
                class="white--text"
                @click="changePassword"
                rounded
              >
                Cambiar contraseña
              </v-btn>
            </v-card-actions>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const successMessage = ref(null);
const showContrasenya = ref([false, false]);
const email = ref(null);
const contrasenya = ref(null);
const confirmContrasenya = ref(null);
const errorMessage = ref(null);
let token = null;

if (process.client) {
  token = localStorage.getItem("token");
}

const emailRules = [
  (value) => !!value || "El email es requerido",
  (value) => (value && value.length >= 3) || "Min 3 caracteres",
  (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Email no válido.";
  },
];

const contrasenyaRules = [
  (value) => !!value || "La contraseña es requerida",
  (value) => (value && value.length >= 5) || "Debe tener al menos 5 caracteres",
  (value) =>
    /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value) ||
    "Debe contener al menos una letra y un número",
];

const contrasenyaMatchRules = [
  (value) => !!value || "Requerido",
  (value) => value === contrasenya.value || "Las contraseñas no coinciden",
  (value) =>
    /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value) ||
    "Debe contener al menos una letra y un número",
];

function toggleShowContrasenya(index) {
  showContrasenya.value[index] = !showContrasenya.value[index];
}

async function changePassword() {
  try {
    const response = await axios.put(
      "http://localhost:8080/pfc/users/changePassword",
      { contrasenya: contrasenya.value, token }
    );
    successMessage.value = "¡Tu contraseña se ha cambiado correctamente!";
    setTimeout(() => {
      successMessage.value = null;
      window.location.href = "/";
    }, 2000);
    return response.data;
  } catch (error) {
    errorMessage.value = "No se pudo cambiar la contraseña";
    console.error("Error:", error);
  }
}

async function showUserInformation() {
  try {
    const response = await axios.post(
      "http://localhost:8080/pfc/users/userInformation",
      { token }
    );
    email.value = response.data.email;
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = "No se pudo cargar la información del usuario";
  }
}

showUserInformation();
</script>

<style scoped>
.formulario {
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
}

.btn {
  display: flex;
  justify-content: center;
}

.v-text-field {
  margin-bottom: 24px;
}

.v-btn {
  width: 100%;
}

.alertEdit { 
  margin-bottom: 24px; 
  text-align: center;
  font-size: 18px;
}
</style>
