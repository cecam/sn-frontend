<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <p class="titulo">¿No encuentras tu carrera?
          <span v-bind="attrs" v-on="on" class="activador">¡Crea una!</span>
        </p>

        
      </template>
      <v-card>
        <v-card-title>Escribe el nombre completo de tu carrera</v-card-title>
        <v-container>
            <v-text-field
                v-model="nombreCarrera"
                label="Nombre de la carrera"
                name="etiqueta"
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
            :disabled ="nombreCarrera == ''"
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
    props: ['crearCarrera'],
    data () {
      return {
        dialog: false,
        nombreCarrera: ''
      }
    },
    methods: {
        cancelar() {
            this.nombreCarrera = ''
            this.dialog = false
        },
        crear() {
            this.crearCarrera(this.nombreCarrera)
            this.nombreCarrera= ''
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