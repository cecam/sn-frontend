<template>
    <v-container fluid>
        <v-row align="center">
            <v-col sm="2">
                <v-avatar size="80">
                    <img
                        :src="`${comentario.user.img_perfil}`"
                        :alt="`${comentario.user.name} - SchoolNotes`"
                    >
                </v-avatar>
            </v-col>
            <v-col sm="9" class="pa-0 ma-0">
                <v-container fluid> 
                    <v-row align="center">
                        <v-btn :ripple="false" text link :to="`/${string_to_slug(comentario.user.name)}?id=${comentario.user._id}`">
                            {{comentario.user.name}}
                        </v-btn> 
                    </v-row>
                    <v-row 
                        align="center" 
                        class="text-center blue-grey darken-3 rounded-pill pa-3" 
                        style="color:#d6d6d6;"
                    >
                        {{comentario.comentario}}
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        <v-row justify="end" align="center">
            {{comentario.created_at | dateFormat}}
            <v-btn text
                v-if="comentario.reacciones.includes($auth.user._id)"
                @click="eliminarReaccion()"
            >
                <v-icon color="red darken-1">mdi-heart</v-icon>
                {{comentario.reacciones.length}}
            </v-btn>
            <v-btn text
                v-else
                @click="reaccionar()"
            >
                <v-icon>mdi-heart-outline</v-icon>
                {{comentario.reacciones.length}}
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
    import moment from 'moment'
    moment.locale('es')
    
    export default {
        props: ['comentario', 'index', 'indice'],
        filters: {
            dateFormat(value) {
            if (!value) return ''
                let newFecha= moment(value).fromNow();
                return newFecha
            }
        },
        methods : {
            async reaccionar() {
                let info = {
                    tipo : 'comentario',
                    tipo_id : this.comentario._id,
                    publicacionIndice : this.indice,
                    user_id : this.$auth.user._id,
                    comentarioIndice : this.index
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
                    tipo : 'comentario',
                    tipo_id : this.comentario._id,
                    publicacionIndice : this.indice,
                    user_id : this.$auth.user._id,
                    comentarioIndice : this.index
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
    }
</script>