<template>
  <v-container fluid class="d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
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
            </v-form>

            <v-card-actions class="btn">
              <v-btn
                color="primary"
                class="white--text"
                rounded
                @click="editarPerfil"
                >Editar perfil</v-btn
              >
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

const nombre = ref(null);
const apellidos = ref(null);
const email = ref(null);
const contrasenya = ref(null);
const showContrasenya = ref(false);
const errorMessage = ref(null);

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

const contrasenyaRules = [
  (value) => !!value || "La contraseña es requerida",
  (value) => (value && value.length >= 5) || "Debe tener al menos 5 caracteres",
  (value) =>
    /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value) ||
    "Debe contener al menos una letra y un número",
];

async function obtenerInformacionUsuario() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://localhost:8080/pfc/users/userInformation",
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    nombre.value = response.data.nombre;
    apellidos.value = response.data.apellidos;
    email.value = response.data.email;
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = "No se pudo cargar la información del usuario";
  }
}

/*async function editarPerfil() {
  try {
    const response = await axios.put("http://localhost:8080/pfc/users/editProfile", {
      // Aquí incluye los datos actualizados del usuario
      nombre: nombre.value,
      apellidos: apellidos.value,
      email: email.value,
      // No se recomienda enviar la contraseña por motivos de seguridad
      // contrasenya: contrasenya.value,
      // token: tuTokenDeAutenticacion
    });
    // Manejar la respuesta del servidor según sea necesario
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = "No se pudo editar el perfil";
  }
}*/

obtenerInformacionUsuario();
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
