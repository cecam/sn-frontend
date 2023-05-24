<template>
    <v-card> 
        <v-container fluid>
            <v-row justify="center">
                <v-col sm="8">
                    <v-text-field
                        v-model="contenido"
                        label="Da tu respuesta..."
                        name="respuesta"
                    />
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col sm="8">
                    <v-btn block dark
                        :loading="loading_respuesta"
                        @click="enviarRespuesta()"  
                        color="#013c8a"
                    >
                        Responder
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        props : ['preguntaID','guardarRaspuesta', 'loading_respuesta'],
        data() {
            return {
                contenido : ''
            }
        },
        methods: {
            enviarRespuesta() {
                this.guardarRaspuesta(this.contenido)
                this.contenido = ''
            }
        }
    }
</script>