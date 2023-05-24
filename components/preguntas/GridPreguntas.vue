<template>
    <v-container fluid> 
        <v-row justify="space-around"> 
            <v-col cols="12" lg="5" v-for="pregunta in preguntas" :key="pregunta._id"> 
                <Pregunta :pregunta=pregunta />
            </v-col>
        </v-row>
        <v-row justify="center"> 
            <v-btn outlined color="green"
                @click="cargarPreguntas()"  
                :loading="btn_loading" 
                v-if="!paginacionPosible"
            >
                Ver mas publicaciones...
            </v-btn>
            <v-card-title v-else>No hay más preguntas para mostrar</v-card-title>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ['preguntas', 'state'],
    data() {
        return {
            loading: true,
            btn_loading: false,
        }
    },
    methods : {
        async cargarPreguntas() {
            let consulta = {}
            this.btn_loading = true;
            switch(this.state) {
                case 'mis_preguntas':
                    consulta = {
                        usuario : this.$auth.user._id,
                        pagina : this.paginaMisPreguntas
                    }
                    await this.$store.dispatch('preguntas/GET_MIS_PREGUNTAS_PAGINACION', consulta);
                    break
                case 'sin_responder':
                    consulta = {
                        usuario : this.$auth.user._id,
                        pagina : this.paginaSinRespuesta
                    }
                    await this.$store.dispatch('preguntas/GET_PREGUNTAS_SIN_RESPUESTA_PAGINACION', consulta);
                    break
                case 'sin_verificar':
                    consulta = {
                        usuario : this.$auth.user._id,
                        pagina : this.paginaSinVerificar
                    }
                    await this.$store.dispatch('preguntas/GET_PREGUNTAS_SIN_VERIFICAR_PAGINACION', consulta);
                    break
                case 'verificadas':
                    consulta = {
                        usuario : this.$auth.user._id,
                        pagina : this.paginaVerificadas
                    }
                    await this.$store.dispatch('preguntas/GET_PREGUNTAS_VERIFICADAS_PAGINACION', consulta);
                    break
            }
            this.btn_loading = false;
            this.loading = false;
        }
    },
    computed : {
        paginaMisPreguntas() {
            return this.$store.state.preguntas.paginaMisPreguntas
        },
        paginaSinRespuesta() {
            return this.$store.state.preguntas.paginaSinRespuesta
        },
        paginaSinVerificar() {
            return this.$store.state.preguntas.paginaSinVerificar
        },
        paginaVerificadas() {
            return this.$store.state.preguntas.paginaVerificadas
        },
        paginacionPosible() {
            switch(this.state) {
                case 'mis_preguntas':
                    return this.$store.state.preguntas.paginacionPosible.misPreguntas
                    break
                case 'sin_responder':
                    return this.$store.state.preguntas.paginacionPosible.sinRespuesta
                    break
                case 'sin_verificar':
                    return this.$store.state.preguntas.paginacionPosible.sinVerificar
                    break
                case 'verificadas':
                    return this.$store.state.preguntas.paginacionPosible.verificadas
                    break
            }            
        },
        
    }
}
</script>