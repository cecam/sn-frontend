<template>
<v-main>
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
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="12">
                               <FormularioLogin buttonText="Inicia sesión" :submitForm="loginUser" :loading_btn="loading_btn" codigo_creator="" /> 
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-row>
                        <v-col>
                            <center>
                                <RecuperarPassword />
                            </center>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-main>
</template>

<script>
    import FormularioLogin from '@/components/auth/FormularioLogin'
    import RecuperarPassword from '@/components/modales/RecuperarPassword'
export default {
    components: {
        FormularioLogin,
        RecuperarPassword,
    },
    layout() {
        return 'noLogin'
    },
    data(){
        return{
            loading_btn: false,
        }
    },
    head() {
        return {
            titleTemplate: `SN - Iniciar sesión`
        }
    },
    asyncData({query , $axios}) {
        if(query.razon == 'success'){
            alert('El correo '+query.correo+' se ha verificado con exito, ya puedes usar SchoolNotes 🥳, Recuerda que te hemos dado '+query.clips+' clips para que puedas usarlos!')
        }else if(query.razon == 'invalid'){
            alert('Este token es invalido, porfavor verifica o reenvia un correo para activar tu cuenta');
        }else if(query.razon == 'expiration'){
            alert('Este token ya ha expirado, reenvia un nuevo correo para poder continuar')
        }else if(query.razon == 'notfound'){
            alert('Oops... Al parecer ha abido un error')
        }else{
            
        }
        return
    },
    methods: {
        async loginUser (usuario) {
            this.loading_btn = true;
            try {
                await this.$auth.loginWith('local', {
                    data: {
                        email : usuario.email,
                        password : usuario.password
                    }
                })
                this.$router.push('/inicio')
            } catch ( e ) {
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