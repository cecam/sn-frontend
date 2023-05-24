<template>
    <div>
        <v-btn color="warning" text @click="dialog = !dialog">
            Modificar
        </v-btn>
        <v-dialog v-model="dialog" max-width="1200">
            <v-card>
                <v-card-title>
                    <h3>
                        Modificando portafolio {{portafolio.nombre}}
                    </h3>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="4">
                            <div v-if="portafolio.img">
                                <v-img 
                                    :aspect-ratio="16/9"
                                    width="300"
                                    :src="portafolio.img"
                                />
                            </div>
                            <div v-else>
                                No hay imagen.
                            </div>
                            <br />
                            <center>
                                <v-btn color="success">
                                    Cambiar Imagen
                                </v-btn>
                            </center>
                        </v-col>
                        <v-col cols="12" md="8">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <h3>Nombre:</h3>
                                    <v-text-field 
                                        v-model="nombre" 
                                        label="Nombre del Portafolio"
                                        prepend-icon="mdi-key"
                                        append-icon="mdi-eye"
                                        :disabled="loader"
                                    />
                                    MODIFICAR DESCRIPCION: <br><br>
                                    Escojer una de las dos opciones <br>
                                    1.-Generar un boton para redijir a una pagina a solo modificar la descripcion <br>
                                    2.-colocar solo el la caja de texto aqui y no generar otra vista
                                </v-col>
                                <v-col cols="12" md="6">
                                    <h3>Apuntes en {{nombre}}</h3>
                                    <v-row align="center" justify="center">
                                        <v-virtual-scroll
                                            :items="apuntes"
                                            :item-height="30"
                                            height="200"
                                            >
                                            <template v-slot:default="{ item }">
                                                <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ item.titulo }}</v-list-item-title>
                                                </v-list-item-content>

                                                <v-list-item-action>
                                                    <v-checkbox
                                                        v-model="apuntes_ids"
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
                                    <h3>Etiquetas</h3>
                                    <v-select multiple 
                                        :rules="selectRules"
                                        v-model="etiquetas_ids" 
                                        :items="etiquetas" 
                                        item-value="_id"
                                        item-text="nombre"
                                        label="Etiquetas"
                                        v-on:input="limiter"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    




                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="error" @click="dialog = !dialog">
                        Cancelar
                    </v-btn>
                    <v-btn color="success" :disabled="false" @click="ModificarPortadolio(portafolio._id)" :loading="loader">
                        Modificar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: ['portafolio'],
        data(){
            return{
                dialog: false,
                loader: false,

                //Variables Apuntes
                page:0,
                btn_loading:false,
                dataApuntes:[],
                apuntes:[],

                //Etiquetas
                etiquetas:[],

                //variables portafolios
                nombre: this.portafolio.nombre,
                apuntes_ids: this.portafolio.apuntes_ids,
                etiquetas_ids: this.portafolio.etiquetas_ids,
            }
        },
        mounted(){
            this.page = 1;
            this.getApuntes();
            this.getEtiquetas();
        },
        methods:{
            async getEtiquetas(){
                this.btn_loading = true;
                try {
                    const { data } = await this.$axios.get('etiquetas');
                    this.etiquetas = data.data;
                } catch (error) {
                    console.log(error);
                }
                this.btn_loading = false;
            },
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

            async ModificarPortadolio(id){
                this.loader = true;
                let url = `portafolios/${id}`;
                let info = {
                    nombre: this.nombre,
                    apuntes_ids:JSON.stringify(this.apuntes_ids),
                    etiquetas_ids: JSON.stringify(this.etiquetas_ids),
                };
                try {
                    const {data} = await this.$axios.put(url,info);
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    await this.$auth.fetchUser()
                    this.$router.push(`/inicio`)
                } catch (e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.loader = false;
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
    .centrado {
        text-align: left;
    }
</style>