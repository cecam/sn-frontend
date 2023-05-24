<template>
    <v-card class="m5" link :to="`/preguntas/${pregunta._id}`"> 
        <v-container fluid>
            <v-row justify="center" align="center">
                <v-col cols="4" md="3">
                    <v-avatar size="100">
                        <img
                            :src="`${pregunta.user.img_perfil}`"
                            :alt="`${pregunta.user.name} - SchoolNotes`"
                        >
                    </v-avatar>
                </v-col>
                <v-col cols="10" md="8">
                    <v-container fluid> 
                        <v-row align="center" justify="end" class="ma-0 pa-0">
                            <v-btn icon v-if="pregunta.verificado">
                                <v-icon color="green darken-1" x-large>mdi-check-decagram</v-icon>
                            </v-btn>
                        </v-row>
                        <v-row align="center" class="ma-0 pa-0"> 
                            <LinkAPerfil 
                                :nombre="pregunta.user.name"
                                :id="pregunta.user._id"
                            />
                            <hr />
                            <v-card-subtitle>{{pregunta.created_at | dateFormat}}</v-card-subtitle>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row justify="center" align="center" class="blue-grey darken-3"> 
                <h2 class="pregunta">{{pregunta.pregunta}}</h2>
            </v-row>
        </v-container>
        <div v-if="!vistaIndependiente">
            <v-divider> </v-divider>
            <v-card-actions>  
                <v-spacer> </v-spacer>
                <v-btn text href="`/preguntas/${pregunta._id}`" v-if="pregunta.respuestas">
                    <v-icon>mdi-comment</v-icon>
                    {{pregunta.respuestas.length}}
                </v-btn>
                <v-btn text disabled v-else>
                    <v-icon>mdi-comment</v-icon>
                </v-btn>
            </v-card-actions>
        </div>
        <div v-else>
            <v-divider> </v-divider>
            <p class="descripcion">{{pregunta.descripcion}}</p>
            <v-card-actions> 
                <v-btn icon
                    v-if="pregunta.user._id == $auth.user._id "
                    @click="handleEditar()"
                >
                    <v-icon>mdi-file-edit-outline</v-icon>
                </v-btn>
                <v-spacer> </v-spacer>
                <v-btn icon 
                    @click="eliminar()"
                    v-if="pregunta.user._id == $auth.user._id"
                >
                    <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
                <v-btn text
                    v-if="pregunta.reacciones.includes($auth.user._id)"
                    @click="eliminarReaccion(reaccion)"
                >
                    <v-icon color="red darken-1">mdi-heart</v-icon>
                    {{pregunta.reacciones.length}}
                </v-btn>
                <v-btn text
                    v-else
                    @click="reaccionar(reaccion)"
                >
                    <v-icon>mdi-heart-outline</v-icon>
                    {{pregunta.reacciones.length}}
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
    import LinkAPerfil from '@/components/usuario/LinkAPerfil'

    import moment from 'moment'
    moment.locale('es')

    export default {
        props:['pregunta', 'vistaIndependiente', 'eliminarReaccion', 'reaccionar', 'handleEditar'],
        components: {
            LinkAPerfil
        },
        data() {
            return {
                reaccion : {
                    tipo : 'pregunta',
                    id : this.pregunta._id
                }
            }
        },
        methods: {
            async eliminar(){
                try{
                    await this.$axios.delete(`preguntas/${this.pregunta._id}`)
                    await store.dispatch('preguntas/GET_MIS_PRIMERAS_PREGUNTAS', usuario);
                    await store.dispatch('preguntas/GET_PRIMERAS_PREGUNTAS_SIN_RESPUESTA');
                    await store.dispatch('preguntas/GET_PRIMERAS_PREGUNTAS_SIN_VERIFICAR');
                    await store.dispatch('preguntas/GET_PRIMERAS_PREGUNTAS_VERIFICADAS');
                    this.$router.push('/preguntas')
                }catch(e){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            }
        },
        filters: {
            dateFormat(value) {
            if (!value) return ''
                let newFecha= moment(value).fromNow();
                return newFecha
            },
              
        },
    }
</script>

<style scoped>
    .pregunta {
        text-align: center;
        color: #d6d6d6; 
    }
    .descripcion {
        font-size: 16px;
        text-align: center;
        margin-top: 5px;
    }
</style>