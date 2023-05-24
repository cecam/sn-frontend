<template>
    <v-container fluid fill-height >
        <v-row align="center" justify="center" class="ma-0 pa-0">
            <v-col cols="10" sm="6">
                <h1>Oops! no pudimos encontrar esta página</h1>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="ma-0 pa-0">
            <v-img src="/not-found.png" max-width="400" contain>
            </v-img>
        </v-row>
        <v-row align="center" justify="center" class="ma-0 pa-0">
            <v-col cols="5" sm="2" >
                <NuxtLink to="/" class="enlace">
                    Volver al inicio
                </NuxtLink>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    h1 {
        color: white;
        font-size: 35px;
        text-align: center;
    }
    .enlace {
        color: whitesmoke;
        font-size: 20px;
    }
</style>

