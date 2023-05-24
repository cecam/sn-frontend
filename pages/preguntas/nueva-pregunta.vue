<template>
    <v-main>
        <v-container> 
            <v-row align="center" justify="center">
                <v-col sm="10">
                    <v-card elevation="5" class="pt-4"> 
                        <h1 class="text-center">Envía tu pregunta a la comunidad</h1>
                        <v-container fluid>
                            <v-row align="center" justify="center">
                                <v-col sm="12" md="10"> 
                                    <NuevaPregunta :etiquetas="etiquetasAsync"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
    import NuevaPregunta from '@/components/preguntas/NuevaPregunta'

    export default {
        layout: 'login',
        components: {
            NuevaPregunta
        },
        async asyncData ({ $axios, params }) {
            const { data } = await $axios.get(`etiquetas`)
            return { etiquetasAsync: data.data }
        },
        head() {
            return {
                titleTemplate: `SN - Preguntas`
            }
        },
        
    }
</script>