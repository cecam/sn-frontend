<template>
    <v-container fluid fill-height >
        <v-row align="center" justify="center" class="ma-0 pa-0">
            <v-col cols="11" sm="5">
                <h1>Oops! parece que algo salió mal</h1>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" >
            <v-img src="/algo-salio-mal.webp" max-width="350" contain>
            </v-img>
        </v-row>
        <v-row align="center" justify="center" class="ma-0 pa-0">
            <v-col cols="7" sm="3" >
                <NuxtLink to="/login" class="enlace">
                    Intenta iniciando sesión
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

