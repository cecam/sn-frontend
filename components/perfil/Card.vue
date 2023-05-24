<template>
    <div>
        <v-container >
            <v-row align="top" justify="center">
                <v-col cols="7" sm="4" md="2"> 
                    <v-avatar size="200">
                        
                        <img v-if="usuario.activo == 1"
                            :src="`${usuario.img_perfil}`"
                            :alt="`${usuario.name} - SchoolNotes`"
                        >
                        <img v-else
                            :src="`${usuario.img_perfil}`"
                            :alt="`${usuario.name} - SchoolNotes`"
                        >
                    </v-avatar>
                </v-col>
                <v-col cols="12" sm="7" md="6" >
                    <v-container  fluid>
                        <v-row justify="center" >
                            <v-col cols="5" md="3">
                                <v-chip class="ma-2" color="blue lighten-5" outlined pill @click="open_seguidores = !open_seguidores">
                                    <v-avatar left class="blue darken-2">
                                        <small>{{usuario.seguidores.length}}</small>
                                    </v-avatar>
                                    Seguidores
                                </v-chip>
                            </v-col>
                            <v-col cols="5" md="3">
                                <v-chip  class="ma-2" color="blue lighten-5" outlined pill @click="open_seguidos = !open_seguidos"> 
                                    <v-avatar left class="blue darken-2">
                                        <small>{{usuario.seguidos.length}}</small>
                                    </v-avatar>
                                    Siguiendo
                                </v-chip>
                            </v-col>
                            <v-col cols="7" sm="4" v-if="usuario._id != this.$auth.user._id">
                                <v-spacer />
                                <BotonSeguir 
                                    :usuario="usuario" 
                                    :agregarSeguidor="agregarSeguidor"
                                    :dejarSeguir="dejarSeguir"
                                />
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <h1 class="nombreUsuario">
                                <div v-if="usuario.tipo == 'administrador'" style="background: linear-gradient(to right, #742C99, #AB7EE6);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                    {{usuario.name}}
                                </div>
                                <div v-else-if="usuario.tipo == 'tester'" style="background: linear-gradient(to right, #11998e, #38ef7d);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                    {{usuario.name}}
                                </div>
                                <div v-else-if="usuario.tipo == 'donador'" style="background: linear-gradient(to right, #f09819, #edde5d);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                    {{usuario.name}}
                                </div>
                                <div v-else style="background: linear-gradient(to right, #ffffff, #ffffff);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                                    {{usuario.name}}
                                </div>
                            </h1>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row justify="space-around" v-if="usuario.universidad || usuario.carrera">
                <v-col cols="12" sm="4" v-if="usuario.universidad">
                    <EnlaceUniversidad :universidad="usuario.universidad" />
                </v-col>
                <v-col cols="12" sm="4" v-if="usuario.carrera">
                    <EnlaceCarrera :carrera="usuario.carrera" />
                </v-col>
            </v-row>
            <v-row align="center" justify="space-around"> 
                <v-col cols="12">
                    <div v-if="usuario.etiquetas_ids.lenght != 1">
                        <p class="tituloEtiquetas">Etiquetas Favoritas de {{usuario.name}}</p> 
                    </div>
                    <div v-else>
                        <p class="tituloEtiquetas">Etiqueta Favorita de {{usuario.name}}</p> 
                    </div>
                </v-col>
                <v-col cols="4" v-for="(etiqueta, i) in usuario.etiquetas" :key="i" class="text-center">
                    <EtiquetaPildora :etiqueta="etiqueta" tipo="usuarios" />
                </v-col>
            </v-row>
        </v-container>


        <v-dialog v-model="open_seguidores" max-width="600">
            <v-card>
                <v-card-title>
                    Seguidores de {{usuario.name}}
                </v-card-title>
                <v-card-text>
                    <hr>
                        <Seguidores :usuario="usuario" />
                    <hr>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="open_seguidores = false" color="green" outlined>
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="open_seguidos" max-width="600">
            <v-card>
                <v-card-title>
                    {{usuario.name}} Sigue a estas personas
                </v-card-title>
                <v-card-text>
                    <hr>
                        <Seguidos :usuario="usuario" />
                    <hr>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="open_seguidos = false" color="green" outlined>
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import BotonSeguir from '@/components/perfil/BotonSeguir'
    import EtiquetaPildora from '@/components/etiquetas/EtiquetaPildora'
    import Seguidores from '@/components/perfil/Seguidores'
    import Seguidos from '@/components/perfil/Seguidos'
    import EnlaceUniversidad from '@/components/universidades/EnlaceUniversidad'
    import EnlaceCarrera from '@/components/carreras/EnlaceCarrera'
    
    import moment from 'moment'
    moment.locale('es')

    export default {
        components: {
            BotonSeguir,
            EtiquetaPildora,
            Seguidores,
            Seguidos,
            EnlaceUniversidad,
            EnlaceCarrera,
        },
        props: ['usuario', 'agregarSeguidor', 'dejarSeguir'],
        data(){
            return{
                open_seguidores: false,
                open_seguidos: false,
            }
        },
        filters: {
            birthdayFormat(value) {
            if (!value) return ''
                return moment(value).format('D [de] MMMM [del] YYYY');
                return newFecha
            },
              
        },
    }
</script>

<style scoped>
    .nombreUsuario {
        text-align: center;
        font-size: 40px;
        color: whitesmoke;
    }
    .fechaNacimiento {
        color: #cfcfcf;
    }
    .tituloEtiquetas {
        color: #cfcfcf;
        text-align: center;
        font-weight: 500;
        margin: 0;
    }
</style>