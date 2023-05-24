<template>
    <v-container
        class="fill-height"
        fluid
    >
        <v-row
            align="center"
            justify="center"
        >
            <v-col cols="12" md="4">
                <v-img height="300px" contain src="/logo-completo-negativo.png"></v-img>
            </v-col>
            <v-col
                cols="12"
                sm="8"
                md="6"
            >
                <v-card>
                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="12">
                                <FormularioLogin 
                                    buttonText="¡Crea tu cuenta!" 
                                    :submitForm="registrarUser" 
                                    registro="true" 
                                    :etiquetas="etiquetas"
                                    :loading_btn="loading_btn"
                                    :codigo_creator="code_creator"
                                /> 
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import FormularioLogin from '@/components/auth/FormularioLogin'
export default {
    components: {
        FormularioLogin
    },
    layout() {
        return 'noLogin'
    },
    data(){
        return{
            loading_btn: false,
        }
    },
    async asyncData ({ $axios, params, query }) {
        var dat = ''
        if(query.codecreator){
            try {
                dat = await $axios.get(`codigo-creador-id/${query.codecreator}`)
            } catch (e) {
                dat = ''
                alert('Este codigo de Creador es Incorrecto');
            }
        }
        const {data} = await $axios.get(`etiquetas`)
        return { etiquetas: data.data, code_creator: dat}
    },
    methods: {
        async registrarUser (usuario) {
            this.loading_btn = true;
            try {
                await this.$axios.post('register', usuario )
                await this.$auth.loginWith('local', {
                    data: {
                        email : usuario.email,
                        password : usuario.password
                    }
                })
                this.$router.push('/inicio')
            }catch(e) {
                this.loading_btn = false;
                if(e.response.data.password != ''){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.password[0],
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                if(e.response.data.email != ''){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.email[0],
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            }
        }
    }
}
</script>