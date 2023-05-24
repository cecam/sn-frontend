<template>
    <v-main> 
        <v-container fluid>
            <v-row align="center" justify="center"> 
                <h1>Mis documentos Comprados</h1>
            </v-row>
            <v-row align="center" justify="space-around"> 
                <v-col cols="12" sm="5" md="4" lg="3" v-for="(documento, index) in documentos" :key="index">
                    <Documento :apunte="documento" />
                </v-col>
            </v-row>
            <v-row justify="center" >
                <v-btn outlined color="green"
                    @click="cargarDocumentos()"  
                    v-if="!paginacionPosible"
                    :loading="btn_loading" 
                >
                    Ver mas publicaciones...
                </v-btn>
                <div v-else>
                    <h3 class="centrado">No hay más documentos guardados</h3>
                    <v-card-subtitle class="centrado"> Crea un nuevo documento o compra alguno nuevo</v-card-subtitle>
                    <v-btn outlined color="green" link to="/inicio">
                        encontrar documentos
                    </v-btn>
                    <v-btn outlined color="red" link to="/crear-documento">
                        crear un documento
                    </v-btn>
                </div>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
    import Documento from '@/components/documentos/Documento'

export default {
    layout: 'login',
    components: {
        Documento
    },
    data() {
        return {
            page : 1,
            loading: true,
            btn_loading: false,
            paginacionPosible: false,
            documentos: [],
        }
    },
    mounted(){
        this.cargarDocumentos();
    },
    head() {
        return {
            titleTemplate: `SN - Mis documentos guardados`
        }
    },
    methods: {
        async cargarDocumentos() {
            this.btn_loading = true
            try {
                const { data } = await this.$axios.get(`apuntes/${this.$auth.user._id}/documentos-guardados?page=${this.page}`)
                if(data.data.data.length > 0){
                    this.documentos = this.documentos.concat(data.data.data)
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