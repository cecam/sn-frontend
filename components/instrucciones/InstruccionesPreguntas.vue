<template>
    <v-card elevation="10"> 
        <v-container  fluid>
            <v-row>
                <v-container>
                    <v-row justify="center" > 
                        <h1 class="titulo">Resuelve las dudas de tus materias</h1>
                    </v-row>
                </v-container>
            </v-row>
            <v-row justify="space-around"> 
                <v-col cols="12" sm="5" md="4">
                    <v-container fluid> 
                        <v-row justify="center"> 
                            <p class="subtitulo">Haz una pregunta</p>
                        </v-row>
                        <v-row justify="center"> 
                            <v-icon style="font-size:50px;" color="#00cba0">mdi-comment-question-outline</v-icon>
                        </v-row>
                        <v-row justify="center"> 
                            <v-card-subtitle class="text-center">
                                Pregunta a la comunidad de tu materia y tema a cambio de clips
                            </v-card-subtitle>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="12" sm="5" md="4">
                    <v-container fluid> 
                        <v-row justify="center"> 
                            <p class="subtitulo">La comunidad te apoya</p>
                        </v-row>
                        <v-row justify="center"> 
                            <v-icon style="font-size:50px;" color="#00cba0">mdi-account-group</v-icon>
                        </v-row>
                        <v-row justify="center"> 
                            <v-card-subtitle class="text-center">
                                Recibe respuestas de parte de toda la comunidad y valida la mejor respuesta
                            </v-card-subtitle>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="12" sm="5" md="4">
                    <v-container fluid> 
                        <v-row justify="center"> 
                            <p class="subtitulo">Gana Clips</p>
                        </v-row>
                        <v-row justify="center"> 
                            <v-icon style="font-size:50px;" color="#00cba0">mdi-paperclip</v-icon>
                        </v-row>
                        <v-row justify="center"> 
                            <v-card-subtitle class="text-center">
                                !Si tu respuesta es la mejor, obtendrás puntos como premio!
                            </v-card-subtitle>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="10"> 
                    <v-btn block dark 
                        color="#013c8aa1" 
                        href="/preguntas/nueva-pregunta"
                    >
                        haz una pregunta
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .titulo, .subtitulo {
        text-align: center;
    }
    .subtitulo {
        font-size: 20px;
    }
</style>