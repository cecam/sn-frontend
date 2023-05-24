<template>
    <v-container fluid>
        <v-form ref="form">
            <v-row align="center">
                <v-text-field
                    :rules="inputRules"
                    v-model="nuevaPregunta.pregunta"
                    label="Haz tu pregunta..."
                    name="respuesta"
                />
            </v-row>
            <v-row align="center" justify="center">
                <v-textarea
                    :rules="inputRules"
                    name="descripcion"
                    filled
                    v-model="nuevaPregunta.descripcion"
                    label="Escribe más detalles de tu pregunta"
                    auto-grow
                    value=""
                ></v-textarea>
            </v-row>
            <v-row align="center" justify="center"> 
                <h3 class="titulo">Selecciona 3 etiquetas para que las personas encuentren tu pregunta</h3>
            </v-row>
            <v-row align="center" justify="center"> 
                <v-select multiple 
                    :rules="selectRules"
                    v-model="nuevaPregunta.etiquetasFormulario" 
                    :items="etiquetas" 
                    item-value="_id"
                    item-text="nombre"
                    label="Etiquetas"
                    v-on:input="limiter"
                ></v-select>
            </v-row>
            <v-row>
                <CrearEtiqueta :crearEtiqueta="crearEtiqueta" />
            </v-row>
            <v-row align="center" justify="center"> 
                <v-col sm="8" class="pb-0">
                    <v-btn block dark
                        :loading="loading_btn"
                        color="#40cb4d"
                        @click="guardarPregunta()"
                        
                    > 
                        Preguntar 
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
    import CrearEtiqueta from '@/components/modales/CrearEtiqueta'

    export default {
        props : ['etiquetas'],
        components: { 
            CrearEtiqueta
        },
        data(){
            return{
                nuevaPregunta : {
                    pregunta: '',
                    descripcion: '',
                    etiquetasFormulario: [],
                    loading_btn: false,
                },
                inputRules: [
                    v => !!v || 'Este campo es obligatorio'
                ],
                selectRules : [
                    v => v.length > 0 || 'Selecciona al menos una etiqueta'
                ]
            }
        },
        methods: {
            limiter(e) {
                if(e.length > 3) {
                    e.pop()
                }
            },
            async crearEtiqueta(nombre) {
                let info = {
                    nombre : nombre,
                    user_id : this.$auth.user._id
                }
                try {
                    let { data } = await this.$axios.post('etiquetas', info)
                    this.etiquetas = this.etiquetas.concat(data.data)
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : 'Ya puedes encontrar la etiqueta con las demás',
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }catch(e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            },
            async guardarPregunta() {
                this.loading_btn = true;
                let pregunta = {
                    pregunta : this.nuevaPregunta.pregunta,
                    descripcion : this.nuevaPregunta.descripcion,
                    user_id : this.$auth.user._id,
                    etiquetas_ids : this.nuevaPregunta.etiquetasFormulario
                }
                try {
                    await this.$axios.post('preguntas', pregunta)
                    await this.$auth.fetchUser()
                    this.$router.push('/preguntas')
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

<style scoped>
    .titulo {
        font-size: 16px;
        text-align: center;
    }
</style>