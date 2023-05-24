<template>
        <v-form ref="form">
            <v-card-text>
                <div v-if="registro">
                    <v-text-field
                        :rules="inputRules"
                        v-model="usuario.name"
                        label="Nombre"
                        name="name"
                        prepend-icon="mdi-account"
                    />
                    <v-select multiple 
                        prepend-icon="mdi-tag"
                        :rules="selectRules"
                        v-model="usuario.etiquetas" 
                        :items="etiquetas" 
                        item-value="_id"
                        item-text="nombre"
                        label="Etiquetas, Selecciona 3 etiquetas de tu interés"
                        v-on:input="limiter"
                    ></v-select>
                </div>
                <v-text-field
                    :rules="inputRules"
                    v-model="usuario.email"
                    label="Correo electrónico"
                    name="email"
                    prepend-icon="mdi-at"
                />
                <v-text-field
                    :rules="inputRules"
                    v-model="usuario.password"
                    label="Contraseña"
                    name="password"
                    prepend-icon="mdi-key"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    @keyup.enter="submit()"
                />
                <div v-if="registro">
                    <v-text-field
                        :rules="inputRules"
                        v-model="usuario.password_confirmation"
                        label="Confirma tu contraseña"
                        name="password_confirmation"
                        prepend-icon="mdi-key"
                        :type="show_confirmation ? 'text' : 'password'"
                        :append-icon="show_confirmation ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show_confirmation = !show_confirmation"
                    />
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-checkbox
                                v-model="check_codigo"
                                label="Tengo un Codigo de Creador"
                                color="#00cba0"
                                hide-details
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field 
                                v-model="text_codigo"
                                label="Ingresa tu codigo de Creador"
                                :disabled="!check_codigo"
                                @keyup.enter="validarCodigo()"
                            />
                        </v-col>
                    </v-row>
                    <v-row v-if="check_codigo">
                        <v-col cols="12" md="12">
                            <v-btn block rounded color="primary" :loading="btn_loading_codigo" :disabled="text_codigo == ''" @click="validarCodigo()" >
                                Validar Codigo
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
                <v-container fluid class="ma-0 pa-0" v-if="registro">
                    <v-row align="center" justify="center" class="ma-0 pa-0">
                        <v-col cols="2" class="ma-0 pa-0">
                            <v-checkbox
                                v-model="politicas"
                            ></v-checkbox>
                        </v-col>
                        <v-col cols="8" class="ma-0 pa-0" >
                            <p>Acepto los <a href="/politicas">términos y condiciones</a></p>                             
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>   
            <v-card-actions>
                <v-btn v-if="registro && usuario.codigo == ''"
                    :loading="loading_btn"
                    color="primary" 
                    block
                    @click="submit()"
                    :disabled="
                        usuario.name==''||
                        usuario.etiquetas==''||
                        usuario.email==''||
                        usuario.password==''||
                        usuario.password_confirmation=='' ||
                        politicas == false
                    "
                >
                    {{buttonText}}
                </v-btn>
                <v-btn v-else-if="registro && usuario.codigo != ''"
                    :loading="loading_btn"
                    color="primary" 
                    block
                    @click="submit()"
                    :disabled="
                        usuario.name==''||
                        usuario.etiquetas==''||
                        usuario.email==''||
                        usuario.password==''||
                        usuario.password_confirmation=='' ||
                        usuario.codigo == '' 
                    "
                >
                    {{buttonText}}, Codigo Registrado: {{usuario.codigo}}
                </v-btn>
                <v-btn v-else
                    :loading="loading_btn"
                    color="primary" 
                    block
                    @click="submit()"
                >
                    {{buttonText}}
                </v-btn>
            </v-card-actions>
            <small v-if="usuario.codigo != ''">
                Codigo {{datos_codigo.data.codigo}} validado, ¡Registrate con este codigo y llevate {{datos_codigo.data.clips_registro}} clips gratis!
                <br>
            </small>                                 
        </v-form>     
</template>

<script>
    export default {
        data() {
            return {
                //variables de validacion del codigo de creador
                check_codigo: false,
                text_codigo:'',
                btn_loading_codigo: false,
                datos_codigo:[],

                show : false,
                show_confirmation : false,
                loading: false,
                valid : false,
                mostrarContraseña : false,
                politicas: false,
                usuario : {
                    name : '',
                    email : '',
                    password : '',
                    password_confirmation : '',
                    etiquetas: [],
                    codigo: '',
                },
                inputRules: [
                    v => !!v || 'Este campo es obligatorio'
                ],
                selectRules : [
                    v => v.length > 0 || 'Selecciona al menos una etiqueta'
                ]
            }
        },
        props : ["submitForm", "buttonText", "registro", 'etiquetas', "loading_btn", "codigo_creator"],
        mounted(){
            this.urlCodigoCreator();
        },
        methods: {
            submit() {
                if(this.$refs.form) {
                    this.submitForm(this.usuario)
                }
            },
            limiter(e) {
                if(e.length > 3) {
                    e.pop()
                }
            },
            urlCodigoCreator(){
                if(this.codigo_creator != ''){
                    this.check_codigo = true;
                    this.text_codigo = this.codigo_creator.data.data.codigo
                    this.validarCodigo();
                }
                return
            },
            async validarCodigo(){
                this.btn_loading_codigo = true;
                let url = `codigo-creador/${this.text_codigo}`
                try {
                    const {data} = await this.$axios.get(url);
                    this.usuario.codigo = this.text_codigo;
                    this.datos_codigo = data;
                    
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    alert('Codigo validado correctamente, Una vez registrado se te abonaran '+this.datos_codigo.data.clips_registro+' clips gratis!')
                } catch (e) {
                    this.usuario.codigo = '';
                    this.datos_codigo = [];
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }

                this.btn_loading_codigo = false;

            }
        }
    }
</script>