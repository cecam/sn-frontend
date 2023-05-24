<template>
    <v-container fluid class="monetizacion">
        <v-row justify="space-around" align="center">
            <v-col cols="10" md="4">
                <v-img
                    src="/estudiante.png"
                    contain
                ></v-img>
            </v-col>
            <v-col cols="10" md="6">
                <v-row justify="center" align="center">
                    <h2 class="texto">Sube apuntes y genera un ingreso</h2><br>
                </v-row>
                <v-row justify="center" align="center">
                    <p class="texto">
                        ¡Recibirás dinero tan sólo por compartir tus apuntes y por cada descarga del mismo!
                    </p>
                </v-row>
                <v-row justify="center" align="center">
                    <v-btn color="#013c8ac4" dark rounded
                        link to="/registro"
                    >
                        quiero compartir mis apuntes
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .monetizacion {
        background-color: #696969;
    }
    .texto {
        text-align: center;
        color: rgb(224, 224, 224);
    }
</style>