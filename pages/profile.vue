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
            <h1 class="headline">INFORMACIÓN PERSONAL</h1>
          </v-card-title>
          <v-card-text>
            <v-form class="space-y-4" lazy-validation>
              <v-text-field
                :rules="nombreRules"
                v-model="nombre"
                label="Nombre"
                outlined
                prepend-inner-icon="mdi-account-box"
                required
                dense
              >
              </v-text-field>

              <v-text-field
                :rules="nombreRules"
                v-model="apellidos"
                label="Apellidos"
                outlined
                prepend-inner-icon="mdi-account-box"
                required
                dense
              >
              </v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                outlined
                prepend-inner-icon="mdi-email"
                required
                dense
              >
              </v-text-field>

              <v-text-field
                v-model="cuenta_bancaria"
                :rules="cuentaBancariaRules"
                label="Cuenta bancaria"
                outlined
                prepend-inner-icon="mdi-bank"
                required
                dense
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
                rounded
                @click="editUser"
                >Editar perfil
              </v-btn>
            </v-card-actions>

            <v-card-actions class="btn">
              <v-btn
                color="primary"
                class="white--text"
                rounded
                href="/change-password"
                >Cambiar contraseña
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
const nombre = ref(null);
const apellidos = ref(null);
const email = ref(null);
const cuenta_bancaria = ref(null);
const errorMessage = ref(null);
let token = null;

if (process.client) {
  token = localStorage.getItem("token");
}

const nombreRules = [
  (value) => !!value || "Requerido",
  (value) => (value && value.length >= 3) || "Mínimo 3 caracteres",
  (value) => /^[^\d]+$/.test(value) || "No puede contener números",
];

const emailRules = [
  (value) => !!value || "El email es requerido",
  (value) => (value && value.length >= 3) || "Min 3 caracteres",
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

async function showUserInformation() {
  try {
    const response = await axios.post(
      "http://localhost:8080/pfc/users/userInformation",
      { token }
    );
    nombre.value = response.data.nombre;
    apellidos.value = response.data.apellidos;
    email.value = response.data.email;
    cuenta_bancaria.value = response.data.cuenta_bancaria;
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = "No se pudo cargar la información del usuario";
  }
}

async function editUser() {
  try {
    const userData = {
      nombre: nombre.value,
      apellidos: apellidos.value,
      email: email.value,
      cuenta_bancaria: cuenta_bancaria.value,
      token: token,
    };

    if (
      !userData.nombre ||
      !userData.apellidos ||
      !userData.email ||
      !userData.cuenta_bancaria
    ) {
      errorMessage.value = "Todos los campos son obligatorios";
      return;
    }

    const response = await axios.put(
      "http://localhost:8080/pfc/users/editUser",
      userData
    );
    successMessage.value = "¡El usuario se ha editado correctamente!";
    setTimeout(() => {
      successMessage.value = null;
      window.location.href = "/";
    }, 2000);
    return response.data;
  } catch (error) {
    errorMessage.value = "No se pudo editar el perfil";
    console.error("Error:", error);
  }
}

showUserInformation();
</script>

<style>
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
