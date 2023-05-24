<template>
    <v-main>
        <v-container>
            <v-card max-width="900">
                <v-card-title>
                    Esta recuperando la contraseña de {{correo}}
                </v-card-title>
                <v-card-subtitle>
                    Para recuperar tu contraseña solo escribe tu nueva contraseña y vuelve a repetirla por seguridad y tu contraseña se habrá restablecido
                </v-card-subtitle>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="contrasena"
                                label="Contraseña"
                                name="password"
                                prepend-icon="mdi-key"
                                :type="show ? 'text' : 'password'"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show = !show"
                                :disabled="btn_loader"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="new_contrasena"
                                label="Confirma tu contraseña"
                                name="password_confirmation"
                                prepend-icon="mdi-key"
                                :type="show_confirmation ? 'text' : 'password'"
                                :append-icon="show_confirmation ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show_confirmation = !show_confirmation"
                                :disabled="btn_loader"
                            />
                        </v-col>
                        <v-col>
                            <v-btn :loading="btn_loader" :disabled="contrasena == '' || new_contrasena == ''" color="success" rounded @click="restablecerPassword()" >Cambiar Contraseña</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-container>
    </v-main>
</template>
<script>
export default {
    data(){
        return{
            contrasena:'',
            new_contrasena: '',
            btn_loader: false,
            show: false,
            show_confirmation: false,
        }
    },
    layout() {
        return 'noLogin'
    },
    asyncData({query , $axios}) {
        
        return { correo: query.email, token: query.token }
    },
    methods:{
        async restablecerPassword(){
            this.btn_loader = true;
            let url = `recuperar-password/${this.correo}/${this.token}`
            let info = {
                password: this.contrasena,
                password_confirmation: this.new_contrasena
            }
            try{
                const {data} = await this.$axios.post(url,info)
                let alerta = {
                    color : 'success',
                    snackbar : true,
                    data : data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
                this.$router.push('/login')
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