<template>
        <v-card shaped raised>
            <v-container>
                <v-row justify="center">
                    <v-col cols="2">
                        <v-avatar size="80">
                            <img
                                :src="`${$auth.user.img_perfil}`"
                                :alt="`${$auth.user.name} - SchoolNotes`"
                            >
                        </v-avatar>
                    </v-col>
                    <v-col cols="9"> 
                        <v-text-field
                            v-model="publicacion.contenido"
                            label="Dile algo a tus seguidores"
                            required
                        > </v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="11"> 
                        <v-btn 
                            v-if="publicacion.contenido"
                            block 
                            rounded 
                            color="primary"
                            @click="publicarContenido()"    
                        >
                            publicar
                        </v-btn>
                        <v-btn v-else disabled block rounded color="primary">
                            publicar
                        </v-btn>
                    </v-col> 
                </v-row>
            </v-container>
        </v-card>
</template>

<script>
    export default {
        data () {
            return {
                publicacion : {
                    user_id : this.$auth.user._id,
                    contenido : ''
                }
            }
        },
        methods: {
            async publicarContenido() {
                try {
                    await this.$axios.post('publicaciones', this.publicacion )
                    this.publicacion.contenido = ''
                    await this.$store.dispatch('publicaciones/GET_PRIMER_PUBLICACIONES', this.publicacion.user_id);
                }catch ( e ) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            }
        } 

    }
</script>