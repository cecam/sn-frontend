<template>
<v-main>
    <v-container
        class="fill-height"
        fluid
    >
        <v-row> 
            <v-tabs v-model="tab" grow> 
                <v-tab>Documentos</v-tab>
                <v-tab>Publicaciones</v-tab>
            </v-tabs>
        </v-row>
        <v-tabs-items v-model="tab">
            <v-tab-item style="width : 100vw">
                <v-container fluid>
                    <v-row align="center" justify="space-around" >
                        <v-col sm="12" md="10">
                            <h1 style="text-align:center;">Estos documentos podrían interesarte...</h1>
                        </v-col>
                        <v-col sm="12" lg="5" v-if="documentos.length == 0">
                            <v-card-title >
                                Vaya, parece que aún no hay documentos con las etiquetas que elegiste
                            </v-card-title>
                        </v-col>
                        <v-col sm="12" lg="5" v-else
                            v-for="(documento, index) in documentos" :key="index" 
                        >
                            <Documento :apunte="documento" />                            
                        </v-col>
                    </v-row> 
                    <v-row justify="center" >
                        <v-btn outlined color="green"
                            @click="cargarDocumentos()"  
                            v-if="!paginacionPosibleDocumentos"
                            :loading="btn_loadingDocumentos" 
                        >
                            Ver mas documentos...
                        </v-btn>
                        <h3 v-else>No hay más documentos para mostrar</h3>
                    </v-row>
                </v-container>
            </v-tab-item>
            <v-tab-item style="width : 100vw">
                <v-container fluid>
                    <v-row align="center" justify="space-around" >
                        <v-col sm="11" md="10">
                            <NuevaPublicacion />              
                        </v-col>
                        <v-col sm="11" lg="5"
                            v-for="(publicacion, index) in publicaciones" :key="index"
                        >
                            <Publicacion 
                                :publicacion="publicacion" 
                                :indice="index"   
                            />
                            
                        </v-col>
                    </v-row> 
                    <v-row justify="center" >
                        <v-btn outlined color="green"
                            @click="cargarPublicaciones()"  
                            v-if="!paginacionPosible"
                            :loading="btn_loading" 
                        >
                            Ver mas publicaciones...
                        </v-btn>
                        <h3 v-else>No hay más publicaciones para mostrar</h3>
                    </v-row>
                </v-container>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</v-main>
</template>

<script>
    import Publicacion from '@/components/publicaciones/Publicacion'
    import NuevaPublicacion from '@/components/publicaciones/NuevaPublicacion'
    import Documento from '@/components/documentos/Documento'
    
    export default {
        components: {
            NuevaPublicacion,
            Publicacion,
            Documento
        },
        data () {
            return {
                info : {},
                loading: true,
                btn_loading: false,
                tab : '',
                btn_loadingDocumentos: false,
                paginacionPosibleDocumentos : false,
                page : 2
            }
        },
        async asyncData ({ store, $axios, $auth }) {
            await store.dispatch('publicaciones/GET_PRIMER_PUBLICACIONES', $auth.user._id);
            const { data } = await $axios.get(`apuntes?user_id=${$auth.user._id}&page=1`)
            return { documentos : data.data.data }
        },
        head() {
            return {
                title: 'Inicio | SN'
            }
        },
        methods : {
            async crearComentario(contenido , publicacionID, indice){
                this.info = {
                    user_id : this.$auth.user._id,
                    comentario : contenido,
                    publicacion_id : publicacionID
                }
                try {
                    await this.$axios.post('comentarios', this.info )
                    this.publicaciones[indice].comentarios.push(this.info)
                }catch ( e ) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            },
            async cargarDocumentos() {
                this.btn_loadingDocumentos = true
                try {
                    const { data } = await this.$axios.get(`apuntes?user_id=${this.$auth.user._id}&page=${this.page}`)
                    if(data.data.data.length > 0){
                        this.documentos = this.documentos.concat(data.data.data)
                        this.page = this.page + 1
                    } else {
                        this.paginacionPosibleDocumentos = true
                    }
                } catch( e ) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.btn_loadingDocumentos = false
            },
            async cargarPublicaciones(){
                this.btn_loading = true;
                try {
                    let consulta = {
                        usuario : this.$auth.user._id,
                        pagina : this.pagina
                    }
                    await this.$store.dispatch('publicaciones/GET_PAGINACION_PUBLICACIONES', consulta);
                } catch(e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.btn_loading = false;
                this.loading = false;
            }
        },
        computed : {
            publicaciones(){
                return this.$store.state.publicaciones.publicaciones
            },
            pagina(){
                return this.$store.state.publicaciones.pagina
            },
            paginacionPosible(){
                return this.$store.state.publicaciones.finConsulta
            }
        }
    }
</script>