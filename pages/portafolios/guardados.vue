<template>
    <v-main> 
        <v-container fluid>
            <v-row align="center" justify="center"> 
                <h1>Mis Portafolios Guardados</h1>
            </v-row>
            <v-row align="center" justify="space-around"> 
                <v-col cols="12" sm="5" md="4" lg="3" v-for="(portafolio, index) in portafolios" :key="index">
                    <Portafolio :portafolio="portafolio" />
                </v-col>
            </v-row>
            <v-row justify="center" >
                <v-btn outlined color="green"
                    @click="cargarPortafolios()"  
                    v-if="!paginacionPosible"
                    :loading="btn_loading" 
                >
                    Ver mas publicaciones...
                </v-btn>
                <div v-else>
                    <h3 class="centrado">No hay más portafolios guardados</h3>
                    <v-card-subtitle class="centrado"> Crea un nuevo portafolio o guarda uno.</v-card-subtitle>
                    <!--v-btn outlined color="green" link to="/inicio">
                        encontrar portafolios
                    </v-btn-->
                    <v-btn outlined color="red" link to="/portafolios/crear">
                        crear un portafolio
                    </v-btn>
                </div>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
    import Portafolio from '@/components/portafolios/Portafolio'

export default {
    layout: 'login',
    components: {
        Portafolio
    },
    data() {
        return {
            page : 1,
            loading: true,
            btn_loading: false,
            paginacionPosible: false,
            portafolios: [],
        }
    },
    mounted(){
        this.cargarPortafolios();
    },
    head() {
        return {
            titleTemplate: `SN - Portafolios Guardados`
        }
    },
    methods: {
        async cargarPortafolios() {
            this.btn_loading = true
            try {
                const { data } = await this.$axios.get(`mis-portafolios/${this.$auth.user._id}?page=${this.page}`)
                if(data.data.data.length > 0){
                    this.portafolios = this.portafolios.concat(data.data.data)
                    this.page = this.page + 1
                } else {
                    this.paginacionPosible = true
                }
            } catch( e ) {
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
            this.btn_loading = false
        },
    }
}
</script>

<style scoped>
    .centrado {
        text-align: center;
    }
</style>