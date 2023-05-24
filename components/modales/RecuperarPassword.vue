<template>
    <v-div>
        <small>
            Olvide mi contraseña. <a href="#" @click="modal = !modal">¡restablecer ahora!</a>
        </small>
        <v-dialog max-width="800" v-model="modal">
            <v-card>
                <v-card-title>
                    Restablecer contraseña
                </v-card-title>
                <v-card-subtitle>
                    Para restablecer su contraseña es muy sencillo solo, solo necesitamos que escriba su correo electronico, para poder enviar un correo electronico y pueda restablecer su contraseña con toda seguridad.
                    <v-text-field 
                        v-model="email"
                        label="Ingrese Correo Electronico para restablecer su contraseña."
                        name="email"
                        prepend-icon="mdi-email"
                        @keyup.enter="restablecerPassword()"
                        :disabled="btn_loader"
                    />
                </v-card-subtitle>
                <v-card-actions>
                    <v-spacer />
                        <v-btn :loading="btn_loader" color="success" rounded :disabled="email == ''" @click="restablecerPassword()">
                            Enviar correo
                        </v-btn>
                    <v-spacer />
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-div>
</template>

<script>
export default {
    data(){
        return{
            modal: false,
            btn_loader:false,
            email:'',
        }
    },
    methods:{
        async restablecerPassword(){
            this.btn_loader = true;
            let url = `recuperar-password/${this.email}/enviar-mail`
            try{
                const {data} = await this.$axios.get(url)
                this.email = ''
                this.modal = false
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