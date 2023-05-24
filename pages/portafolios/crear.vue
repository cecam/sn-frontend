<template>
    <v-main> 
        <v-container fluid> 
            <v-row justify="center">
                <h1 class="titulo">¡Crea un portafolio!</h1>
            </v-row>
            <v-row justify="space-around"> 
                <v-col cols="12" md="6"> 
                    <v-text-field
                        style="font-size:30px"
                        v-model="nombre"
                        height="50"
                        label="Nombra tu portafolio"
                        name="nombre"
                    />
                    <v-file-input dense
                        accept="image/png, image/jpeg, image/PNG, image/jpg, image/JPEG, image/JPG"
                        v-model="imagen"
                        label="Agrega una imagen destacada"
                    ></v-file-input>
                    <v-card-text>¿De qué tratará este portafolio?</v-card-text>
                    <div style="border: 1px solid #a1a1a1; border-radius:15px">
                        <editor ref="editor" autofocus 
                            @save="onSave"
                            :initialized="onInitialized" 
                            header list
                        />   
                    </div>
                </v-col>
                <v-col cols="12" md="3">
                    <v-container fluid> 
                        <v-row align="center" justify="center"> 
                            <h3 class="titulo">Etiqueta tu portafolio para que más personas lo encuentren</h3>
                        </v-row>    
                        <v-row>
                            <v-select multiple 
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
                        <v-row align="center" justify="center">
                            <v-virtual-scroll
                                :items="apuntes"
                                :item-height="50"
                                height="300"
                                >
                                <template v-slot:default="{ item }">
                                    <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ item.titulo }}</v-list-item-title>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-checkbox
                                            v-model="apuntesFormaulario"
                                            :value="item._id"
                                            ></v-checkbox>
                                    </v-list-item-action>
                                    </v-list-item>
                                </template>
                                </v-virtual-scroll>
                        </v-row>
                        <v-row align="center">
                            <v-btn block outlined color="green"
                                :loading="btn_loading" 
                                @click="getApuntes()"
                            >
                                Ver mas Apuntes...
                            </v-btn>
                        </v-row>
                    </v-container> 
                    <v-divider> </v-divider>
                    <v-btn block dark
                        @click="guardarPortafolio()" 
                        :loading="loading"
                        color="#40cb4d"
                        :disabled="nombre == '' || imagen == null || apuntesFormaulario.length == 0 || etiquetasFormulario.length == 0"
                    >
                        Crear Portafolio
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
                nombre: '',
                archivo: '',
                imagen: '',
                etiquetasFormulario: [],
                apuntes: [],
                apuntesFormaulario: [],
                btn_loading: false,
                onInitialized: null,
                loading: false,
            }
        },
        async asyncData ({ $axios, params }) {
            const { data } = await $axios.get(`etiquetas`)
            return { etiquetas: data.data }
        },
        head() {
            return {
                titleTemplate: `SN - Crear Portafolio`
            }
        },
        mounted(){
            this.page = 1;
            this.getApuntes();
        },
        methods: {
            async getApuntes(){
                this.btn_loading = true;
                let url = `apuntes/${this.$auth.user._id}/usuario?page=${this.page}`;
                try{
                    const { data } = await this.$axios.get(url);
                    this.dataApuntes = data;
                    this.apuntes = this.apuntes.concat(data.data.data);
                    this.page = this.page+1;
                }catch (e){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.btn_loading = false;
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
            async guardarPortafolio() {
                await this.$refs.editor.save()
            },
            async onSave(response) {
                this.loading = true
                try {
                    let formData = new FormData()
                    let config = { headers: { 'Content-Type': 'multipart/form-data' } }
                    formData.append('user_id', this.$auth.user._id)
                    formData.append('nombre', this.nombre)
                    formData.append('etiquetas_ids', JSON.stringify(this.etiquetasFormulario))
                    formData.append('apuntes_ids', JSON.stringify(this.apuntesFormaulario))
                    formData.append('img_destacada', this.imagen)
                    formData.append('descripcion', JSON.stringify(response.blocks))
                    const {data} = await this.$axios.post('portafolios', formData, config)
                    await this.$auth.fetchUser()
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    this.$router.push(`/${this.string_to_slug(this.$auth.user.name)}?id=${this.$auth.user._id}`)
                } catch (e) {
                    console.log(e.response)
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.loading = false
            },
            limiter(e) {
                if(e.length > 3) {
                    e.pop()
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
