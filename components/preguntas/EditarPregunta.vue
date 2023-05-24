<template>
    <v-card> 
        <v-container fluid>
            <v-row align="center" justify="center">
                <h2>Edita tu pregunta</h2>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="10">
                    <v-text-field
                        v-model="preguntaEditada.pregunta"
                        label="Haz tu pregunta..."
                        name="respuesta"
                    />
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="10">
                    <v-textarea
                        name="descripcion"
                        filled
                        v-model="preguntaEditada.descripcion"
                        label="Escribe más detalles de tu pregunta"
                        auto-grow
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row align="center" justify="space-around">
                <v-col cols="10" sm="4">
                    <v-btn block color="red" @click="handleEditar()">
                        cancelar
                    </v-btn>
                </v-col>
                <v-col cols="10" sm="4">
                    <v-btn block color="success" @click="editarPregunta(preguntaEditada)" :loading="loading_btn">
                        editar pregunta
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        props: ['pregunta', 'editarPregunta', 'handleEditar', 'loading_btn'],
        data(){
            return {
                preguntaEditada: {
                    pregunta: this.pregunta.pregunta,
                    descripcion: this.pregunta.descripcion
                }
            }
        }   
    }
</script>