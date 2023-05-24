<template>
    <v-main> 
        <v-container fluid> 
            <v-row justify="center">
                <h1 class="titulo">¡Crea tu documento para empezar a ganar clips con cada desbloqueo!</h1>
            </v-row>
            <v-row justify="space-around"> 
                <v-col cols="12" md="6"> 
                    <v-text-field
                        :rules="inputRules"
                        style="font-size:30px"
                        v-model="titulo"
                        height="50"
                        label="Título del documento"
                        name="titulo"
                    />
                    <v-file-input dense
                        :rules="inputRules"
                        v-model="archivo"
                        label="Sube tu documento"
                    ></v-file-input>
                    <v-card-text>Describe el contenido de tu documento</v-card-text>
                    <div style="border: 1px solid #a1a1a1; border-radius:15px">
                        <editor ref="editor" autofocus 
                            @save="onSave"
                            :initialized="onInitialized" 
                            header list
                        />   
                    </div>
                    <v-file-input dense
                        accept="image/png, image/jpeg, image/PNG, image/jpg, image/JPEG, image/JPG"
                        :rules="inputRules"
                        v-model="imagen"
                        label="Agrega una imagen destacada"
                    ></v-file-input>
                </v-col>
                <v-col cols="12" md="3">
                    <v-container fluid> 
                        <v-row align="center" justify="center"> 
                            <h3 class="titulo">Etiqueta tu documento para que más personas lo encuentren</h3>
                        </v-row>    
                        <v-row>
                            <v-select multiple 
                                :rules="selectRules"
                                v-model="etiquetasFormulario" 
                                :items="etiquetas" 
                                item-value="_id"
                                item-text="nombre"
                                label="Etiquetas"
                                v-on:input="limiter"
                            ></v-select>
                        </v-row>
                        <v-row align="center" justify="center">
                            <CrearEtiqueta :crearEtiqueta="crearEtiqueta" />
                        </v-row>
                    </v-container> 
                    <v-divider> </v-divider>
                    <v-btn block dark
                        @click="guardarApunte()" 
                        :loading="loading"
                        color="#40cb4d"
                    >
                        Guardar apunte
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
    import CrearEtiqueta from '@/components/modales/CrearEtiqueta'

    export default {
        layout: 'login',
        components: {
            CrearEtiqueta
        },
        data() {
            return {
                titulo: '',
                archivo: '',
                imagen: '',
                etiquetasFormulario: [],
                onInitialized: null,
                loading: false,
                inputRules: [
                    v => !!v || 'Este campo es obligatorio'
                ],
                selectRules : [
                    v => v.length > 0 || 'Selecciona al menos una etiqueta'
                ]
            }
        },
        async asyncData ({ $axios, params }) {
            const { data } = await $axios.get(`etiquetas`)
            return { etiquetas: data.data }
        },
        head() {
            return {
                titleTemplate: `SN - Crear documento`
            }
        },
        methods: {
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
            async guardarApunte() {
                await this.$refs.editor.save()
            },
            async onSave(response) {
                this.loading = true
                try {
                    let formData = new FormData()
                    let config = { headers: { 'Content-Type': 'multipart/form-data' } }
                    formData.append('user_id', this.$auth.user._id)
                    formData.append('titulo', this.titulo)
                    formData.append('etiquetas_ids', JSON.stringify(this.etiquetasFormulario))
                    formData.append('file', this.archivo)
                    formData.append('img_destacada', this.imagen)
                    formData.append('descripcion', JSON.stringify(response.blocks))
                    await this.$axios.post('apuntes', formData, config)
                    await this.$auth.fetchUser()
                    this.titulo = ''
                    this.etiquetasFormulario = []
                    this.archivo = ''
                    this.imagen = ''
                    this.$router.push('/mis-guardados')
                } catch (e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    this.loading = false
                }
            },
            limiter(e) {
                if(e.length > 3) {
                    e.pop()
                }
            },
        }
    }
</script>

<style>
    .titulo {
        text-align:center;
    }
    h3 .titulo {
        font-weight: 100;
    }
</style>
