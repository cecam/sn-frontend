<template>
    <v-card>
        <v-container fluid>
            <v-row justify="space-around" align="center">
                <v-col cols="3" >
                    <v-avatar size="80">
                        <img
                            :src="`${publicacion.user.img_perfil}`"
                            :alt="`${publicacion.user.name} - SchoolNotes`"
                        >
                    </v-avatar>
                </v-col>
                <v-col cols="9">
                    <v-container fluid> 
                        <v-row align="center">
                            <LinkAPerfil 
                                :nombre="publicacion.user.name"
                                :id="publicacion.user._id"
                            /> 
                            <hr />
                            <v-card-subtitle>{{publicacion.created_at | dateFormat}}</v-card-subtitle>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row justify="center" align="center" class="blue-grey darken-3"> 
                <h2 class="centrado">{{publicacion.contenido}}</h2>
            </v-row>
        </v-container>
        <v-card-actions> 
            <v-spacer> </v-spacer>
            <v-btn icon 
                @click="eliminar()"
                v-if="publicacion.user._id == $auth.user._id"
            >
                <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
            <v-btn text
                v-if="publicacion.reacciones.includes($auth.user._id)"
                @click="eliminarReaccion()"
            >
                <v-icon color="red darken-1">mdi-heart</v-icon>
                {{publicacion.reacciones.length}}
            </v-btn>
            <v-btn text
                v-else
                @click="reaccionar()"
            >
                <v-icon>mdi-heart-outline</v-icon>
                {{publicacion.reacciones.length}}
            </v-btn>

            <v-btn text 
                v-if="publicacion.comentarios.length > 0" 
                @click="mostrarComentarios = !mostrarComentarios"
            >
                <v-icon>mdi-comment</v-icon>
                {{publicacion.comentarios.length}}
            </v-btn>
            <v-btn icon disabled v-else> 
                <v-icon>mdi-comment</v-icon>
            </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <div v-if="mostrarComentarios">
            <div v-for="(comentario, index) in publicacion.comentarios" :key="index">
                <Comentario :comentario=comentario :index="index" :indice="indice" /> 
                <v-divider></v-divider>
            </div>
        </div>
        <NuevoComentario 
            :id="publicacion._id" 
            :indice="indice" 
        />
    </v-card>
</template>

<script>
    import NuevoComentario from '@/components/comentarios/NuevoComentario'
    import Comentario from '@/components/comentarios/Comentario'

    import moment from 'moment'
    moment.locale('es')

    export default {
        props : ['publicacion' , 'indice'],
        components: {
            NuevoComentario,
            Comentario
        },
        data() {
            return {
                mostrarComentarios : false,
            }
        },
        methods : {
            async eliminar(){
                try{
                    await this.$axios.delete(`publicaciones/${this.publicacion._id}`)
                    this.$router.push('/inicio')
                }catch(e){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            },
            async reaccionar() {
                let info = {
                    tipo : 'publicacion',
                    tipo_id : this.publicacion._id,
                    publicacionIndice : this.indice,
                    user_id : this.$auth.user._id
                }
                try {
                    await this.$store.dispatch('publicaciones/GET_REACCIONES', info)
                }catch(e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            },
            async eliminarReaccion() {
                let info = {
                    tipo : 'publicacion',
                    tipo_id : this.publicacion._id,
                    publicacionIndice : this.indice,
                    user_id : this.$auth.user._id
                }
                try {
                    await this.$store.dispatch('publicaciones/GET_REACCIONES_QUITAR', info)
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
<style scoped>
    .centrado {
        text-align: center;
        color: #d6d6d6; 
        font-size: 24px;
    }
</style>