<template>
<v-main>
    <v-container fluid class="pa-0">
        <div class="banner">
        <v-row >
                <v-col cols="12" md="12">
                    <Card 
                        :usuario="usuario" 
                        :agregarSeguidor="agregarSeguidor" 
                        :dejarSeguir="dejarSeguir"
                    />
                </v-col>
        </v-row>
        </div>
        <v-row justify="center" align="center">
            <v-col cols="12" md="8" v-if="usuario.descripcion_perfil == '' && usuario._id == $auth.user._id">
                <h2>Agrega una descripcion a tu perfil y consigue 5 clips</h2>
                <v-btn block link to="/editar-perfil/descripcion" color="success" rounded>crear descripcion</v-btn>
            </v-col>
            <v-col cols="12" md="8" v-else-if="usuario.descripcion_perfil == '' && usuario._id != $auth.user._id"> 
                <h2>Este usuario no ha agregado una descripción...</h2>
            </v-col>
            <v-col cols="12" md="8" v-else-if="usuario.descripcion_perfil != ''">
                <Descripcion :descripcion="usuario.descripcion_perfil" />
            </v-col>
        </v-row>
        <v-row> 
            <v-tabs v-model="tab" grow> 
                <v-tab>Portafolios</v-tab>
                <v-tab>Apuntes</v-tab>
                <v-tab>Preguntas</v-tab>
            </v-tabs>
        </v-row>
        <v-tabs-items v-model="tab">
            <v-tab-item style="width : 100vw">
                <v-container fluid>
                    <v-row align="center" justify="space-around">
                        <v-col cols="12" md="12"><MisPortafolios :usuario="usuario" /></v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
            <v-tab-item style="width : 100vw">
                <v-container fluid>
                    <v-row align="center" justify="space-around">
                        <v-col cols="12" md="12"><MisApuntes :usuario="usuario" /></v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
            <v-tab-item style="width : 100vw">
                <v-container fluid>
                    <v-row align="center" justify="space-around" >
                        <v-col cols="12" md="12"><MisPreguntas :usuario="usuario" /></v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</v-main>
</template>

<script>
    import Card from '@/components/perfil/Card'
    import Descripcion from '@/components/descripcion/Descripcion'
    import MisPreguntas from '@/components/perfil/MisPreguntas'
    import MisApuntes from '@/components/perfil/MisApuntes'
    import MisPortafolios from '@/components/perfil/MisPortafolios'

    export default {
        layout: 'login',
        components: {
            Card,
            Descripcion,
            MisPreguntas,
            MisApuntes,
            MisPortafolios,
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
        async asyncData ({ $axios, query }) {
            const { data } = await $axios.get(`usuarios/${query.id}`)
            return { usuario: data.data }
        },
        methods: {
            agregarSeguidor() {
                this.usuario.seguidores.push(this.$auth.user._id)
            },
            dejarSeguir() {
                let i = this.usuario.seguidores.indexOf(this.$auth.user._id)

                if( i !== -1) {
                    this.usuario.seguidores.splice(i , 1)
                }
            },
        }
    }
</script>

<style scoped>
    .banner {
        background: linear-gradient(180deg, rgba(0,0,0,1) 1%, rgba(0,38,89,1) 50%, rgba(0,109,254,1) 100%);
    }
    .titulo{
        font-size: 16px;
        text-align:center;
    }
    .activador {
        color: #013c8a;
    }
</style>