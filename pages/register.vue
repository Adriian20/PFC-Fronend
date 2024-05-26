<template>
  <v-card class="formulario" elevation="5">
    <v-card-title class="pb-0">
      <h1 class="headline">REGISTRO</h1>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="registerUser">
        <v-text-field
          :rules="nombreRules"
          v-model="nombre"
          label="Nombre"
          outlined
          prepend-inner-icon="mdi-account"
        >
        </v-text-field>

        <v-text-field
          :rules="nombreRules"
          v-model="apellidos"
          label="Apellidos"
          outlined
          prepend-inner-icon="mdi-account"
        >
        </v-text-field>

        <v-text-field
          :rules="emailRules"
          v-model="email"
          label="Email"
          outlined
          prepend-inner-icon="mdi-email"
        >
        </v-text-field>

        <v-text-field
          :rules="cuentaBancariaRules"
          v-model="cuenta_bancaria"
          label="Cuenta bancaria"
          outlined
          prepend-inner-icon="mdi-bank"
        >
        </v-text-field>

        <v-text-field
          :rules="contrasenyaRules"
          v-model="contrasenya"
          :type="showContrasenya[0] ? 'text' : 'password'"
          label="Contraseña"
          outlined
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showContrasenya[0] ? 'mdi-eye' : 'mdi-eye-off'"
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
          :append-inner-icon="showContrasenya[1] ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="toggleShowContrasenya(1)"
        >
        </v-text-field>

        <v-alert v-if="errorMessage" type="error" dense>
          {{ errorMessage }}
        </v-alert>
      </v-form>
    </v-card-text>
    <v-card-actions class="btn">
      <v-btn
        :disabled="!isRegisterFormValid"
        color="primary"
        @click="registerUser"
        >REGISTRARSE</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const showContrasenya = ref([false, false]);
const errorMessage = ref(null);

const nombre = ref(null);
const apellidos = ref(null);
const email = ref(null);
const contrasenya = ref(null);
const confirmContrasenya = ref(null);
const cuenta_bancaria = ref(null);

const nombreRules = [
  (value) => !!value || "Requerido",
  (value) => (value && value.length >= 3) || "Mínimo 3 caracteres",
  (value) => /^[^\d]+$/.test(value) || "No puede contener números",
];

const emailRules = [
  (value) => !!value || "Requerido",
  (value) => (value && value.length >= 3) || "Mínimo 3 caracteres",
  (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Email no válido.";
  },
];

const cuentaBancariaRules = [
  (value) => !!value || "Requerido",
  (value) =>
    /^[A-Za-z]{2}\d{20}$/.test(value) ||
    "El número de cuenta debe tener el formato correcto (dos letras seguidas de 20 dígitos)",
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

function isRegisterFormValid() {
  return (
    !!nombre.value &&
    !!apellidos.value &&
    !!email.value &&
    !!contrasenya.value &&
    !!confirmContrasenya.value
  );
}

async function registerUser() {
  const userData = {
    nombre: nombre.value,
    apellidos: apellidos.value,
    email: email.value,
    cuenta_bancaria: cuenta_bancaria.value,
    contrasenya: contrasenya.value,
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/pfc/users/register",
      userData
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.id);
    window.location.href = "/";
  } catch (error) {
    errorMessage.value = "El email o la contraseña son incorrectos";
    console.error("Error:", error);
  }
}

function toggleShowContrasenya(index) {
  showContrasenya.value[index] = !showContrasenya.value[index];
}
</script>

<style scoped>
.formulario {
  margin: 80px auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 800px;
  width: 700px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.v-btn {
  width: 100%;
}
</style>
