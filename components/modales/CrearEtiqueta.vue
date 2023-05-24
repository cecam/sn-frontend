<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="480"
    >
      <template v-slot:activator="{ on, attrs }">
        <p class="titulo">¿No encuentras la etiqueta adecuada?
          <span v-bind="attrs" v-on="on" class="activador">¡Crea una!</span>
        </p>

      </template>
      <v-card>
        <v-container fluid>
          <v-row class="pl-5 pr-5">
            <h3>Nombra a la nueva etiqueta</h3>
            <v-spacer></v-spacer>
            <v-btn icon @click="cancelar()">
              <v-icon color="#cb4040">mdi-close-thick</v-icon>
            </v-btn>
          </v-row>
        </v-container>
        <v-container>
            <v-text-field
                v-model="nombreEtiqueta"
                label="Nombre de la etiqueta"
                name="etiqueta"
            />
        </v-container>
        <v-card-actions>
          <v-btn block dark
            color="#40cb4d"
            v-if="nombreEtiqueta"
            @click="crear()"
          >
            Crear
          </v-btn>
          <v-btn disabled block v-else>
            crear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['crearEtiqueta'],
    data () {
      return {
        dialog: false,
        nombreEtiqueta: ''
      }
    },
    methods: {
        cancelar() {
            this.nombreEtiqueta = ''
            this.dialog = false
        },
        crear() {
            this.crearEtiqueta(this.nombreEtiqueta)
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