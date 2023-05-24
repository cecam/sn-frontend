<template>
    <v-container> 
        <v-row align="center" justify="center">
            <v-col sm="12" md="6">
                <v-card max-width="800"> 
                    <h1 style="text-align: center; font-size:40px">¡Uups!, ya casi terminamos</h1>
                    <v-card-subtitle style="text-align: center; font-size: 26px;">
                        Recibiste un correo electrónico, verifica tu email para poder usar SchoolNotes en su totalidad
                    </v-card-subtitle>
                    <v-card-text>
                        <br>
                        ¿No recibiste ningun correo o te deja validarlo?, Posibles errores: <br>
                        <ul>
                            <ol>El token ya ha expirado</ol>
                            <ol>Revisa tu Carpeta de SPAM o Correos no Deseados</ol>
                        </ul>
                        <br>
                        Da clic en "Reenviar Correo", para que te enviemos otro correo con un token actualizado para que puedas verificar tu cuenta :3
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                            <v-btn :loading="btn_loader" @click="reenviarCorreo()" color="#20FFFF" rounded dark>Reenviar Correo</v-btn>
                        <v-spacer />
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data(){
            return{
                btn_loader:false,
            }
        },
        methods:{
            async reenviarCorreo(){
                this.btn_loader = true;
                let url = `reenviar-correo-verificacion/${this.$auth.user._id}`
                try{
                    const {data} = await this.$axios.get(url);
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }catch(e){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.btn_loader = false;
            }
        }
    }
</script>