<template>
    <v-container fluid class="contenido">
        <v-row align="center" justify="space-around" > 
            <v-col cols="12" sm="5" md="4">
                <v-container fluid> 
                    <v-row justify="center"> 
                        <h2 class="titulo">Estudia</h2>
                    </v-row>
                    <v-row justify="center"> 
                        <v-icon style="font-size:50px;" color="#00cba0">mdi-book-open-variant</v-icon>
                    </v-row>
                    <v-row justify="center"> 
                        <p class="descripcion">
                            Será como compartir una clase con estudiantes de diversas universidades
                        </p>
                    </v-row>
                </v-container>
            </v-col>  
            <v-col cols="12" sm="5" md="4">
                <v-container fluid> 
                    <v-row justify="center"> 
                        <h2 class="titulo">Comparte</h2>
                    </v-row>
                    <v-row justify="center"> 
                        <v-icon style="font-size:50px;" color="#00cba0">mdi-share</v-icon>
                    </v-row>
                    <v-row justify="center"> 
                        <p class="descripcion">
                            Seguro sabes algo que alguien necesita y necesitas algo que otra persona sabe. Nada mejor que aprender en grupo
                        </p>
                    </v-row>
                </v-container>
            </v-col>  
            <v-col cols="12" sm="5" md="4">
                <v-container fluid> 
                    <v-row justify="center"> 
                        <h2 class="titulo">¡Monetiza!</h2>
                    </v-row>
                    <v-row justify="center"> 
                        <v-icon style="font-size:50px;" color="#00cba0">mdi-cash-usd-outline</v-icon>
                    </v-row>
                    <v-row justify="center"> 
                        <p class="descripcion">
                            Nunca había sido tan fácil ganar dinero mientras aprendes y enseñas lo que sabes
                        </p>
                    </v-row>
                </v-container>
            </v-col>  
        </v-row>   
    </v-container>
</template>

<style scoped>
    .contenido {
        background-color: #333;
    }
    .titulo , .descripcion {
        color: whitesmoke;
        text-align: center;
    }
</style>

