<template>
    <v-container> 
        <v-row justify="center" align="center" >
            <v-col sm="12" md="8" class="pa-0 ma-0"> 
                <v-text-field
                    v-model="contenido"
                    label="Agrega un comentario..."
                    name="comentario"
                />
            </v-col>
            <v-col sm="12" md="1" class="pa-0 ma-0"> 
                <v-btn block text large 
                    @click="guardarComentario()" 
                    v-if="contenido"
                    :loading="loading"    
                >Publicar</v-btn>
                <v-btn block text large v-else disabled>Publicar</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        props: ['id', 'indice'],
        data () {
            return {
                contenido: '',
                comentario : {},
                loading: false
            }
        },
        methods: {
            async guardarComentario() {
                this.comentario = {
                    user : this.$auth.user,
                    comentario : this.contenido,
                    publicacion_id : this.id,
                    indice : this.indice
                }
                this.loading = true
                try {
                    await this.$store.dispatch('publicaciones/GET_COMENTARIOS', this.comentario);
                    this.contenido = ''
                }catch ( e ) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.loading = false
            }
        }
    }
</script>