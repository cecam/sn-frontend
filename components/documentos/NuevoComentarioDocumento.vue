<template>
    <v-card> 
        <v-container fluid>
            <v-row justify="center">
                <v-col sm="8">
                    <v-text-field
                        v-model="contenido"
                        label="Da tu opinión..."
                        name="comentario"
                        @keyup.enter="crearComentario()"
                    />
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col sm="8">
                    <v-btn block
                        :dark="!contenido == ''"
                        @click="crearComentario()"
                        color="#40cb4d"
                        :disabled="!contenido"
                        :loading="loading"
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
        props : ['guardarComentario', 'loading'],
        data() {
            return {
                contenido : ''
            }
        },
        methods: {
            crearComentario() {
                this.guardarComentario(this.contenido)
                this.contenido = ''
            }
        }
    }
</script>