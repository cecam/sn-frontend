<template>
    <v-container fluid class="descripciones">
        <v-row align="center" justify="start">
            <v-col cols="12" md="7">
                <v-row align="center" justify="center" class="ml-5">
                    <v-col cols="3" sm="2">
                        <v-img max-width="90" src="/gratis.png"/>
                    </v-col>
                    <v-col cols="12" sm="9">
                        <v-row align="center" justify="center">
                            <h2 class="texto">Descarga todos los apuntes completamente GRATIS</h2>
                        </v-row>
                        <v-row align="center" justify="center">
                            <p class="texto">
                                Los podrás encontrar organizados por categorías y ver las referencias del autor
                            </p>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row align="center" justify="end" class="mr-5">
            <v-col cols="12" md="6">
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="9">
                        <v-row align="center" justify="center">
                            <h2 class="texto">Comparte tus dudas y resuelve las de otros</h2>
                        </v-row>
                        <v-row align="center" justify="center">
                            <p class="texto">
                                Si tienes preguntas sobre un tema, pregunta a la comunidad.
                            </p>
                        </v-row>
                    </v-col>
                    <v-col cols="3" sm="2">
                        <v-img max-width="90" src="/conversacion.png"/>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    .descripciones {
        background-color: #b5b5b5;
    }
    .texto {
        text-align: center;
    }
</style>
