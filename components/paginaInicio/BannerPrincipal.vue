<template>
    <v-container fluid class="fill-height contenedor">
        <v-row align-self="center" justify="space-around"> 
            <v-col cols="10" sm="11" md="6" class="d-flex align-center">
                <vue-typed-js 
                    :strings="['GANA DINERO CON SÓLO TUS APUNTES' ,'MEJORA TUS CALIFICACIONES']"
                    :typeSpeed="50"
                    :startDelay="1000"
                    :loop="true"
                >
                    <h1 class="titulo">  
                        <span class="typing titulo"></span>
                    </h1>
                </vue-typed-js>
            </v-col>
            <v-col cols="9" sm="6" md="3">
                <v-img src="/logo-completo.png" max-width="375" contain />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    .contenedor {
        background: linear-gradient(90deg, rgba(0,38,89,1) 0%, rgba(0,109,254,1) 100%);
    }
    .centrado-vertical {
        line-height: 500%;
    }
    .titulo {
        color: whitesmoke;
        font-size: 50px;
        text-align: start;
    }
    @media only screen and (max-width: 960px) {
        .titulo {
            font-size: 30px;
        }
        .contenedor {
            background: linear-gradient(180deg, rgba(0,38,89,1) 0%, rgba(0,109,254,1) 100%);
        }
    }
    @media only screen and (max-width: 600px) {
        .titulo {
            font-size: 20px;
            text-align: center;
        }
        .contenedor {
            background: linear-gradient(180deg, rgba(0,38,89,1) 0%, rgba(0,109,254,1) 100%);
        }
    }
</style>