<template>
    <v-card> 
        <v-container fluid>
            <v-row align="center" justify="center">
                <v-col cols="3" sm="2">
                    <v-avatar size="80">
                        <img
                            :src="`${respuesta.user.img_perfil}`"
                            :alt="`${respuesta.user.name} - SchoolNotes`"
                        >
                    </v-avatar>
                </v-col>
                <v-col cols="8" sm="9">
                    <v-container fluid> 
                        <v-row align="center"> 
                            <LinkAPerfil 
                                :nombre="respuesta.user.name"
                                :id="respuesta.user._id"
                            />
                            <hr />
                            <v-card-subtitle>{{respuesta.created_at | dateFormat}}</v-card-subtitle>
                            <hr />
                            <v-spacer> </v-spacer>
                            <v-icon color="green darken-1" v-if="respuesta.verificado == 1" x-large>
                                mdi-check-decagram
                            </v-icon>
                        </v-row>   
                        <v-row 
                            style="color:#d6d6d6;"
                            class="text-center blue-grey darken-3  rounded-pill pa-4"
                        > 
                            {{respuesta.contenido}}
                        </v-row> 
                    </v-container> 
                </v-col>
            </v-row>
            <v-row> 
                <v-btn text 
                    v-if="$auth.user._id == preguntaID && respuesta.verificado != 1"
                    @click="validarRespuesta()"    
                >
                    <v-icon color="green darken-1">mdi-check-decagram</v-icon>
                    marcar como correcta
                </v-btn>
                <v-spacer> </v-spacer>
                <v-btn text
                    v-if="respuesta.reacciones.includes($auth.user._id)"
                    @click="eliminarReaccion(reaccion)"
                >
                    <v-icon color="red darken-1">mdi-heart</v-icon>
                    {{respuesta.reacciones.length}}
                </v-btn>
                <v-btn text
                    v-else
                    @click="reaccionar(reaccion)"
                >
                    <v-icon>mdi-heart-outline</v-icon>
                    {{respuesta.reacciones.length}}
                </v-btn>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import LinkAPerfil from '@/components/usuario/LinkAPerfil'

    import moment from 'moment'
    moment.locale('es')

    export default {
        props: ['respuesta', 'preguntaID', 'index', 'eliminarReaccion', 'reaccionar'],
        components: {
            LinkAPerfil
        },
        data() {
            return {
                reaccion : {
                    tipo : 'respuesta',
                    indice : this.index,
                    id : this.respuesta._id
                }
            }
        },
        methods : {
            async validarRespuesta() {
                let usuario = this.$auth.user._id
                try {
                    await this.$axios.post('valida-respuesta', {id : this.respuesta._id})
                    this.$router.push('/preguntas')
                }catch(e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            },
            string_to_slug (str) {
                str = str.replace(/^\s+|\s+$/g, ''); // trim
                str = str.toLowerCase();
            
                // remove accents, swap ñ for n, etc
                var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
                var to   = "aaaaeeeeiiiioooouuuunc------";
                for (var i=0, l=from.length ; i<l ; i++) {
                    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                }

                str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                    .replace(/\s+/g, '-') // collapse whitespace and replace by -
                    .replace(/-+/g, '-'); // collapse dashes

                return str;
            }
        },
        filters: {
            dateFormat(value) {
            if (!value) return ''
                let newFecha= moment(value).fromNow();
                return newFecha
            }
        }
    }
</script>