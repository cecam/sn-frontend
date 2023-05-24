<template>
    <v-main> 
        <v-container fluid class="ma-0 pa-0">
            <v-row justify="center" align="center"> 
                <v-col cols="12" sm="3"> 
                    <v-container fluid>
                        <v-row justify="center">
                            <v-avatar size="150">
                                <img
                                    :src="`${documento.user.img_perfil}`"
                                    :alt="`${documento.user.name} - SchoolNotes`"
                                >
                            </v-avatar>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="9" md="5" > 
                    <v-container fluid> 
                        <v-row align="center">
                            <h2>{{documento.user.name}}</h2>
                        </v-row>
                        <v-row align="center">
                            <h1 style="font-size: 45px;">{{documento.titulo}}</h1>
                        </v-row>
                    </v-container>
                    <v-card-title> </v-card-title>
                </v-col>
                <v-col xs="1" cols="1">
                    <v-icon>mdi-heart-outline</v-icon>
                    {{documento.reacciones.length}}
                </v-col>
            </v-row>
            <v-row justify="center" align="center"> 
                <v-col cols="12" md="5" >
                    <v-img
                        contain
                        max-height="300" 
                        :src="documento.img_destacada"
                    />
                </v-col>
                <v-col cols="12" md="6">
                    <Descripcion :descripcion="documento.descripcion" />
                </v-col>
            </v-row>
            <v-divider> </v-divider>
            <Ventajas />
            <Descripciones />
            <RegistroDirecto :etiquetas="etiquetas" />
        </v-container>
    </v-main>
</template>

<script>
    import Descripcion from '@/components/descripcion/Descripcion'
    import Ventajas from '@/components/paginaInicio/Ventajas'
    import Descripciones from '@/components/paginaInicio/Descripciones'
    import RegistroDirecto from '@/components/paginaInicio/RegistroDirecto'

    export default {
        layout: "noLogin",
        components: {
            Descripcion,
            RegistroDirecto,
            Descripciones,
            Ventajas,
        },
        head() {
            return {
                titleTemplate: `SN - ${this.documento.titulo}`
            }
        },
        beforeMount(){
            if(this.$auth.loggedIn){
                this.$router.push(`/apuntes/${this.documento.slug}`)
            }
        },
        async asyncData ({ $axios, params }) {
            const { data } = await $axios.get(`apuntes/${params.slug}`)
            const etiquetas = await $axios.get(`etiquetas`)
            return { documento: data.data , etiquetas : etiquetas.data.data }
        },
    }
</script>

<style scoped>
    .textoCompra {
        font-size: 20px;
        text-align: center;
    }
</style>