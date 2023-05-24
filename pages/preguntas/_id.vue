<template>
    <v-main>
        <v-container class="pa-0 mt-0" fluid>
            <v-row justify="center" align="center">
                <v-col sm="10" lg="8" v-if="!editar">
                    <Pregunta 
                        :pregunta="pregunta" 
                        vistaIndependiente="true" 
                        :reaccionar="reaccionar"
                        :eliminarReaccion="eliminarReaccion"
                        :handleEditar="handleEditar"
                    />
                </v-col>
                <v-col sm="10" lg="8" v-else>
                    <EditarPregunta
                        :pregunta="pregunta"
                        :editarPregunta="editarPregunta"
                        :handleEditar="handleEditar"
                        :loading_btn="loading_btn"
                    />
                </v-col>
            </v-row>
            <v-row align="top">
                <v-col cols="12" md="8">
                    <v-card-title>{{pregunta.respuestas.length}} respuestas</v-card-title>
                    <Respuesta 
                        v-for="(respuesta, index) in pregunta.respuestas" :key="index"
                        :respuesta="respuesta" 
                        :preguntaID ="pregunta.user._id"   
                        :index="index"
                        :reaccionar="reaccionar"
                        :eliminarReaccion="eliminarReaccion"
                    />
                    <NuevaRespuesta 
                        v-if="pregunta.verificado == 0"
                        :preguntaID="pregunta._id" 
                        :guardarRaspuesta="guardarRaspuesta"
                        :loading_respuesta="loading_respuesta"
                    />
                </v-col>
                <v-col cols="12" md="4"> 
                    <v-card class="mt-15"> 
                        <h3 style="font-size: 24px; text-align: center" class="mb-5">
                            ¿No es la respuesta que esperabas?
                        </h3>
                        
                        <v-card-subtitle style="font-size: 25px; text-align: center" class="mb-3">
                            ¡Intenta haciendo una pregunta parecida a la comunidad!
                        </v-card-subtitle>
                        <v-btn block href="/preguntas/nueva-pregunta">Preguntar</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
    import Pregunta from '@/components/preguntas/Pregunta'
    import EditarPregunta from '@/components/preguntas/EditarPregunta'
    import Respuesta from '@/components/respuestas/Respuesta'
    import NuevaRespuesta from '@/components/respuestas/NuevaRespuesta'

    export default {
        layout: 'login',
        components: {
            Pregunta,
            EditarPregunta,
            Respuesta,
            NuevaRespuesta
        },
        data(){
            return {
                editar: false,
                loading_btn : false,
                loading_respuesta : false
            }
        },
        async asyncData ({ $axios, params }) {
            const { data } = await $axios.get(`preguntas/${params.id}`)
            return { pregunta: data.data }
        },
        head() {
            return {
                titleTemplate: `SN - ${this.pregunta.pregunta}`
            }
        },
        methods: {
            handleEditar(){
                this.editar = !this.editar
            },
            async editarPregunta(preguntaEditada) {
                let info = {
                    user_id : this.$auth.user._id,
                    pregunta : preguntaEditada.pregunta,
                    descripcion : preguntaEditada.descripcion
                }
                this.loading_btn = true
                try{
                    let { data } = await this.$axios.put(`preguntas/${this.pregunta._id}`, info)
                    this.pregunta.pregunta = data.data.pregunta
                    this.pregunta.descripcion = data.data.descripcion
                    this.editar = false
                }catch(e){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.loading_btn = false
            },
            async guardarRaspuesta(contenido){
                let info = {
                    contenido : contenido,
                    user_id : this.$auth.user._id,
                    pregunta_id : this.pregunta._id
                }
                this.loading_respuesta = true
                try {
                    let { data } = await this.$axios.post('respuestas', info)
                    this.pregunta.respuestas.push(data.data)
                } catch ( e ) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.loading_respuesta = false
            },
            async reaccionar(reaccion) {
                let info = {
                    tipo : reaccion.tipo,
                    tipo_id : reaccion.id,
                    user_id : this.$auth.user._id
                }
                try {
                    await this.$axios.post('reaccion' , info)
                    if(reaccion.tipo == 'respuesta') {
                        this.agregarReaccionRespuesta(reaccion.indice)
                    }else {
                        this.agregarReaccionPregunta()
                    }
                } catch (e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            },
            agregarReaccionRespuesta(indice) {
                this.pregunta.respuestas[indice].reacciones.push(this.$auth.user._id)
            },
            agregarReaccionPregunta() {
                this.pregunta.reacciones.push(this.$auth.user._id)
            },
            async eliminarReaccion(reaccion) {
                let info = {
                    tipo : reaccion.tipo,
                    tipo_id : reaccion.id,
                    user_id : this.$auth.user._id
                }
                try {
                    await this.$axios.post('reaccion' , info)
                    if(reaccion.tipo == 'respuesta') {
                        this.eliminarReaccionRespuesta(reaccion.indice)
                    } else {
                        this.eliminarReaccionPregunta()
                    }
                } catch (e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            },
            eliminarReaccionRespuesta(indice) {
                let i = this.pregunta.respuestas[indice].reacciones.indexOf(this.$auth.user._id)

                if( i !== -1) {
                    this.pregunta.respuestas[indice].reacciones.splice(i , 1)
                }
            },
            eliminarReaccionPregunta() {
                let i = this.pregunta.reacciones.indexOf(this.$auth.user._id)

                if( i !== -1) {
                    this.pregunta.reacciones.splice(i , 1)
                }
            }
        }
    }
</script>