<template>
  <v-container fluid class="d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="formulario" elevation="5" style="min-height: 400px">
          <v-card-title class="text-center">
            <h1 class="headline">INICIO DE SESIÓN</h1>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="loginUser" ref="loginForm" lazy-validation>
              
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
                v-model="contrasenya"
                :rules="contrasenyaRules"
                label="Contraseña"
                outlined
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showContrasenya ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showContrasenya ? 'text' : 'password'"
                @click:append-inner="showContrasenya = !showContrasenya"
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
                @click="loginUser"
                rounded
              >
                Iniciar sesión
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

const email = ref(null);
const contrasenya = ref(null);
const showContrasenya = ref(false);
const errorMessage = ref(null);

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

const loginUser = async () => {
  const userData = {
    email: email.value,
    contrasenya: contrasenya.value,
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/pfc/users/loginUser",
      userData
    );
    localStorage.setItem("token", response.data.token);
    window.location.href = "/";
  } catch (error) {
    errorMessage.value = "El email o la contraseña son incorrectos";
    console.error("Error:", error);
  }
};
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
</style>
