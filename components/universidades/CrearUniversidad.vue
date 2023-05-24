<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <p class="titulo">¿No encuentras tu universidad? 
          <span v-bind="attrs" v-on="on" class="activador">¡Crea una!</span>
        </p>

        
      </template>
      <v-card>
        <v-card-title>Escribe el nombre completo de tu universidad</v-card-title>
        <v-container>
            <v-text-field
                v-model="nombreUniversidad"
                label="Nombre de la Universidad"
                name="universidad"
            />
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="cancelar()"
          >
            Cancelar
          </v-btn>
          <v-btn text
            color="green darken-1"
            :disabled ="nombreUniversidad == ''"
            @click="crear()"
          >
            Crear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['crearUniversidad'],
    data () {
      return {
        dialog: false,
        nombreUniversidad: ''
      }
    },
    methods: {
        cancelar() {
            this.nombreUniversidad = ''
            this.dialog = false
        },
        crear() {
            this.crearUniversidad(this.nombreUniversidad)
            this.nombreUniversidad= ''
            this.dialog = false
        }
    }
  }
</script>

<style scoped>
  .titulo{
    font-size: 13px;
    text-align:center;
  }
  .activador {
    color: #013c8a;
  }
</style>