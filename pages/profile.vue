<template>
  <v-container fluid class="d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="formulario" elevation="5" style="min-height: 400px;">
          <v-card-title class="text-center">
            <h1 class="headline">INFORMACIÓN PERSONAL</h1>
          </v-card-title>
          <v-card-text>
            <v-form class="space-y-4" lazy-validation>
              <v-text-field label="Nombre" outlined prepend-inner-icon="mdi-account-box" required dense>
              </v-text-field>

              <v-text-field label="Apellidos" outlined prepend-inner-icon="mdi-account-box" required dense>
              </v-text-field>

              <v-text-field v-model="email" :rules="emailRules" label="Email" outlined prepend-inner-icon="mdi-email"
                required dense>
              </v-text-field>

              <v-text-field v-model="contrasenya" :rules="contrasenyaRules" label="Contraseña" outlined
                prepend-inner-icon="mdi-lock" :append-inner-icon="showContrasenya ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showContrasenya ? 'text' : 'password'" @click:append-inner="showContrasenya = !showContrasenya"
                required dense>
              </v-text-field>
            </v-form>

            <v-card-actions class="btn">
              <v-btn color="primary" class="white--text" rounded>Editar perfil</v-btn>
            </v-card-actions>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const contrasenya = ref('');
const showContrasenya = ref(false);
const errorMessage = ref('');

const emailRules = [
  (value) => !!value || 'El email es requerido',
  (value) => (value && value.length >= 3) || 'Min 3 caracteres',
  (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Email no válido.';
  },
];

const contrasenyaRules = [
  (value) => !!value || 'La contraseña es requerida',
  (value) => (value && value.length >= 5) || 'Debe tener al menos 5 caracteres',
  (value) => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value) || 'Debe contener al menos una letra y un número',
];
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
</style>