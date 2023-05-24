<template>
    <v-container fluid class="registro">
        <v-row align="center"> 
            <v-col cols="12" md="8" class="d-flex align-center">
                <p class="titulo">
                    ¡No pierdas más el tiempo!, empieza a DISFUTAR de la comunidad y beneficios que te traerá SchoolNotes 
                    <br>
                    <span class="enfasis">¡Regístrate ya!</span> 
                </p>
            </v-col>
            <v-col cols="12" md="4">
                <v-card elevation="800">
                    <FormularioLogin 
                        buttonText="¡Crea tu cuenta!" 
                        :submitForm="registrarUser" 
                        registro="true" 
                        :etiquetas="etiquetas"
                        :loading_btn="loading_btn"
                        codigo_creator=''
                    /> 
                </v-card>
            </v-col>
        </v-row>
    </v-container> 
</template>

<script>
    import FormularioLogin from '@/components/auth/FormularioLogin'

    export default {
        props: ['etiquetas'],
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
        async asyncData ({ $axios, params }) {
            const { data } = await $axios.get(`etiquetas`)
            return { etiquetas: data.data }
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
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    this.loading_btn = false;
                }
            }
        }
    }
</script>

<style scoped>
    .registro {
        background-color: #c7c7c7;
    }
    .titulo {
        font-size: 40px;
        text-align: center;
    }
    .enfasis {
        font-size: 45px;
        font-weight: 800;
    }
</style>